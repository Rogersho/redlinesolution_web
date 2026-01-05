import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard, MessageSquare, Users, FolderKanban,
    ChevronLeft, ChevronRight, LogOut, Settings, UserCog, ClipboardList
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
    notifications?: {
        messages: number;
        requests: number;
    };
}

const AdminSidebar = ({ notifications = { messages: 0, requests: 0 } }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const links = [
        { name: "Overview", icon: LayoutDashboard, path: "/admin/dashboard", badge: 0 },
        { name: "Messages", icon: MessageSquare, path: "/admin/messages", badge: notifications.messages },
        { name: "Service Requests", icon: ClipboardList, path: "/admin/requests", badge: notifications.requests },
        { name: "Projects", icon: FolderKanban, path: "/admin/projects", badge: 0 },
        { name: "User Accounts", icon: UserCog, path: "/admin/users", badge: 0 },
    ];

    return (
        <div
            className={cn(
                "h-screen bg-card border-r border-border transition-all duration-300 flex flex-col sticky top-0",
                collapsed ? "w-20" : "w-64"
            )}
        >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-border">
                {!collapsed && (
                    <div className="flex items-center gap-2 font-bold text-xl text-primary">
                        <span>Red Line</span>
                    </div>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className={cn("ml-auto", collapsed && "mx-auto")}
                >
                    {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-2 space-y-1 mt-4">
                {links.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative group",
                                isActive
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                collapsed && "justify-center"
                            )}
                        >
                            <link.icon className="w-5 h-5 flex-shrink-0" />
                            {!collapsed && (
                                <>
                                    <span className="flex-1">{link.name}</span>
                                    {link.badge > 0 && (
                                        <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                            {link.badge}
                                        </span>
                                    )}
                                </>
                            )}
                            {/* Tooltip for collapsed mode */}
                            {collapsed && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                    {link.name}
                                </div>
                            )}
                            {collapsed && link.badge > 0 && (
                                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-card" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-border space-y-1">
                <Link
                    to="/"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
                        collapsed && "justify-center"
                    )}
                >
                    <Settings className="w-5 h-5" />
                    {!collapsed && <span>View Website</span>}
                </Link>
                <Link
                    to="/admin/login"
                    onClick={() => localStorage.removeItem("adminToken")}
                    className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
                        collapsed && "justify-center"
                    )}
                >
                    <LogOut className="w-5 h-5" />
                    {!collapsed && <span>Logout</span>}
                </Link>
            </div>
        </div>
    );
};

export default AdminSidebar;
