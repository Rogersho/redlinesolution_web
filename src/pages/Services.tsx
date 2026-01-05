import { Link } from "react-router-dom";
import {
  Shield,
  Bell,
  Camera,
  GraduationCap,
  Calendar,
  ArrowRight,
  CheckCircle,
  Users,
  Clock,
  Award,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";
import { servicesData } from "@/lib/data";



const packages = [
  {
    name: "Monthly",
    description: "Regular maintenance for critical systems",
    features: ["System inspection", "Minor repairs", "24/7 support", "Priority response"],
  },
  {
    name: "Quarterly",
    description: "Comprehensive maintenance every 3 months",
    features: ["Full system check", "Parts replacement", "Performance report", "Training sessions"],
    popular: true,
  },
  {
    name: "Yearly",
    description: "Annual comprehensive service package",
    features: ["Complete overhaul", "Equipment upgrades", "Compliance certification", "Extended warranty"],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-secondary text-secondary-foreground py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Comprehensive{" "}
              <span className="text-primary">Safety Solutions</span>
            </h1>
            <p className="text-lg text-secondary-foreground/80">
              From fire fighting systems to security installations, we provide end-to-end
              solutions to protect your business, employees, and assets.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-16">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 items-start border-b border-border pb-16 last:border-0 last:pb-0"
              >
                <div className="flex flex-col items-center lg:items-start gap-4">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <service.icon className="w-12 h-12 lg:w-16 lg:h-16 text-primary" />
                  </div>
                  <span className="text-primary font-semibold text-sm uppercase tracking-wider text-center lg:text-left">
                    Service {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {service.fullDescription}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-sm text-foreground"
                      >
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link to={`/services/${service.id}`}>
                      View Details & Book
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Red Line Solution */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <SectionHeader
            subtitle="Why Choose Us"
            title="Your Trusted Fire Safety Partner"
            description="We combine expertise, quality, and reliability to deliver exceptional fire safety solutions."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Shield,
                title: "Certified Excellence",
                description: "All our systems meet international fire safety standards and local regulations.",
                color: "text-blue-500"
              },
              {
                icon: Users,
                title: "Expert Team",
                description: "Highly trained technicians with years of experience in fire safety installations.",
                color: "text-green-500"
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Round-the-clock emergency response and technical support for your peace of mind.",
                color: "text-orange-500"
              },
              {
                icon: CheckCircle,
                title: "Quality Guaranteed",
                description: "We use only premium, certified equipment from trusted manufacturers.",
                color: "text-purple-500"
              },
              {
                icon: Zap,
                title: "Fast Installation",
                description: "Efficient project execution with minimal disruption to your operations.",
                color: "text-yellow-500"
              },
              {
                icon: Award,
                title: "Proven Track Record",
                description: "Successfully completed 50+ projects across various industries in Rwanda.",
                color: "text-red-500"
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow"
              >
                <benefit.icon className={`w-12 h-12 ${benefit.color} mb-4`} />
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Certifications & Compliance */}
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-center mb-6">Certifications & Compliance</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">International Standards</h4>
                  <p className="text-sm text-muted-foreground">ISO certified fire safety systems compliant with NFPA standards</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Local Regulations</h4>
                  <p className="text-sm text-muted-foreground">Full compliance with Rwanda Building Code and safety requirements</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Certified Technicians</h4>
                  <p className="text-sm text-muted-foreground">All installers are trained and certified in fire safety systems</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Quality Assurance</h4>
                  <p className="text-sm text-muted-foreground">Rigorous testing and inspection before project handover</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Every business is unique. Let us design a fire safety and security solution
            tailored to your specific requirements.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link to="/contact">
              Contact Our Experts
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;