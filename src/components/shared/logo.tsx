import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "full" | "compact";
  href?: string;
}

export function Logo({ className, variant = "full", href = "/" }: LogoProps) {
  const isCompact = variant === "compact";

  return (
    <Link href={href} className={cn("inline-flex items-center shrink-0", className)}>
      <Image
        src="/logo.png"
        alt="PRYSM ALGO"
        width={isCompact ? 140 : 180}
        height={isCompact ? 48 : 64}
        className={cn(
          "object-contain object-left",
          isCompact ? "h-10 w-auto sm:h-11" : "h-14 w-auto sm:h-16"
        )}
        priority
      />
    </Link>
  );
}
