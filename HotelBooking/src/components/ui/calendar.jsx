import * as React from "react"
import { DayPicker } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4 relative",
        month: "flex flex-col gap-3",
        month_caption: "flex justify-center items-center h-8 relative",
        caption_label: "text-sm font-semibold tracking-tight text-slate-900",
        nav: "flex items-center gap-1 absolute inset-x-0 top-0 justify-between px-1",
        button_previous:
          "h-7 w-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 inline-flex items-center justify-center",
        button_next:
          "h-7 w-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 inline-flex items-center justify-center",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "w-9 text-[11px] font-medium uppercase tracking-wider text-slate-400 flex items-center justify-center",
        week: "flex w-full mt-1.5",
        day: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "[&:has([aria-selected=true])]:bg-primary/10",
          "[&:has(>.range-start)]:rounded-l-full",
          "[&:has(>.range-end)]:rounded-r-full",
          "first:[&:has([aria-selected=true])]:rounded-l-full last:[&:has([aria-selected=true])]:rounded-r-full",
        ),
        day_button:
          "relative h-9 w-9 p-0 font-medium rounded-full inline-flex items-center justify-center transition-colors hover:bg-slate-100 focus-visible:outline-none aria-selected:bg-transparent",
        selected:
          "[&>button]:bg-primary [&>button]:text-white [&>button]:hover:bg-primary/90",
        today:
          "[&>button]:ring-1 [&>button]:ring-primary/40 [&>button]:font-semibold",
        outside: "text-slate-300 [&>button]:text-slate-300",
        disabled: "text-slate-200 [&>button]:text-slate-200 [&>button]:pointer-events-none",
        range_start:
          "range-start [&>button]:bg-primary [&>button]:text-white rounded-l-full",
        range_end:
          "range-end [&>button]:bg-primary [&>button]:text-white rounded-r-full",
        range_middle:
          "bg-primary/10 [&>button]:bg-transparent [&>button]:text-slate-900 [&>button]:hover:bg-primary/20 rounded-none",
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
  )
}

export { Calendar }
