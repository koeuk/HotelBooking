import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            classNames={{
                months: "flex flex-col sm:flex-row gap-4 relative",
                month: "flex flex-col gap-3",
                month_caption: "flex justify-center items-center h-8 relative",
                caption_label: "text-sm font-semibold tracking-tight",
                nav: "flex items-center gap-1 absolute inset-x-0 top-0 justify-between px-1",
                button_previous: cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "h-7 w-7 rounded-full bg-transparent border-foreground/10 hover:bg-muted/60 p-0",
                ),
                button_next: cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "h-7 w-7 rounded-full bg-transparent border-foreground/10 hover:bg-muted/60 p-0",
                ),
                month_grid: "w-full border-collapse",
                weekdays: "flex",
                weekday:
                    "w-9 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80 flex items-center justify-center",
                week: "flex w-full mt-1.5",
                day: cn(
                    "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                    "[&:has([aria-selected=true])]:bg-primary/10",
                    "[&:has(>.range-start)]:rounded-l-full",
                    "[&:has(>.range-end)]:rounded-r-full",
                    "first:[&:has([aria-selected=true])]:rounded-l-full last:[&:has([aria-selected=true])]:rounded-r-full",
                ),
                day_button: cn(
                    "relative h-9 w-9 p-0 font-medium rounded-full inline-flex items-center justify-center transition-colors",
                    "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                    "aria-selected:bg-transparent",
                ),
                selected:
                    "[&>button]:bg-gradient-primary [&>button]:text-primary-foreground [&>button]:shadow-md [&>button]:hover:brightness-110",
                today: "[&>button]:ring-1 [&>button]:ring-primary/40 [&>button]:ring-offset-0 [&>button]:font-semibold",
                outside:
                    "text-muted-foreground/40 [&>button]:text-muted-foreground/40",
                disabled:
                    "text-muted-foreground/30 [&>button]:text-muted-foreground/30 [&>button]:pointer-events-none",
                range_start:
                    "range-start [&>button]:bg-gradient-primary [&>button]:text-primary-foreground [&>button]:shadow-md rounded-l-full",
                range_end:
                    "range-end [&>button]:bg-gradient-primary [&>button]:text-primary-foreground [&>button]:shadow-md rounded-r-full",
                range_middle:
                    "bg-primary/10 [&>button]:bg-transparent [&>button]:text-foreground [&>button]:hover:bg-primary/20 rounded-none",
                hidden: "invisible",
                ...classNames,
            }}
            components={{
                Chevron: ({ orientation, ...rest }) =>
                    orientation === "left" ? (
                        <ChevronLeft className="h-4 w-4" {...rest} />
                    ) : (
                        <ChevronRight className="h-4 w-4" {...rest} />
                    ),
            }}
            {...props}
        />
    );
}

export { Calendar };
