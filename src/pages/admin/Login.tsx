import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/config/api";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        if (localStorage.getItem("adminToken")) {
            navigate("/admin/dashboard");
        }
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Store simple token/flag
                localStorage.setItem("adminToken", data.token);
                toast({
                    title: "Welcome Back, Admin",
                    description: "Accessing God Eye Dashboard...",
                });
                navigate("/admin/dashboard");
            } else {
                throw new Error(data.error || "Login failed");
            }
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Access Denied",
                description: error.message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-[70vh] flex items-center justify-center bg-muted/30 py-20">
                <div className="w-full max-w-md p-8 bg-card border border-border rounded-2xl shadow-lg">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <LayoutDashboard className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold">Admin Portal</h1>
                        <p className="text-muted-foreground">Secure Access Only</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="admin-email" className="text-sm font-medium">Email Address</label>
                            <Input
                                id="admin-email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@redline.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="admin-password" className="text-sm font-medium">Password</label>
                            <div className="relative">
                                <Input
                                    id="admin-password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                            {isLoading ? (
                                "Verifying..."
                            ) : (
                                <>
                                    <Lock className="w-4 h-4 mr-2" /> Login
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default AdminLogin;
