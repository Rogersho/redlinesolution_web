import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/config/api";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";
import ProjectCard from "@/components/shared/ProjectCard";

const milestones = [
  {
    year: "2025",
    title: "Company Founded",
    description: "Red Line Solution Ltd established in Kicukiro, Kigali.",
  },
  {
    year: "2025",
    title: "First Major Contract",
    description: "Secured partnership with Flash Cleaning Ltd.",
  },
  {
    year: "2025",
    title: "Team Expansion",
    description: "Grew our team of certified technicians and experts.",
  },
  {
    year: "2025",
    title: "Multiple Projects",
    description: "Successfully completed projects for various industries.",
  },
];

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/projects`);
        const data = await res.json();
        setProjects(data || []);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-secondary text-secondary-foreground py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Our Projects
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Milestones &{" "}
              <span className="text-primary">Success Stories</span>
            </h1>
            <p className="text-lg text-secondary-foreground/80">
              Explore our portfolio of completed projects and see how we've helped
              organizations across Rwanda enhance their fire safety and security.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            subtitle="Portfolio"
            title="Featured Projects"
            description="A selection of our successfully completed fire safety and security installations."
          />

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id || index}
                  title={project.name}
                  description={project.description}
                  category={project.client_name || "General"}
                  image={project.image_url}
                />
              ))}
              {projects.length === 0 && (
                <div className="col-span-2 text-center py-10 text-muted-foreground">
                  No projects found. Check back soon!
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Milestones */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <SectionHeader
            subtitle="Our Journey"
            title="Company Milestones"
            description="Key moments in our growth as a leading fire safety provider."
          />
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

              {milestones.map((milestone, index) => (
                <div key={index} className="relative pl-20 pb-12 last:pb-0">
                  {/* Year badge */}
                  <div className="absolute left-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {milestone.year}
                  </div>
                  {/* Content */}
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50+", label: "Projects Completed" },
              { value: "30+", label: "Happy Clients" },
              { value: "100%", label: "Success Rate" },
              { value: "4+", label: "Industries Served" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our growing list of satisfied clients. Let us help you protect
            what matters most with our professional fire safety and security solutions.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">
              Get Started Today
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;