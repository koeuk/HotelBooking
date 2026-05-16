import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const cardVariants = cva(
  "group/card flex flex-col gap-4 overflow-hidden py-4 text-sm has-[>img:first-child]:pt-0",
  {
    variants: {
      variant: {
        default: "rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10",
        glass: "rounded-2xl glass text-card-foreground",
        soft: "rounded-2xl bg-muted/40 text-card-foreground",
        elevated: "rounded-2xl bg-card text-card-foreground shadow-lg ring-1 ring-foreground/5",
        outline: "rounded-2xl border border-border bg-transparent text-card-foreground",
      },
      interactive: {
        true: "transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-xl",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      interactive: false,
    },
  }
)

function Card({ className, variant = "default", interactive = false, ...props }) {
  return (
    <div className={cn(cardVariants({ variant, interactive, className }))} {...props} />
  );
}

function CardContent({ className, ...props }) {
  return (
    <div className={cn("px-4", className)} {...props} />
  );
}

export { Card, CardContent, cardVariants }
