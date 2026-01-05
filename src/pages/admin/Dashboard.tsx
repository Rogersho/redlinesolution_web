import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/config/api";
import { useNavigate } from "react-router-dom";
import {
    Users, MessageSquare, Activity, LogOut,
    CheckCircle, Clock, Search, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [stats, setStats] = useState({
        totalMessages: 0,
        totalRequests: 0,
        pendingRequests: 0,
        systemHealth: '100%',
    });
    const [messages, setMessages] = useState<any[]>([]);
    const [requests, setRequests] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simple auth check
        if (!localStorage.getItem("adminToken")) {
            navigate("/admin/login");
            return;
        }
        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            // Fetch Stats
            const statsRes = await fetch(`${API_BASE_URL}/api/admin/stats`);
            const statsData = await statsRes.json();
            setStats(statsData);

            // Fetch Messages
            const msgRes = await fetch(`${API_BASE_URL}/api/admin/messages`);
            const msgData = await msgRes.json();
            setMessages(msgData || []);

            // Fetch Requests
            const reqRes = await fetch(`${API_BASE_URL}/api/admin/service-requests`);
            const reqData = await reqRes.json();
            setRequests(reqData || []);

        } catch (error) {
            console.error("Failed to fetch admin data", error);
            toast({
                variant: "destructive",
                title: "Data Error",
                description: "Failed to load dashboard data.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Top Bar */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <h1 className="text-xl font-bold">God Eye Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-sm text-right hidden md:block">
                        <p className="font-semibold">Super Admin</p>
                        <p className="text-muted-foreground text-xs">God Mode Active</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                </div>
            </header>

            <main className="p-6 max-w-7xl mx-auto space-y-8">
                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalMessages}</div>
                            <p className="text-xs text-muted-foreground">+20% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Service Requests</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalRequests}</div>
                            <p className="text-xs text-muted-foreground">+12 new this week</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
                            <Clock className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-500">{stats.pendingRequests}</div>
                            <p className="text-xs text-muted-foreground">Requires attention</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">System Health</CardTitle>
                            <Activity className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-500">{stats.systemHealth}</div>
                            <p className="text-xs text-muted-foreground">All systems operational</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Data Tabs */}
                <Tabs defaultValue="requests" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="requests">Service Requests</TabsTrigger>
                        <TabsTrigger value="messages">Contact Messages</TabsTrigger>
                    </TabsList>

                    <TabsContent value="requests" className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">Recent Requests</h2>
                            <div className="flex items-center gap-2">
                                <Input placeholder="Search requests..." className="max-w-sm" />
                                <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Client</TableHead>
                                        <TableHead>Service</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {requests.map((req: any) => (
                                        <TableRow key={req.id}>
                                            <TableCell>
                                                <div className="font-medium">{req.customer_name}</div>
                                                <div className="text-xs text-muted-foreground">{req.customer_phone}</div>
                                            </TableCell>
                                            <TableCell>{req.details ? req.details.substring(0, 40) + '...' : 'N/A'}</TableCell>
                                            <TableCell>{new Date(req.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                                    }`}>
                                                    {req.status}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {requests.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                                No service requests found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="messages" className="space-y-4">
                        <h2 className="text-xl font-bold">Contact Messages</h2>
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Sender</TableHead>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Message</TableHead>
                                        <TableHead>Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {messages.map((msg: any) => (
                                        <TableRow key={msg.id}>
                                            <TableCell>
                                                <div className="font-medium">{msg.name}</div>
                                                <div className="text-xs text-muted-foreground">{msg.email}</div>
                                            </TableCell>
                                            <TableCell>{msg.subject || 'General Inquiry'}</TableCell>
                                            <TableCell className="max-w-md truncate">{msg.message}</TableCell>
                                            <TableCell>{new Date(msg.created_at).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))}
                                    {messages.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                                No messages found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default AdminDashboard;
