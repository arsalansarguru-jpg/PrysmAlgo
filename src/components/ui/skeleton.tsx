import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "shimmer-surface rounded-md bg-secondary/40",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
