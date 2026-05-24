import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useMemo } from "react";
import { W as WebLayout } from "./WebLayout-Dc8gJj4l.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BY9Lq84_.js";
import { c as cn, b as buttonVariants, B as Button } from "./button-Dm9784FB.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { S as Separator } from "./separator-CBwNKPLd.js";
import { differenceInCalendarDays, format } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as Calendar$1, ArrowRight, ArrowLeft, Sparkles, MapPin, Star, CheckCircle2, Users, BedDouble, CreditCard } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { Popover as Popover$1 } from "@base-ui/react/popover";
import { H as HotelMap } from "./HotelMap-DhZ8GF4X.js";
import "./BackToTop-Cf3OnJBv.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "sonner";
import "./ThemeToggle-DzFfzEoP.js";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "@base-ui/react/separator";
function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn("p-3", className),
      classNames: {
        months: "flex flex-col sm:flex-row gap-4 relative",
        month: "flex flex-col gap-3",
        month_caption: "flex justify-center items-center h-8 relative",
        caption_label: "text-sm font-semibold tracking-tight",
        nav: "flex items-center gap-1 absolute inset-x-0 top-0 justify-between px-1",
        button_previous: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "h-7 w-7 rounded-full bg-transparent border-foreground/10 hover:bg-muted/60 p-0"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "h-7 w-7 rounded-full bg-transparent border-foreground/10 hover:bg-muted/60 p-0"
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "w-9 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80 flex items-center justify-center",
        week: "flex w-full mt-1.5",
        day: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "[&:has([aria-selected=true])]:bg-primary/10",
          "[&:has(>.range-start)]:rounded-l-full",
          "[&:has(>.range-end)]:rounded-r-full",
          "first:[&:has([aria-selected=true])]:rounded-l-full last:[&:has([aria-selected=true])]:rounded-r-full"
        ),
        day_button: cn(
          "relative h-9 w-9 p-0 font-medium rounded-full inline-flex items-center justify-center transition-colors",
          "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
          "aria-selected:bg-transparent"
        ),
        selected: "[&>button]:bg-gradient-primary [&>button]:text-primary-foreground [&>button]:shadow-md [&>button]:hover:brightness-110",
        today: "[&>button]:ring-1 [&>button]:ring-primary/40 [&>button]:ring-offset-0 [&>button]:font-semibold",
        outside: "text-muted-foreground/40 [&>button]:text-muted-foreground/40",
        disabled: "text-muted-foreground/30 [&>button]:text-muted-foreground/30 [&>button]:pointer-events-none",
        range_start: "range-start [&>button]:bg-gradient-primary [&>button]:text-primary-foreground [&>button]:shadow-md rounded-l-full",
        range_end: "range-end [&>button]:bg-gradient-primary [&>button]:text-primary-foreground [&>button]:shadow-md rounded-r-full",
        range_middle: "bg-primary/10 [&>button]:bg-transparent [&>button]:text-foreground [&>button]:hover:bg-primary/20 rounded-none",
        hidden: "invisible",
        ...classNames
      },
      components: {
        Chevron: ({ orientation, ...rest }) => orientation === "left" ? /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4", ...rest }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4", ...rest })
      },
      ...props
    }
  );
}
function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsx(Popover$1.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(Popover$1.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(Popover$1.Portal, { children: /* @__PURE__ */ jsx(
    Popover$1.Positioner,
    {
      align,
      alignOffset,
      side,
      sideOffset,
      className: "isolate z-50",
      children: /* @__PURE__ */ jsx(
        Popover$1.Popup,
        {
          "data-slot": "popover-content",
          className: cn(
            "z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          ),
          ...props
        }
      )
    }
  ) });
}
function parseLocalDate(value) {
  if (!value) return void 0;
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
function DateRangePicker({
  checkIn,
  checkOut,
  onChange,
  minDate,
  className
}) {
  const [open, setOpen] = React.useState(false);
  const range = React.useMemo(
    () => ({
      from: parseLocalDate(checkIn),
      to: parseLocalDate(checkOut)
    }),
    [checkIn, checkOut]
  );
  const nights = range.from && range.to ? Math.max(0, differenceInCalendarDays(range.to, range.from)) : 0;
  const handleSelect = (next) => {
    onChange({
      check_in_date: toISODate(next?.from),
      check_out_date: toISODate(next?.to)
    });
    if (next?.from && next?.to && next.from.getTime() !== next.to.getTime()) {
      setOpen(false);
    }
  };
  const today = React.useMemo(() => {
    const t = /* @__PURE__ */ new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);
  const minDay = parseLocalDate(minDate) || today;
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: cn(
          "group/dates w-full text-left rounded-2xl border border-input bg-muted/60 hover:bg-muted transition-all duration-300 ease-out-expo focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 focus-visible:border-primary/40 dark:bg-input/40",
          open && "bg-background border-primary/40 ring-4 ring-primary/15",
          className
        ),
        children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[1fr_auto_1fr] items-stretch divide-x divide-border/60", children: [
          /* @__PURE__ */ jsxs("div", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground", children: [
              /* @__PURE__ */ jsx(Calendar$1, { className: "h-3 w-3" }),
              "Check-in"
            ] }),
            /* @__PURE__ */ jsx(
              "p",
              {
                className: cn(
                  "mt-0.5 text-[15px] font-medium truncate",
                  !range.from && "text-muted-foreground/70 font-normal"
                ),
                children: range.from ? format(range.from, "EEE, MMM d") : "Add date"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center px-2 text-muted-foreground/60", children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground", children: [
              /* @__PURE__ */ jsx(Calendar$1, { className: "h-3 w-3" }),
              "Check-out"
            ] }),
            /* @__PURE__ */ jsx(
              "p",
              {
                className: cn(
                  "mt-0.5 text-[15px] font-medium truncate",
                  !range.to && "text-muted-foreground/70 font-normal"
                ),
                children: range.to ? format(range.to, "EEE, MMM d") : "Add date"
              }
            )
          ] })
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxs(
      PopoverContent,
      {
        align: "start",
        sideOffset: 8,
        className: "w-auto p-0 rounded-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] border border-foreground/10",
        children: [
          /* @__PURE__ */ jsx("div", { className: "p-2", children: /* @__PURE__ */ jsx(
            Calendar,
            {
              mode: "range",
              selected: range,
              onSelect: handleSelect,
              numberOfMonths: 2,
              disabled: { before: minDay },
              defaultMonth: range.from || minDay
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 border-t border-border/60 px-4 py-3 text-xs bg-muted/30", children: [
            /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: nights > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-foreground", children: nights }),
              " ",
              "night",
              nights !== 1 ? "s" : "",
              " selected"
            ] }) : "Select your check-in and check-out dates" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  onChange({
                    check_in_date: "",
                    check_out_date: ""
                  });
                },
                className: "text-xs font-medium text-muted-foreground hover:text-foreground transition-colors",
                children: "Clear"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function Stepper({ step }) {
  const steps = [
    { id: 1, label: "Dates", icon: Calendar$1 },
    { id: 2, label: "Room", icon: BedDouble },
    { id: 3, label: "Confirm", icon: CheckCircle2 }
  ];
  return /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 sm:gap-3", children: steps.map((s, i) => {
    const Icon = s.icon;
    const active = step >= s.id;
    const current = step === s.id;
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: cn(
            "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 ease-out-expo",
            active ? "bg-gradient-primary text-primary-foreground shadow-glow" : "bg-muted text-muted-foreground",
            current && "scale-105"
          ),
          children: [
            /* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsx("span", { children: s.label })
          ]
        }
      ),
      i < steps.length - 1 && /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "h-px w-6 sm:w-10 transition-colors duration-300",
            step > s.id ? "bg-primary/60" : "bg-border"
          )
        }
      )
    ] }, s.id);
  }) });
}
function Create({ hotel }) {
  const roomTypes = hotel.room_types || [];
  const heroImage = hotel.images?.[0] || null;
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { data, setData, post, processing, errors } = useForm({
    room_id: "",
    check_in_date: "",
    check_out_date: ""
  });
  const nights = useMemo(() => {
    if (!data.check_in_date || !data.check_out_date) return 0;
    const diff = new Date(data.check_out_date) - new Date(data.check_in_date);
    return Math.max(0, Math.ceil(diff / (1e3 * 60 * 60 * 24)));
  }, [data.check_in_date, data.check_out_date]);
  const pricePerNight = selectedRoomType?.price_per_night || 0;
  const totalPrice = nights * pricePerNight;
  const datesValid = nights > 0;
  const step = !datesValid ? 1 : !selectedRoom ? 2 : 3;
  const selectRoom = (roomType, room) => {
    setSelectedRoomType(roomType);
    setSelectedRoom(room);
    setData("room_id", String(room.id));
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("bookings.store"));
  };
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  return /* @__PURE__ */ jsxs(WebLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Book ${hotel.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden", children: [
      heroImage ? /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 bg-cover bg-center scale-110 blur-sm",
          style: { backgroundImage: `url(${heroImage})` }
        }
      ) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-mesh" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" }),
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 space-y-6", children: [
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", asChild: true, className: "w-fit", children: /* @__PURE__ */ jsxs(Link, { href: `/explore/${hotel.uuid}`, children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
          " Back to",
          " ",
          hotel.name
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 animate-fade-up", children: [
            /* @__PURE__ */ jsxs(
              Badge,
              {
                variant: "outline",
                className: "glass border-foreground/10 text-foreground/80",
                children: [
                  /* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3" }),
                  "Reserve your stay"
                ]
              }
            ),
            /* @__PURE__ */ jsxs("h1", { className: "text-4xl sm:text-5xl font-bold tracking-tight", children: [
              "Book",
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-gradient-primary", children: hotel.name })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
              hotel.city,
              ", ",
              hotel.country,
              hotel.rating > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { className: "mx-1", children: "•" }),
                /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-amber-400 text-amber-400" }),
                /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: hotel.rating })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "animate-fade-up [animation-delay:100ms]", children: /* @__PURE__ */ jsx(Stepper, { step }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-32 lg:pb-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
          /* @__PURE__ */ jsxs(
            Card,
            {
              variant: "elevated",
              className: "animate-fade-up",
              children: [
                /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
                  /* @__PURE__ */ jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold", children: "1" }),
                  "Select your dates"
                ] }) }),
                /* @__PURE__ */ jsxs(CardContent, { children: [
                  /* @__PURE__ */ jsx(
                    DateRangePicker,
                    {
                      checkIn: data.check_in_date,
                      checkOut: data.check_out_date,
                      minDate: today,
                      onChange: ({
                        check_in_date,
                        check_out_date
                      }) => {
                        setData((prev) => ({
                          ...prev,
                          check_in_date,
                          check_out_date
                        }));
                      }
                    }
                  ),
                  (errors.check_in_date || errors.check_out_date) && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-destructive", children: errors.check_in_date || errors.check_out_date }),
                  datesValid && /* @__PURE__ */ jsxs("div", { className: "mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium animate-scale-in", children: [
                    /* @__PURE__ */ jsx(CheckCircle2, { className: "h-3.5 w-3.5" }),
                    nights,
                    " night",
                    nights !== 1 ? "s" : "",
                    " selected"
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Card,
            {
              variant: "elevated",
              className: "animate-fade-up [animation-delay:80ms]",
              children: [
                /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
                  /* @__PURE__ */ jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold", children: "2" }),
                  "Choose a room"
                ] }) }),
                /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
                  roomTypes.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground text-center py-6", children: "No rooms available right now." }),
                  roomTypes.map((type) => {
                    const availableRooms = (type.rooms || []).filter(
                      (r) => r.status === "available"
                    );
                    return /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: "rounded-2xl border border-border/60 bg-muted/20 p-4 space-y-4 transition-all duration-300 ease-out-expo hover:border-primary/30",
                        children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg leading-tight", children: type.name }),
                              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs text-muted-foreground", children: [
                                /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-background px-2 py-0.5", children: [
                                  /* @__PURE__ */ jsx(Users, { className: "h-3 w-3" }),
                                  type.max_users,
                                  " ",
                                  "guests"
                                ] }),
                                /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-background px-2 py-0.5", children: [
                                  /* @__PURE__ */ jsx(BedDouble, { className: "h-3 w-3" }),
                                  availableRooms.length,
                                  " ",
                                  "available"
                                ] })
                              ] }),
                              type.description && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground pt-1", children: type.description })
                            ] }),
                            /* @__PURE__ */ jsxs("div", { className: "text-right shrink-0", children: [
                              /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-gradient-primary leading-none", children: [
                                "$",
                                type.price_per_night
                              ] }),
                              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "/ night" })
                            ] })
                          ] }),
                          availableRooms.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 gap-2", children: availableRooms.map(
                            (room) => {
                              const selected = selectedRoom?.id === room.id;
                              return /* @__PURE__ */ jsxs(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => selectRoom(
                                    type,
                                    room
                                  ),
                                  className: cn(
                                    "group relative p-3 rounded-xl border text-center text-sm transition-all duration-300 ease-out-expo overflow-hidden",
                                    selected ? "border-primary bg-gradient-primary text-primary-foreground shadow-glow scale-[1.02]" : "border-border bg-background hover:border-primary/40 hover:-translate-y-0.5"
                                  ),
                                  children: [
                                    /* @__PURE__ */ jsxs(
                                      "p",
                                      {
                                        className: cn(
                                          "font-semibold",
                                          selected ? "text-primary-foreground" : ""
                                        ),
                                        children: [
                                          "#",
                                          room.room_number
                                        ]
                                      }
                                    ),
                                    room.floor && /* @__PURE__ */ jsxs(
                                      "p",
                                      {
                                        className: cn(
                                          "text-[10px] mt-0.5",
                                          selected ? "text-primary-foreground/80" : "text-muted-foreground"
                                        ),
                                        children: [
                                          "Floor",
                                          " ",
                                          room.floor
                                        ]
                                      }
                                    ),
                                    selected && /* @__PURE__ */ jsx(CheckCircle2, { className: "absolute top-1 right-1 h-3.5 w-3.5 animate-scale-in" })
                                  ]
                                },
                                room.id
                              );
                            }
                          ) }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground text-center py-2", children: "Sold out for these dates" })
                        ]
                      },
                      type.id
                    );
                  }),
                  errors.room_id && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.room_id })
                ] })
              ]
            }
          ),
          hotel.latitude && hotel.longitude && /* @__PURE__ */ jsxs(
            Card,
            {
              variant: "elevated",
              className: "animate-fade-up [animation-delay:160ms] overflow-hidden",
              children: [
                /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
                  /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-primary" }),
                  "Location"
                ] }) }),
                /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsx(
                  HotelMap,
                  {
                    latitude: hotel.latitude,
                    longitude: hotel.longitude,
                    name: hotel.name,
                    className: "h-[280px] w-full"
                  }
                ) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsx(
          BookingSummary,
          {
            hotel,
            selectedRoomType,
            selectedRoom,
            checkIn: data.check_in_date,
            checkOut: data.check_out_date,
            nights,
            pricePerNight,
            totalPrice,
            processing,
            canSubmit: !!selectedRoom && nights > 0
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "lg:hidden fixed bottom-0 inset-x-0 z-40 glass-strong border-t border-border/40 px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsx("div", { children: selectedRoom && nights > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Total · ",
            nights,
            " night",
            nights !== 1 ? "s" : ""
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold text-gradient-primary", children: [
            "$",
            totalPrice.toFixed(2)
          ] })
        ] }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Pick dates & room to continue" }) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            variant: "gradient",
            size: "xl",
            shape: "pill",
            disabled: processing || !selectedRoom || nights <= 0,
            children: processing ? "Booking…" : "Confirm"
          }
        )
      ] }) })
    ] })
  ] });
}
function BookingSummary({
  hotel,
  selectedRoomType,
  selectedRoom,
  checkIn,
  checkOut,
  nights,
  pricePerNight,
  totalPrice,
  processing,
  canSubmit
}) {
  return /* @__PURE__ */ jsxs(Card, { variant: "glass", className: "sticky top-24 animate-fade-up", children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
      /* @__PURE__ */ jsx(CreditCard, { className: "h-4 w-4 text-primary" }),
      "Booking summary"
    ] }) }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold", children: hotel.name }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5" }),
          hotel.city,
          ", ",
          hotel.country
        ] })
      ] }),
      /* @__PURE__ */ jsx(Separator, {}),
      selectedRoomType ? /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm animate-fade-up", children: [
        /* @__PURE__ */ jsx(Row, { label: "Room type", value: selectedRoomType.name }),
        /* @__PURE__ */ jsx(
          Row,
          {
            label: "Room",
            value: `#${selectedRoom?.room_number}`
          }
        )
      ] }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground text-center py-2", children: "Select a room above" }),
      checkIn && checkOut && /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm animate-fade-up", children: [
        /* @__PURE__ */ jsx(
          Row,
          {
            label: "Check-in",
            value: new Date(checkIn).toLocaleDateString(
              void 0,
              {
                month: "short",
                day: "numeric",
                year: "numeric"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          Row,
          {
            label: "Check-out",
            value: new Date(checkOut).toLocaleDateString(
              void 0,
              {
                month: "short",
                day: "numeric",
                year: "numeric"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          Row,
          {
            label: "Duration",
            value: `${nights} night${nights !== 1 ? "s" : ""}`
          }
        )
      ] }),
      nights > 0 && selectedRoomType && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Separator, {}),
        /* @__PURE__ */ jsx(
          Row,
          {
            label: `$${pricePerNight} × ${nights} night${nights !== 1 ? "s" : ""}`,
            value: `$${totalPrice.toFixed(2)}`
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-gradient-primary-soft p-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Total" }),
          /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold text-gradient-primary", children: [
            "$",
            totalPrice.toFixed(2)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          variant: "gradient",
          size: "xl",
          shape: "pill",
          className: "w-full",
          disabled: processing || !canSubmit,
          children: processing ? "Booking…" : "Confirm Booking"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-center text-muted-foreground", children: "You won't be charged yet. Pay after confirmation." })
    ] })
  ] });
}
function Row({ label, value }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-4", children: [
    /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("span", { className: "font-medium text-right", children: value })
  ] });
}
export {
  Create as default
};
