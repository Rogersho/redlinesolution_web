import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Bell, Camera, GraduationCap, CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";
import ServiceCard from "@/components/shared/ServiceCard";
import StatCard from "@/components/shared/StatCard";
import ProjectCard from "@/components/shared/ProjectCard";
import { servicesData } from "@/lib/data";
import { API_BASE_URL } from "@/config/api";

const benefits = [
  "High-quality certified systems",
  "Expert professional team",
  "Modern technology solutions",
  "Full compliance assurance",
  "Fast response times",
  "Comprehensive warranty",
  "Client-focused approach"
];

// All 21 images with descriptions
const allGalleryImages = [
  { img: "1.jpeg", title: "Fire Extinguisher Installation", category: "Safety Equipment" },
  { img: "2.jpeg", title: "Fire Alarm Control Panel", category: "Detection Systems" },
  { img: "3.jpeg", title: "Fire Hose Reel Cabinet", category: "Fire Fighting" },
  { img: "4.jpeg", title: "Emergency Exit Signage", category: "Safety Systems" },
  { img: "5.jpeg", title: "Fire Suppression System", category: "Fire Protection" },
  { img: "6.jpeg", title: "Fire Safety Equipment", category: "Installation Work" },
  { img: "7.jpeg", title: "Fire Alarm System", category: "Detection Systems" },
  { img: "8.jpeg", title: "Safety Compliance Check", category: "Inspection" },
  { img: "9.jpeg", title: "Fire Hose Installation", category: "Fire Fighting" },
  { img: "10.jpeg", title: "Emergency Response Equipment", category: "Safety Systems" },
  { img: "11.jpeg", title: "Fire Detection Panel", category: "Detection Systems" },
  { img: "12.jpeg", title: "Safety Signage Installation", category: "Safety Equipment" },
  { img: "13.jpeg", title: "Fire Protection System", category: "Fire Suppression" },
  { img: "14.jpeg", title: "Emergency Equipment Setup", category: "Installation Work" },
  { img: "15.jpeg", title: "Fire Safety Inspection", category: "Compliance" },
  { img: "16.jpeg", title: "Safety System Maintenance", category: "Service" },
  { img: "17.jpeg", title: "System Integration", category: "Technology" },
  { img: "18.jpeg", title: "Safety Assessment", category: "Inspection" },
  { img: "19.jpeg", title: "Fire Drill Training", category: "Training" },
  { img: "20.jpeg", title: "Security Monitoring", category: "Surveillance" },
  { img: "21.jpeg", title: "Emergency Planning", category: "Consulting" },
];

const Index = () => {
  const [displayedImages, setDisplayedImages] = useState(allGalleryImages.slice(0, 8));
  const [fadingIndices, setFadingIndices] = useState<number[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    // Fetch latest projects
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/projects`);
        const data = await res.json();
        // Get last 3 projects reversed or just first 3 depending on preference. 
        // Assuming array is newest first or we want any 3. Let's take first 3.
        setProjects(data.slice(0, 3) || []);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };
    fetchProjects();

    // "Living Grid" effect: Change one random image every 1.2 seconds
    const interval = setInterval(() => {
      // Pick a random slot to update (0-7)
      const slotIndex = Math.floor(Math.random() * 8);

      // Start fade out
      setFadingIndices(prev => [...prev, slotIndex]);

      // Wait for fade out, then swap image and fade in
      setTimeout(() => {
        setDisplayedImages(prev => {
          const newGrid = [...prev];

          // Find a new image that isn't currently displayed
          let newImage;
          let attempts = 0;
          do {
            newImage = allGalleryImages[Math.floor(Math.random() * allGalleryImages.length)];
            attempts++;
          } while (prev.some(img => img.img === newImage.img) && attempts < 50);

          newGrid[slotIndex] = newImage;
          return newGrid;
        });

        // Start fade in
        setFadingIndices(prev => prev.filter(i => i !== slotIndex));
      }, 500); // 500ms fade out duration matches CSS transition

    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      {/* Gallery Hero Section - Our Work in Action */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Fire Safety & Security Solutions
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Your Safety, <span className="text-primary">Our Priority</span>
            </h1>
            <p className="text-lg text-secondary-foreground/80 max-w-3xl mx-auto mb-8">
              Red Line Solution Ltd provides reliable and innovative fire safety and security systems.
              Protecting businesses across Rwanda with cutting-edge technology and expert service.
            </p>
          </div>

          {/* Auto-Rotating Image Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 h-[600px] md:h-[auto]">
            {displayedImages.map((item, index) => (
              <div
                key={`${index}`} // Stable key for the slot, not the content, to allow transition
                className={`group relative overflow-hidden rounded-xl aspect-square cursor-pointer animate-fade-in transition-all duration-700 ease-in-out ${fadingIndices.includes(index) ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
              >
                <img
                  src={`/pics/${item.img}`}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-xs font-semibold text-primary mb-1">{item.category}</p>
                  <h3 className="text-sm font-bold drop-shadow-lg">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/contact">
                Partner with us today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/90">
              <Link to="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            subtitle="What We Offer"
            title="Our Core Services"
            description="Comprehensive fire safety and security solutions tailored to your needs."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.slice(0, 4).map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.shortDescription}
                url={`/services/${service.id}`}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                subtitle="About Us"
                title="Trusted Fire Safety Partner in Rwanda"
                description="Founded in Kicukiro, Kigali, we are committed to delivering excellence in fire safety and security systems."
                centered={false}
              />
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button asChild>
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">Since 2025</p>
                  <p className="text-muted-foreground">Kicukiro, Kigali</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            subtitle="Our Work"
            title="Featured Projects"
            description="See how we've helped businesses across Rwanda secure their premises."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <ProjectCard
                  key={project.id || index}
                  title={project.name}
                  description={project.description}
                  category={project.client_name || "Project"}
                  image={project.image_url}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-10 bg-muted rounded-xl">
                <p className="text-muted-foreground">Loading recent projects...</p>
              </div>
            )}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/projects">
                View All Projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Ready to Secure Your Business?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Partner with Red Line Solution Ltd for reliable, innovative, and tailored fire safety and security solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
              <Link to="/contact">Get a Free Quote</Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/90">
              <a href="tel:+250788717347">
                <Phone className="mr-2 w-4 h-4" />
                Call Us Now
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;