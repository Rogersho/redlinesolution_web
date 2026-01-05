import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";
import TeamCard from "@/components/shared/TeamCard";

const teamMembers = [
  {
    name: "Eric Ngizwenayo",
    role: "CEO & Founder",
    image: "/team/eric.jpeg",
    quote: "Our commitment to excellence and safety drives everything we do at Red Line Solution.",
  },
  {
    name: "Yannick Sandra",
    role: "Managing Director",
    image: "/team/sandra.jpeg",
    quote: "We believe in building lasting relationships through reliable service and innovative solutions.",
  },
  {
    name: "Denyse Muhoza",
    role: "Head of Marketing & Sales",
    image: "/team/denyse.jpeg",
    quote: "Connecting our clients with industry-leading safety solutions and building lasting trust through excellence.",
  },
];

const Team = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-secondary text-secondary-foreground py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Our Team
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Meet the{" "}
              <span className="text-primary">Experts</span>
            </h1>
            <p className="text-lg text-secondary-foreground/80">
              Our dedicated team of professionals brings together decades of experience
              in fire safety and security systems.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            subtitle="Leadership"
            title="Our Leadership Team"
            description="Meet the people driving Red Line Solution's mission to protect businesses across Rwanda."
          />
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <TeamCard
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                quote={member.quote}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              subtitle="Our Culture"
              title="What Drives Our Team"
              description="At Red Line Solution, we're united by shared values and a commitment to excellence."
            />
            <div className="grid sm:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: "Expertise",
                  description: "Continuous training and certification in latest technologies.",
                },
                {
                  title: "Dedication",
                  description: "24/7 commitment to client safety and satisfaction.",
                },
                {
                  title: "Innovation",
                  description: "Always seeking better solutions for our clients.",
                },
              ].map((value, index) => (
                <div key={index} className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Growing Team
          </h2>
          <p className="text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for
            safety and security. Get in touch to explore opportunities.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link to="/contact">
              Contact Us
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Team;