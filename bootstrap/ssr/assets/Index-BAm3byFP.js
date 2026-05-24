import { jsxs, jsx } from "react/jsx-runtime";
import { U as UserLayout } from "./UserLayout-Cqdl8mOt.js";
import { Head, Link } from "@inertiajs/react";
import { C as Card, c as CardContent } from "./card-BY9Lq84_.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { B as Button } from "./button-Dm9784FB.js";
import { Sparkles, Hotel, CalendarDays, ArrowRight, CalendarCheck } from "lucide-react";
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
import "clsx";
import "tailwind-merge";
const statusStyles = {
  pending: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  confirmed: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  cancelled: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
  completed: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20"
};
function StatusBadge({ status }) {
  return /* @__PURE__ */ jsx(
    Badge,
    {
      variant: "outline",
      className: statusStyles[status] || "",
      children: status?.charAt(0).toUpperCase() + status?.slice(1)
    }
  );
}
function PaymentBadge({ payment }) {
  if (!payment)
    return /* @__PURE__ */ jsx(
      Badge,
      {
        variant: "outline",
        className: "text-muted-foreground",
        children: "Unpaid"
      }
    );
  if (payment.status === "paid")
    return /* @__PURE__ */ jsx(Badge, { className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20", children: "Paid" });
  return /* @__PURE__ */ jsx(
    Badge,
    {
      variant: "outline",
      className: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
      children: payment.status
    }
  );
}
function BookingsIndex({ bookings }) {
  const bookingData = bookings.data || [];
  return /* @__PURE__ */ jsxs(UserLayout, { title: "My Bookings", children: [
    /* @__PURE__ */ jsx(Head, { title: "My Bookings" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-primary" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-mesh opacity-30 mix-blend-overlay" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 noise opacity-30" }),
        /* @__PURE__ */ jsxs("div", { className: "relative p-8 text-primary-foreground space-y-2", children: [
          /* @__PURE__ */ jsxs(
            Badge,
            {
              variant: "outline",
              className: "glass border-white/20 text-white w-fit",
              children: [
                /* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3" }),
                bookings.total ?? bookingData.length,
                " ",
                (bookings.total ?? bookingData.length) === 1 ? "booking" : "bookings"
              ]
            }
          ),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "My bookings" }),
          /* @__PURE__ */ jsx("p", { className: "text-primary-foreground/85 max-w-lg", children: "View and manage all your hotel reservations in one place." })
        ] })
      ] }),
      bookingData.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: bookingData.map((booking, idx) => /* @__PURE__ */ jsx(
        Link,
        {
          href: route("bookings.show", booking.uuid),
          className: "block animate-fade-up",
          style: {
            animationDelay: `${Math.min(idx * 40, 240)}ms`
          },
          children: /* @__PURE__ */ jsx(
            Card,
            {
              variant: "elevated",
              interactive: true,
              className: "overflow-hidden",
              children: /* @__PURE__ */ jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "hidden sm:flex h-14 w-14 rounded-2xl bg-gradient-primary-soft items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Hotel, { className: "h-6 w-6 text-primary" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold truncate", children: booking.room?.hotel?.name || "Hotel" }),
                    /* @__PURE__ */ jsx(
                      StatusBadge,
                      {
                        status: booking.status
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
                    booking.room?.room_type?.name || "Room",
                    " ",
                    "· Room #",
                    booking.room?.room_number
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground mt-1.5", children: [
                    /* @__PURE__ */ jsx(CalendarDays, { className: "h-3.5 w-3.5" }),
                    new Date(
                      booking.check_in_date
                    ).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric"
                      }
                    ),
                    " ",
                    "→",
                    " ",
                    new Date(
                      booking.check_out_date
                    ).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-right shrink-0 flex flex-col items-end gap-1", children: [
                  /* @__PURE__ */ jsxs("p", { className: "font-bold text-lg text-gradient-primary", children: [
                    "$",
                    booking.total_price
                  ] }),
                  /* @__PURE__ */ jsx(
                    PaymentBadge,
                    {
                      payment: booking.payment
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5 text-muted-foreground shrink-0 hidden sm:block transition-transform group-hover:translate-x-1" })
              ] }) })
            }
          )
        },
        booking.id
      )) }) : /* @__PURE__ */ jsx(Card, { variant: "soft", className: "text-center py-16", children: /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto h-16 w-16 rounded-full bg-gradient-primary-soft flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(CalendarCheck, { className: "h-8 w-8 text-primary" }) }),
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: "No bookings yet" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Your reservations will appear here once you book a hotel." }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "gradient",
            shape: "pill",
            size: "lg",
            className: "mt-6",
            asChild: true,
            children: /* @__PURE__ */ jsxs(Link, { href: route("hotels.index"), children: [
              "Browse hotels",
              /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
            ] })
          }
        )
      ] }) }),
      bookings.links && bookings.last_page > 1 && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-1", children: bookings.links.map((link, index) => /* @__PURE__ */ jsx(
        Link,
        {
          href: link.url || "#",
          className: `min-w-9 h-9 inline-flex items-center justify-center px-3 text-sm rounded-full transition-all ${link.active ? "bg-gradient-primary text-primary-foreground shadow-glow" : link.url ? "hover:bg-muted" : "text-muted-foreground cursor-not-allowed"}`,
          dangerouslySetInnerHTML: {
            __html: link.label
          },
          preserveScroll: true
        },
        index
      )) })
    ] })
  ] });
}
export {
  BookingsIndex as default
};
