import * as React from "react";
import { format, differenceInCalendarDays } from "date-fns";
import { Calendar as CalendarIcon, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

function parseLocalDate(value) {
    if (!value) return undefined;
    if (value instanceof Date) return value;
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d);
}

function toISODate(date) {
    if (!date) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export default function DateRangePicker({
    checkIn,
    checkOut,
    onChange,
    minDate,
    className,
}) {
    const [open, setOpen] = React.useState(false);

    const range = React.useMemo(
        () => ({
            from: parseLocalDate(checkIn),
            to: parseLocalDate(checkOut),
        }),
        [checkIn, checkOut],
    );

    const nights =
        range.from && range.to
            ? Math.max(0, differenceInCalendarDays(range.to, range.from))
            : 0;

    const handleSelect = (next) => {
        onChange({
            check_in_date: toISODate(next?.from),
            check_out_date: toISODate(next?.to),
        });
        if (next?.from && next?.to && next.from.getTime() !== next.to.getTime()) {
            setOpen(false);
        }
    };

    const today = React.useMemo(() => {
        const t = new Date();
        t.setHours(0, 0, 0, 0);
        return t;
    }, []);

    const minDay = parseLocalDate(minDate) || today;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    className={cn(
                        "group/dates w-full text-left rounded-2xl border border-input bg-muted/60 hover:bg-muted transition-all duration-300 ease-out-expo focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 focus-visible:border-primary/40 dark:bg-input/40",
                        open && "bg-background border-primary/40 ring-4 ring-primary/15",
                        className,
                    )}
                >
                    <div className="grid grid-cols-[1fr_auto_1fr] items-stretch divide-x divide-border/60">
                        <div className="px-4 py-3">
                            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                                <CalendarIcon className="h-3 w-3" />
                                Check-in
                            </div>
                            <p
                                className={cn(
                                    "mt-0.5 text-[15px] font-medium truncate",
                                    !range.from &&
                                        "text-muted-foreground/70 font-normal",
                                )}
                            >
                                {range.from
                                    ? format(range.from, "EEE, MMM d")
                                    : "Add date"}
                            </p>
                        </div>

                        <div className="flex items-center px-2 text-muted-foreground/60">
                            <ArrowRight className="h-3.5 w-3.5" />
                        </div>

                        <div className="px-4 py-3">
                            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                                <CalendarIcon className="h-3 w-3" />
                                Check-out
                            </div>
                            <p
                                className={cn(
                                    "mt-0.5 text-[15px] font-medium truncate",
                                    !range.to &&
                                        "text-muted-foreground/70 font-normal",
                                )}
                            >
                                {range.to
                                    ? format(range.to, "EEE, MMM d")
                                    : "Add date"}
                            </p>
                        </div>
                    </div>
                </button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                sideOffset={8}
                className="w-auto p-0 rounded-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] border border-foreground/10"
            >
                <div className="p-2">
                    <Calendar
                        mode="range"
                        selected={range}
                        onSelect={handleSelect}
                        numberOfMonths={2}
                        disabled={{ before: minDay }}
                        defaultMonth={range.from || minDay}
                    />
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-border/60 px-4 py-3 text-xs bg-muted/30">
                    <div className="text-muted-foreground">
                        {nights > 0 ? (
                            <>
                                <span className="font-semibold text-foreground">
                                    {nights}
                                </span>{" "}
                                night{nights !== 1 ? "s" : ""} selected
                            </>
                        ) : (
                            "Select your check-in and check-out dates"
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            onChange({
                                check_in_date: "",
                                check_out_date: "",
                            });
                        }}
                        className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Clear
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
