import { jsxs, jsx } from "react/jsx-runtime";
import { U as UserLayout } from "./UserLayout-Cqdl8mOt.js";
import { usePage, Head, Link } from "@inertiajs/react";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle, d as CardDescription } from "./card-BY9Lq84_.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { B as Button } from "./button-Dm9784FB.js";
import "clsx";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BbquYNfF.js";
import { Hotel, CalendarCheck, Luggage, Clock, DollarSign, CalendarClock, CreditCard, Star, MapPin, BedDouble, ArrowRight } from "lucide-react";
import "react";
import "./BackToTop-Cf3OnJBv.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "sonner";
import "./WebLayout-Dc8gJj4l.js";
import "./ThemeToggle-DzFfzEoP.js";
import "class-variance-authority";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "tailwind-merge";
const getStatusBadge = (status) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmed: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200"
  };
  return /* @__PURE__ */ jsx(Badge, { variant: "outline", className: styles[status] || "", children: status?.charAt(0).toUpperCase() + status?.slice(1) });
};
const getPaymentBadge = (payment) => {
  if (!payment) return /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-muted-foreground", children: "Unpaid" });
  if (payment.status === "paid") return /* @__PURE__ */ jsx(Badge, { className: "bg-green-100 text-green-800 border-green-200", children: "Paid" });
  return /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "bg-yellow-100 text-yellow-800", children: payment.status });
};
function Dashboard({ stats, upcomingBookings, recentBookings, featuredHotels }) {
  const { auth } = usePage().props;
  const user = auth.user;
  const greeting = () => {
    const hour = (/* @__PURE__ */ new Date()).getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  return /* @__PURE__ */ jsxs(UserLayout, { title: "User Dashboard", children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-8 text-white shadow-lg", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-xl" }),
        /* @__PURE__ */ jsx("div", { className: "absolute right-8 bottom-4 opacity-10", children: /* @__PURE__ */ jsx(Hotel, { className: "h-32 w-32" }) }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-bold tracking-tight", children: [
            greeting(),
            ", ",
            user.name,
            "!"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-white/80 max-w-lg", children: "Welcome to your hotel booking dashboard. View your reservations, track your stays, and discover new destinations." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Total Bookings" }),
            /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold mt-1", children: stats.total_bookings })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center", children: /* @__PURE__ */ jsx(CalendarCheck, { className: "h-6 w-6 text-blue-600" }) })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Confirmed" }),
            /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold mt-1", children: stats.confirmed_bookings })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center", children: /* @__PURE__ */ jsx(Luggage, { className: "h-6 w-6 text-green-600" }) })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Pending" }),
            /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold mt-1", children: stats.pending_bookings })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-xl bg-yellow-100 flex items-center justify-center", children: /* @__PURE__ */ jsx(Clock, { className: "h-6 w-6 text-yellow-600" }) })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Total Spent" }),
            /* @__PURE__ */ jsxs("p", { className: "text-3xl font-bold mt-1", children: [
              "$",
              Number(stats.total_spent).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center", children: /* @__PURE__ */ jsx(DollarSign, { className: "h-6 w-6 text-emerald-600" }) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
          /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-sm", children: [
            /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
                /* @__PURE__ */ jsx(CalendarClock, { className: "h-5 w-5 text-primary" }),
                "Upcoming Stays"
              ] }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Your next scheduled check-ins" })
            ] }) }) }),
            /* @__PURE__ */ jsx(CardContent, { children: upcomingBookings.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: upcomingBookings.map((booking) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "hidden sm:flex h-14 w-14 rounded-xl bg-primary/10 items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Hotel, { className: "h-6 w-6 text-primary" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                      /* @__PURE__ */ jsx("p", { className: "font-semibold truncate", children: booking.room.hotel.name }),
                      getStatusBadge(booking.status)
                    ] }),
                    /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
                      booking.room.room_type.name,
                      " · Room #",
                      booking.room.room_number
                    ] }),
                    /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                      new Date(booking.check_in_date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                      " ",
                      "→",
                      " ",
                      new Date(booking.check_out_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "text-right shrink-0", children: [
                    /* @__PURE__ */ jsxs("p", { className: "font-bold text-lg", children: [
                      "$",
                      booking.total_price
                    ] }),
                    getPaymentBadge(booking.payment)
                  ] })
                ]
              },
              booking.id
            )) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(CalendarClock, { className: "h-8 w-8 text-muted-foreground" }) }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground font-medium", children: "No upcoming stays" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Your next trips will appear here" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-sm", children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
              /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
                /* @__PURE__ */ jsx(CreditCard, { className: "h-5 w-5 text-primary" }),
                "Recent Bookings"
              ] }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Your latest reservation history" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: recentBookings.length > 0 ? /* @__PURE__ */ jsx("div", { className: "rounded-lg border overflow-hidden", children: /* @__PURE__ */ jsxs(Table, { children: [
              /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { className: "bg-muted/50", children: [
                /* @__PURE__ */ jsx(TableHead, { children: "Hotel" }),
                /* @__PURE__ */ jsx(TableHead, { className: "hidden sm:table-cell", children: "Room" }),
                /* @__PURE__ */ jsx(TableHead, { children: "Dates" }),
                /* @__PURE__ */ jsx(TableHead, { children: "Amount" }),
                /* @__PURE__ */ jsx(TableHead, { children: "Status" })
              ] }) }),
              /* @__PURE__ */ jsx(TableBody, { children: recentBookings.map((booking) => /* @__PURE__ */ jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxs(TableCell, { children: [
                  /* @__PURE__ */ jsx("div", { className: "font-medium", children: booking.room.hotel.name }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground sm:hidden", children: booking.room.room_type.name })
                ] }),
                /* @__PURE__ */ jsxs(TableCell, { className: "hidden sm:table-cell", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-sm", children: booking.room.room_type.name }),
                  /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
                    "#",
                    booking.room.room_number
                  ] })
                ] }),
                /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
                  new Date(booking.check_in_date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                  " - ",
                  new Date(booking.check_out_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                ] }) }),
                /* @__PURE__ */ jsxs(TableCell, { className: "font-semibold", children: [
                  "$",
                  booking.total_price
                ] }),
                /* @__PURE__ */ jsx(TableCell, { children: getStatusBadge(booking.status) })
              ] }, booking.id)) })
            ] }) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(CreditCard, { className: "h-8 w-8 text-muted-foreground" }) }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground font-medium", children: "No bookings yet" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Your reservation history will show here" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-sm", children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
              /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
                /* @__PURE__ */ jsx(Star, { className: "h-5 w-5 text-amber-500" }),
                "Top Rated Hotels"
              ] }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Discover our best properties" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: featuredHotels.map((hotel) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "group p-4 rounded-xl border bg-card hover:shadow-md transition-all cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
                    /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsx("h4", { className: "font-semibold truncate group-hover:text-primary transition-colors", children: hotel.name }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 mt-1 text-sm text-muted-foreground", children: [
                        /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5" }),
                        /* @__PURE__ */ jsxs("span", { className: "truncate", children: [
                          hotel.city,
                          ", ",
                          hotel.country
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md text-sm font-medium shrink-0 ml-2", children: [
                      /* @__PURE__ */ jsx(Star, { className: "h-3.5 w-3.5 fill-amber-400 text-amber-400" }),
                      hotel.rating
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-3 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsx(BedDouble, { className: "h-3.5 w-3.5" }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      hotel.rooms_count,
                      " rooms available"
                    ] })
                  ] })
                ]
              },
              hotel.id
            )) }) })
          ] }),
          /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm bg-gradient-to-br from-slate-50 to-slate-100", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm", children: "Need help?" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Contact our support team for any booking inquiries or assistance." }),
            /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", className: "mt-4 w-full", asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: route("profile.edit"), children: [
              "Manage Profile",
              /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-3.5 w-3.5" })
            ] }) })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  Dashboard as default
};
