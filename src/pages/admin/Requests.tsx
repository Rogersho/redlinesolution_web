import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/config/api";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
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
import { Button } from "@/components/ui/button";
import { Phone, CheckCircle, Calendar, Trash2, Clock, ClipboardList, TriangleAlert } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminRequests = () => {
    const [requests, setRequests] = useState<any[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<any>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Confirmation Dialog States
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);

    const { toast } = useToast();

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/service-requests`);
            const data = await res.json();
            setRequests(data || []);
        } catch (error) {
            console.error("Failed to fetch requests", error);
        }
    };

    const handleUpdateStatus = async (status: string) => {
        if (!selectedRequest) return;

        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/service-requests/${selectedRequest.id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });

            if (res.ok) {
                toast({
                    title: "Status Updated",
                    description: `Request marked as ${status}.`,
                });
                setSelectedRequest(null);
                fetchRequests(); // Refresh the list
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update request status.",
            });
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/service-requests/${deleteId}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                toast({
                    title: "Request Deleted",
                    description: "The service request has been permanently removed.",
                });
                if (selectedRequest?.id === deleteId) setSelectedRequest(null);
                fetchRequests();
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete request.",
            });
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    const handleDeleteAll = async () => {
        setIsDeleting(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/service-requests/all`, {
                method: 'DELETE'
            });

            if (res.ok) {
                toast({
                    title: "All Requests Deleted",
                    description: "Your service request list is now empty.",
                });
                setRequests([]);
                setSelectedRequest(null);
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete all requests.",
            });
        } finally {
            setIsDeleting(false);
            setIsDeleteAllOpen(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Service Requests</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Total: {requests.length} | Pending: {requests.filter(r => r.status === 'pending').length}
                    </p>
                </div>
                {requests.length > 0 && (
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setIsDeleteAllOpen(true)}
                        disabled={isDeleting}
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete All
                    </Button>
                )}
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Status</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Service Summary</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests.map((req: any) => (
                            <TableRow
                                key={req.id}
                                className={`cursor-pointer hover:bg-muted/50 ${req.status === 'pending' ? 'bg-yellow-50/20' : ''}`}
                                onClick={() => setSelectedRequest(req)}
                            >
                                <TableCell>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${req.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : 'bg-green-100 text-green-700'
                                        }`}>
                                        {req.status}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{req.customer_name}</div>
                                    <div className="text-xs text-muted-foreground">{req.customer_phone}</div>
                                </TableCell>
                                <TableCell className="max-w-xs truncate text-muted-foreground">
                                    {req.details || 'N/A'}
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground">
                                    {new Date(req.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDeleteId(req.id);
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {requests.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                                    <ClipboardList className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                    No service requests found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${selectedRequest?.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-green-100 text-green-700'
                                }`}>
                                {selectedRequest?.status}
                            </span>
                        </div>
                        <DialogTitle className="text-xl">Request Details</DialogTitle>
                        <DialogDescription>
                            From <span className="text-foreground font-medium">{selectedRequest?.customer_name}</span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4 border-y border-gray-100">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact Phone</h4>
                                <div className="flex items-center text-sm font-medium">
                                    <Phone className="w-3 h-3 mr-2 text-primary" />
                                    {selectedRequest?.customer_phone}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date Requested</h4>
                                <div className="flex items-center text-sm font-medium text-muted-foreground">
                                    <Calendar className="w-3 h-3 mr-2 text-primary" />
                                    {selectedRequest && new Date(selectedRequest.created_at).toLocaleString()}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Request Details</h4>
                            <div className="text-sm bg-muted/30 p-4 rounded-lg whitespace-pre-wrap leading-relaxed italic">
                                "{selectedRequest?.details}"
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex gap-2 sm:justify-between pt-2">
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-100"
                                onClick={() => setDeleteId(selectedRequest?.id)}
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            {selectedRequest?.status === 'pending' && (
                                <Button size="sm" onClick={() => handleUpdateStatus('completed')}>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Mark as Completed
                                </Button>
                            )}
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Single Delete Confirmation */}
            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <TriangleAlert className="w-5 h-5 text-red-500" />
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the service request from your database.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
                            Delete Forever
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Delete All Confirmation */}
            <AlertDialog open={isDeleteAllOpen} onOpenChange={setIsDeleteAllOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                            <TriangleAlert className="w-6 h-6" />
                            CRITICAL: Delete ALL Service Requests?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            You are about to wipe your entire service request history. This action is **permanent** and will remove every single record.
                            There is no way to recover them.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Keep Requests</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAll} className="bg-red-600 hover:bg-red-700 text-white">
                            Yes, Wipe Everything
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default AdminRequests;
