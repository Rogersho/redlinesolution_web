import { Link } from "react-router-dom";
import {
  ArrowRight,
  Lightbulb,
  Users,
  Target,
  Award,
  Clock,
  Shield,
  Headphones,
  CheckCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";

const strategies = [
  {
    number: "01",
    title: "Market Leadership Through Innovation & Quality",
    icon: Lightbulb,
    description: "We continuously invest in the latest fire safety and security technologies to stay ahead of the curve. Our commitment to quality ensures that every installation meets the highest industry standards.",
    points: [
      "Adoption of cutting-edge technology",
      "Rigorous quality control processes",
      "Industry-leading certifications",
      "Continuous improvement mindset",
    ],
  },
  {
    number: "02",
    title: "Customer-Centered Growth & Strategic Partnerships",
    icon: Users,
    description: "Our growth strategy focuses on building long-term relationships with clients and strategic partners. We believe that our success is directly tied to the success and safety of our clients.",
    points: [
      "Personalized service approach",
      "Long-term partnership focus",
      "Collaborative problem-solving",
      "Responsive customer support",
    ],
  },
];

const benefits = [
  {
    icon: Award,
    title: "High-Quality Systems",
    description: "Only certified, industry-leading equipment",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Trained and certified professionals",
  },
  {
    icon: Zap,
    title: "Modern Technology",
    description: "Latest innovations in safety systems",
  },
  {
    icon: Shield,
    title: "Compliance Assurance",
    description: "Meet all regulatory requirements",
  },
  {
    icon: Clock,
    title: "Fast Response",
    description: "Quick deployment and service",
  },
  {
    icon: CheckCircle,
    title: "Warranty Coverage",
    description: "Comprehensive protection plans",
  },
  {
    icon: Target,
    title: "Affordable Packages",
    description: "Solutions for every budget",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always available when you need us",
  },
];

const Strategy = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-secondary text-secondary-foreground py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Business Strategy
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our Strategic{" "}
              <span className="text-primary">Approach</span>
            </h1>
            <p className="text-lg text-secondary-foreground/80">
              Discover how Red Line Solution combines innovation, quality, and
              customer focus to deliver exceptional fire safety and security solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Strategies */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            subtitle="Our Approach"
            title="Strategic Pillars"
            description="The foundational strategies that guide our business growth and service delivery."
          />
          <div className="space-y-16">
            {strategies.map((strategy, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl font-bold text-primary/20">
                      {strategy.number}
                    </span>
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                      <strategy.icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {strategy.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {strategy.description}
                  </p>
                  <ul className="space-y-3">
                    {strategy.points.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center p-12">
                    <strategy.icon className="w-32 h-32 text-primary/30" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <SectionHeader
            subtitle="Why Choose Us"
            title="The Red Line Advantage"
            description="Benefits that set us apart from the competition."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border text-center card-hover"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Partner with Red Line Solution
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Experience the difference that strategic thinking and quality execution
            can make for your fire safety and security needs.
          </p>
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
            <Link to="/contact">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Strategy;