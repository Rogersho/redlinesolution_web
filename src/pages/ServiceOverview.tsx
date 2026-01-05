import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/config/api";
import { servicesData } from "@/lib/data";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, CheckCircle, ArrowLeft, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const ServiceOverview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();

    const service = servicesData.find((s) => s.id === id);

    const [date, setDate] = useState<Date>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        details: "",
        preferred_time: "",
    });

    // If service not found, redirect (or show error) - useEffect to avoid bad render
    useEffect(() => {
        if (!service) {
            navigate('/services');
        }
    }, [service, navigate]);

    if (!service) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            ...formData,
            service_id: service.id, // We'll store the ID or title
            service_name: service.title,
            preferred_date: date ? format(date, 'yyyy-MM-dd') : null,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/service-requests`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Failed to submit request');

            setIsSubmitted(true);
            toast({
                title: "Request Received!",
                description: "We will contact you shortly to confirm.",
            });
        } catch (error: any) {
            console.error('Submission error:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message || "Failed to submit request.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Layout>
            <div className="bg-secondary py-16 text-secondary-foreground">
                <div className="container-custom">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/services')}
                        className="mb-8 hover:bg-white/10 text-white"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
                    </Button>
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-primary/20 rounded-2xl">
                            <service.icon className="w-12 h-12 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{service.title}</h1>
                            <p className="text-xl text-secondary-foreground/80">{service.shortDescription}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-padding container-custom">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Left: Details */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Service Overview</h2>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            {service.fullDescription}
                        </p>

                        <h3 className="text-xl font-bold mb-4">Key Features</h3>
                        <ul className="grid sm:grid-cols-2 gap-4 mb-8">
                            {service.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Booking Form */}
                    <div className="bg-card border border-border rounded-2xl p-8 shadow-sm h-fit sticky top-24">
                        <h3 className="text-2xl font-bold mb-2">Book This Service</h3>
                        <p className="text-muted-foreground mb-6">Fill out the form below to request a service appointment.</p>

                        {isSubmitted ? (
                            <div className="text-center py-12">
                                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                                <h4 className="text-xl font-bold mb-2">Request Sent!</h4>
                                <p className="text-muted-foreground">We'll be in touch soon.</p>
                                <Button className="mt-6" onClick={() => setIsSubmitted(false)}>Book Another</Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Full Name</label>
                                    <Input name="customer_name" required value={formData.customer_name} onChange={handleChange} placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email Address</label>
                                    <Input name="customer_email" type="email" required value={formData.customer_email} onChange={handleChange} placeholder="john@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone Number</label>
                                    <Input name="customer_phone" required value={formData.customer_phone} onChange={handleChange} placeholder="+250 788..." />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Preferred Date</label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Preferred Time</label>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                name="preferred_time"
                                                className="pl-9"
                                                type="time"
                                                value={formData.preferred_time}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Additional Details</label>
                                    <Textarea
                                        name="details"
                                        value={formData.details}
                                        onChange={handleChange}
                                        placeholder="Describe your specific requirements..."
                                        rows={4}
                                    />
                                </div>

                                <Button type="submit" className="w-full text-lg" size="lg" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit Request"}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ServiceOverview;
