import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  label,
  title,
  description,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <ScrollReveal className={cn("mb-16", align === "center" && "text-center", className)}>
      {label && (
        <p className="mb-3 text-xs font-medium uppercase tracking-brand text-accent">
          {label}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className={cn(
          "mt-4 max-w-2xl text-lg text-muted",
          align === "center" && "mx-auto"
        )}>
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
