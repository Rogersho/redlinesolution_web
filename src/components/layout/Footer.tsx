import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Twitter, Linkedin, MessageCircle, Facebook, ShieldCheck } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-white/10">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/logo.jpeg"
                  alt="Red Line Solution"
                  className="h-10 w-auto object-contain rounded-lg"
                />
              </div>
            </div>
            <p className="text-secondary-foreground/80 text-sm leading-relaxed mb-6">
              Your trusted partner for reliable and innovative fire safety and security systems in Rwanda.
            </p>
            <div className="flex gap-3">
              <a href="https://wa.me/250788717347" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors" title="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61583912422649" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/redlinesolution1?utm_source=qr&igsh=MXV3Y3hzZ2FpeHhibA==" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "About Us", path: "/about" },
                { name: "Our Services", path: "/services" },
                { name: "Projects", path: "/projects" },
                { name: "Our Team", path: "/team" },
                { name: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2">
              {[
                "Fire Fighting Systems",
                "Fire Alarm & Detection",
                "Security Systems",
                "Safety Training",
                "Maintenance Packages",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-secondary-foreground/80 text-sm">
                  Kicukiro, Kigali, Rwanda
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+250788717347"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm"
                >
                  +250 788 717 347
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:rlinesolution@gmail.com"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm"
                >
                  rlinesolution@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-secondary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-foreground/60 text-sm">
              © {currentYear} Red Line Solution Ltd. All rights reserved.
            </p>
            <div className="flex gap-6 items-center">
              <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors text-sm">
                Terms of Service
              </a>
              <Link to="/admin/login" className="text-secondary-foreground/40 hover:text-primary transition-all duration-300 hover:scale-110" title="Admin Login">
                <ShieldCheck className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;