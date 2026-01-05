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
import { Mail, CheckCircle, Trash2, Eye, TriangleAlert } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminMessages = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<any>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Confirmation Dialog States
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);

    const { toast } = useToast();

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/messages`);
            const data = await res.json();
            setMessages(data || []);
        } catch (error) {
            console.error("Failed to fetch messages", error);
        }
    };

    const handleMarkAsRead = async () => {
        if (!selectedMessage) return;

        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/messages/${selectedMessage.id}/read`, {
                method: 'PUT'
            });

            if (res.ok) {
                toast({
                    title: "Marked as Read",
                    description: "Message status updated.",
                });
                setSelectedMessage(null);
                fetchMessages(); // Refresh the list
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update message status.",
            });
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/messages/${deleteId}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                toast({
                    title: "Message Deleted",
                    description: "The message has been permanently removed.",
                });
                if (selectedMessage?.id === deleteId) setSelectedMessage(null);
                fetchMessages();
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete message.",
            });
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    const handleDeleteAll = async () => {
        setIsDeleting(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/messages/all`, {
                method: 'DELETE'
            });

            if (res.ok) {
                toast({
                    title: "All Messages Deleted",
                    description: "Your inbox is now empty.",
                });
                setMessages([]);
                setSelectedMessage(null);
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete all messages.",
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
                    <h1 className="text-3xl font-bold">Contact Messages</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Total: {messages.length} | Unread: {messages.filter(m => !m.is_read).length}
                    </p>
                </div>
                {messages.length > 0 && (
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
                            <TableHead>Sender</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {messages.map((msg: any) => (
                            <TableRow
                                key={msg.id}
                                className={`cursor-pointer hover:bg-muted/50 ${!msg.is_read ? 'bg-blue-50/30' : ''}`}
                                onClick={() => setSelectedMessage(msg)}
                            >
                                <TableCell>
                                    {!msg.is_read ? (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
                                            Unread
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600">
                                            Read
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{msg.name}</div>
                                    <div className="text-xs text-muted-foreground">{msg.email}</div>
                                </TableCell>
                                <TableCell>{msg.subject || 'General Inquiry'}</TableCell>
                                <TableCell className="max-w-xs truncate text-muted-foreground">{msg.message}</TableCell>
                                <TableCell className="text-xs text-muted-foreground">
                                    {new Date(msg.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDeleteId(msg.id);
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {messages.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                                    <Mail className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                    No messages found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* View Details Dialog */}
            <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <div className="flex items-center gap-2 mb-1">
                            {!selectedMessage?.is_read ? (
                                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Unread</span>
                            ) : (
                                <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Read</span>
                            )}
                        </div>
                        <DialogTitle className="text-xl">Message Details</DialogTitle>
                        <DialogDescription>
                            From <span className="text-foreground font-medium">{selectedMessage?.name}</span> ({selectedMessage?.email})
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4 border-y border-gray-100">
                        <div className="space-y-1">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subject</h4>
                            <p className="text-sm font-medium">{selectedMessage?.subject || "No Subject"}</p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Message</h4>
                            <div className="text-sm bg-muted/30 p-4 rounded-lg whitespace-pre-wrap leading-relaxed">
                                {selectedMessage?.message}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date Received</h4>
                            <p className="text-xs text-muted-foreground">
                                {selectedMessage && new Date(selectedMessage.created_at).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="flex gap-2 sm:justify-between pt-2">
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-100"
                                onClick={() => setDeleteId(selectedMessage?.id)}
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            {!selectedMessage?.is_read && (
                                <Button variant="outline" size="sm" onClick={handleMarkAsRead}>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Mark Read
                                </Button>
                            )}
                            <Button size="sm" asChild>
                                <a href={`mailto:${selectedMessage?.email}?subject=Re: ${selectedMessage?.subject || 'Contact Inquiry'}`}>
                                    <Mail className="w-4 h-4 mr-2" />
                                    Reply
                                </a>
                            </Button>
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
                            This action cannot be undone. This will permanently delete the message from your database.
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
                            CRITICAL: Delete ALL Messages?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            You are about to wipe your entire inbox. This action is **permanent** and will remove every single message record.
                            There is no way to recover them.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Keep Messages</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAll} className="bg-red-600 hover:bg-red-700 text-white">
                            Yes, Wipe Everything
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default AdminMessages;
