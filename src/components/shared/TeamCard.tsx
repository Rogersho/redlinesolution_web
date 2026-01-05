import { cn } from "@/lib/utils";
import { Linkedin, Mail } from "lucide-react";

interface TeamCardProps {
  name: string;
  role: string;
  image?: string;
  quote?: string;
  className?: string;
}

const TeamCard = ({
  name,
  role,
  image,
  quote,
  className,
}: TeamCardProps) => {
  return (
    <div
      className={cn(
        "group bg-card rounded-xl overflow-hidden border border-border shadow-sm card-hover",
        className
      )}
    >
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
            <span className="text-5xl font-bold text-primary/40">
              {name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Linkedin className="w-4 h-4 text-white" />
            </a>
            <a href="#" className="w-9 h-9 bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Mail className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-1">{name}</h3>
        <p className="text-primary font-medium text-sm mb-3">{role}</p>
        {quote && (
          <blockquote className="text-muted-foreground text-sm italic border-l-2 border-primary pl-4">
            "{quote}"
          </blockquote>
        )}
      </div>
    </div>
  );
};

export default TeamCard;