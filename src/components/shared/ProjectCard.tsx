import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  category?: string;
  className?: string;
}

const ProjectCard = ({
  title,
  description,
  image,
  category,
  className,
}: ProjectCardProps) => {
  // Helper to fix localhost URLs for external access
  const getImageUrl = (url?: string) => {
    if (!url) return undefined;

    // Convert to absolute URL if it's just a path
    if (url.startsWith('/uploads/')) {
      return `${API_BASE_URL}${url}`;
    }

    // Fix localhost URLs (old development URLs)
    if (url.includes('localhost:') && url.includes('/uploads/')) {
      const parts = url.split('/uploads/');
      return `${API_BASE_URL}/uploads/${parts[1]}`;
    }

    // Fix production URLs missing /api/ prefix
    if (url.includes('redlinesolution.rw/uploads/')) {
      const parts = url.split('/uploads/');
      return `${API_BASE_URL}/uploads/${parts[1]}`;
    }

    // Fix legacy /php-backend/ prefix if present
    if (url.includes('/php-backend/uploads/')) {
      const parts = url.split('/php-backend/uploads/');
      return `${API_BASE_URL}/uploads/${parts[1]}`;
    }

    return url;
  };

  const finalImageUrl = getImageUrl(image);

  return (
    <div
      className={cn(
        "group bg-card rounded-xl overflow-hidden border border-border shadow-sm card-hover",
        className
      )}
    >
      <div className="aspect-video bg-muted relative overflow-hidden">
        {finalImageUrl ? (
          <img
            src={finalImageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('fallback-active');
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
            <span className="text-4xl font-bold text-primary/30">
              {title.substring(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <ExternalLink className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>
        {category && (
          <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
            {category}
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;