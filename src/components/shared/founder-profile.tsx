import Image from "next/image";
import { FOUNDER } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FounderProfileProps {
  showBio?: boolean;
  showExperienceBadge?: boolean;
  className?: string;
}

export function FounderProfile({
  showBio = false,
  showExperienceBadge = true,
  className,
}: FounderProfileProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="aspect-square max-w-md mx-auto rounded-2xl border border-border overflow-hidden bg-primary shadow-card">
        <Image
          src={FOUNDER.image}
          alt={`${FOUNDER.name}, ${FOUNDER.title}`}
          width={1024}
          height={1024}
          className="h-full w-full object-cover"
          sizes="(max-width: 1024px) 100vw, 480px"
          priority
        />
      </div>

      {showBio && (
        <div className="mt-4 text-center lg:text-left">
          <p className="text-lg font-semibold text-foreground">{FOUNDER.name}</p>
          <p className="text-sm text-accent">{FOUNDER.title}</p>
          <p className="text-xs text-muted mt-2 leading-relaxed max-w-md">{FOUNDER.bio}</p>
        </div>
      )}

      {showExperienceBadge && (
        <div className="absolute top-4 right-4 rounded-lg border border-border bg-primary/90 backdrop-blur-xl px-4 py-3 shadow-card">
          <p className="text-xs text-muted">Experience</p>
          <p className="text-lg font-bold text-accent">{FOUNDER.experience}</p>
        </div>
      )}
    </div>
  );
}
