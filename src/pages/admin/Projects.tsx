import { useState, useEffect, useRef } from "react";
import { API_BASE_URL } from "@/config/api";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Calendar, User, FileText, Upload, Link as LinkIcon, X, TriangleAlert } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminProjects = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Confirmation State
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const { toast } = useToast();

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        client_name: "",
        description: "",
        image_url: "",
        completion_date: ""
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/projects`);
            const data = await res.json();
            setProjects(data || []);
        } catch (error) {
            console.error("Failed to fetch projects", error);
        }
    };

    const getImageUrl = (url?: string) => {
        if (!url) return undefined;

        // Convert to absolute URL if it's just a path
        if (url.startsWith('/uploads/')) {
            return `${API_BASE_URL}${url}`;
        }

        // Fix localhost URLs (old development URLs)
        if (url.includes('localhost:') && url.includes('/uploads/')) {
            const parts = url.split('/uploads/');
            return `${API_BASE_URL}/uploads/${parts[1]}`;
        }

        // Fix production URLs missing /api/ prefix
        if (url.includes('redlinesolution.rw/uploads/')) {
            const parts = url.split('/uploads/');
            return `${API_BASE_URL}/uploads/${parts[1]}`;
        }

        // Fix legacy /php-backend/ prefix if present
        if (url.includes('/php-backend/uploads/')) {
            const parts = url.split('/php-backend/uploads/');
            return `${API_BASE_URL}/uploads/${parts[1]}`;
        }

        return url;
    };

    const handleOpenDialog = (project: any = null) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                name: project.name || "",
                client_name: project.client_name || "",
                description: project.description || "",
                image_url: project.image_url || "",
                completion_date: project.completion_date ? project.completion_date.split('T')[0] : ""
            });
            setPreviewUrl(getImageUrl(project.image_url) || null);
        } else {
            setEditingProject(null);
            setFormData({ name: "", client_name: "", description: "", image_url: "", completion_date: "" });
            setPreviewUrl(null);
        }
        setSelectedFile(null);
        setIsDialogOpen(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setFormData({ ...formData, image_url: "" }); // Clear link if file selected
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setFormData({ ...formData, image_url: url });
        if (url) {
            setSelectedFile(null); // Clear file if link entered
            if (fileInputRef.current) fileInputRef.current.value = "";
            setPreviewUrl(url);
        } else if (!selectedFile) {
            setPreviewUrl(null);
        }
    };

    const clearImage = () => {
        setSelectedFile(null);
        setFormData({ ...formData, image_url: "" });
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let finalImageUrl = formData.image_url;

            // If a file is selected, upload it first
            if (selectedFile) {
                setIsUploading(true);
                const uploadFormData = new FormData();
                uploadFormData.append("image", selectedFile);

                const uploadRes = await fetch(`${API_BASE_URL}/api/upload/project-image`, {
                    method: "POST",
                    body: uploadFormData,
                });

                if (!uploadRes.ok) throw new Error("Failed to upload image");
                const uploadData = await uploadRes.json();
                finalImageUrl = uploadData.imageUrl;
            }

            const url = editingProject
                ? `${API_BASE_URL}/api/projects/${editingProject.id}`
                : `${API_BASE_URL}/api/projects`;

            const method = editingProject ? "PUT" : "POST";

            const projectData = {
                ...formData,
                image_url: finalImageUrl
            };

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projectData),
            });

            if (res.ok) {
                toast({ title: "Success", description: `Project ${editingProject ? 'updated' : 'created'} successfully.` });
                fetchProjects();
                setIsDialogOpen(false);
            } else {
                throw new Error("Failed to save project");
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: error instanceof Error ? error.message : "Failed to save project." });
        } finally {
            setIsLoading(false);
            setIsUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            const res = await fetch(`${API_BASE_URL}/api/projects/${deleteId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast({ title: "Deleted", description: "Project removed successfully." });
                fetchProjects();
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to delete project." });
        } finally {
            setDeleteId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Projects Management</h1>
                <Button onClick={() => handleOpenDialog()}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                </Button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead>Project Name</TableHead>
                            <TableHead>Client/Category</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.map((project: any) => (
                            <TableRow key={project.id}>
                                <TableCell>
                                    <div className="w-16 h-12 rounded bg-muted overflow-hidden">
                                        {project.image_url ? (
                                            <img src={getImageUrl(project.image_url)} alt={project.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">No Image</div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{project.name}</TableCell>
                                <TableCell>{project.client_name}</TableCell>
                                <TableCell className="max-w-md truncate">{project.description}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(project)}>
                                            <Pencil className="w-4 h-4 text-blue-500" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(project.id)}>
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {projects.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No projects found. Add your first one!
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Delete Confirmation */}
            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <TriangleAlert className="w-5 h-5 text-red-500" />
                            Delete Project?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this project? This will permanently remove its data and images.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
                            Delete Project
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-lg overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
                        <DialogDescription>
                            Fill in the details below. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Project Name</label>
                            <Input
                                placeholder="e.g. Flash Cleaning Fire System"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Client / Category</label>
                                <div className="relative">
                                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        className="pl-9"
                                        placeholder="e.g. Industrial"
                                        value={formData.client_name}
                                        onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Completion Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        className="pl-9"
                                        type="date"
                                        value={formData.completion_date}
                                        onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <Textarea
                                placeholder="Describe the project..."
                                className="min-h-[80px]"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium">Project Image</label>

                            <div className="flex flex-col gap-3 p-4 border rounded-lg bg-slate-50">
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 space-y-1.5">
                                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            <Upload className="w-3 h-3" />
                                            Option 1: Upload File
                                        </div>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            className="bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="relative flex items-center py-1">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase font-bold">OR</span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        <LinkIcon className="w-3 h-3" />
                                        Option 2: Image URL
                                    </div>
                                    <Input
                                        placeholder="https://example.com/image.jpg"
                                        value={formData.image_url}
                                        onChange={handleUrlChange}
                                        className="bg-white"
                                    />
                                </div>
                            </div>

                            {previewUrl && (
                                <div className="relative mt-2 rounded-lg overflow-hidden border bg-black/5 aspect-video flex items-center justify-center">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="max-h-full max-w-full object-contain"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 w-7 h-7 rounded-full shadow-lg"
                                        onClick={clearImage}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        <DialogFooter className="pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isLoading || isUploading}>
                                {isUploading ? "Uploading..." : isLoading ? "Saving..." : "Save Project"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminProjects;
