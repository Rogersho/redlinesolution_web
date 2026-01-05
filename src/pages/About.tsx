import { Target, Eye, Heart, Users, Lightbulb, Award } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";

const values = [
  {
    icon: Heart,
    title: "Integrity",
    description: "We conduct our business with honesty and transparency in all our dealings.",
  },
  {
    icon: Award,
    title: "Quality",
    description: "We deliver only the highest quality products and services to our clients.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously seek new and better ways to serve our clients.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Our clients' needs are at the center of everything we do.",
  },
  {
    icon: Target,
    title: "Teamwork",
    description: "We work together to achieve common goals and deliver excellence.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-secondary text-secondary-foreground py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Your Trusted Partner in{" "}
              <span className="text-primary">Fire Safety</span>
            </h1>
            <p className="text-lg text-secondary-foreground/80">
              Founded on August 19, 2025, Red Line Solution Ltd has quickly established itself as a
              leading provider of fire safety and security systems in Rwanda.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                subtitle="Our Story"
                title="Building a Safer Rwanda"
                centered={false}
              />
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Red Line Solution Ltd was founded with a clear mission: to provide reliable
                  and innovative fire safety and security systems to businesses and organizations
                  across Rwanda.
                </p>
                <p>
                  Based in Kicukiro, Kigali, we have grown from a small startup to a trusted
                  partner for numerous organizations, delivering cutting-edge solutions that
                  protect lives and property.
                </p>
                <p>
                  Our team of dedicated professionals brings together expertise in fire safety,
                  security systems, and customer service to deliver comprehensive solutions
                  tailored to each client's unique needs.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold text-primary mb-2">2025</div>
                  <p className="text-xl font-semibold text-foreground">Year Founded</p>
                  <p className="text-muted-foreground mt-4">Kicukiro, Kigali, Rwanda</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading provider of fire safety and security solutions in East Africa,
                recognized for our commitment to excellence, innovation, and customer satisfaction.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To protect lives and property by delivering reliable, innovative, and
                cost-effective fire safety and security systems, while providing exceptional
                customer service and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            subtitle="What Drives Us"
            title="Our Core Values"
            description="The principles that guide everything we do at Red Line Solution."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-card rounded-xl p-6 border border-border card-hover"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <value.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-10 md:py-12 bg-secondary text-secondary-foreground">
        <div className="container-custom">
          <SectionHeader
            subtitle="Why Red Line"
            title="Why Choose Us?"
            description="Partner with a team that prioritizes your safety above all else."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { number: "01", title: "Expert Team", desc: "Highly trained professionals" },
              { number: "02", title: "Quality Products", desc: "Certified equipment only" },
              { number: "03", title: "24/7 Support", desc: "Always here when you need us" },
              { number: "04", title: "Custom Solutions", desc: "Tailored to your needs" },
            ].map((item, index) => (
              <div key={index} className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-2">{item.number}</div>
                <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                <p className="text-secondary-foreground/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;