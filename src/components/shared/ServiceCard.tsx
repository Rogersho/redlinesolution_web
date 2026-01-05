import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
  className?: string;
  url?: string;
}

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  features,
  className,
  url,
}: ServiceCardProps) => {
  const CardContent = (
    <div
      className={cn(
        "group bg-card rounded-xl p-6 border border-border shadow-sm card-hover h-full flex flex-col",
        className
      )}
    >
      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary transition-colors flex-shrink-0">
        <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">{description}</p>
      {features && features.length > 0 && (
        <ul className="space-y-2 mt-auto">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  if (url) {
    return (
      <Link to={url} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};

export default ServiceCard;