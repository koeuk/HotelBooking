import { cn } from "@/lib/utils"

function Skeleton({
  className,
  variant = "shimmer",
  ...props
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "rounded-lg bg-muted",
        variant === "pulse" && "animate-pulse",
        variant === "shimmer" &&
          "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite] before:bg-gradient-to-r before:from-transparent before:via-foreground/5 before:to-transparent",
        className
      )}
      {...props} />
  );
}

export { Skeleton }
