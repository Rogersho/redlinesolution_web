import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/config/api";

const AdminLayout = () => {
    // In a real app, you'd fetch these counts from the backend via context or query
    const [notifications, setNotifications] = useState({ messages: 0, requests: 0 });

    useEffect(() => {
        // Basic polling or one-time fetch
        const fetchCounts = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/admin/stats`);
                const data = await res.json();
                if (data) {
                    setNotifications({
                        messages: 0, // Need to implement "unread" logic on backend to be accurate
                        requests: data.pendingRequests || 0
                    });
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchCounts();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50/50">
            <AdminSidebar notifications={notifications} />
            <main className="flex-1 overflow-y-auto h-screen">
                <div className="p-6 md:p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
