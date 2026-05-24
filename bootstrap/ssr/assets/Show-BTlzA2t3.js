import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { Head, Link } from "@inertiajs/react";
import { B as Button } from "./button-Dm9784FB.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BY9Lq84_.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { S as Separator } from "./separator-CBwNKPLd.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { ChevronLeft, Edit, CreditCard, DollarSign, Hotel, Calendar, User } from "lucide-react";
import "react";
import "./BackToTop-Cf3OnJBv.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "sonner";
import "@base-ui/react/scroll-area";
import "./ThemeToggle-DzFfzEoP.js";
import "@base-ui/react/dialog";
import "./input-D6vmmPPF.js";
import "@base-ui/react/input";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "@base-ui/react/separator";
const getStatusBadge = (status) => {
  switch (status) {
    case "pending":
      return /* @__PURE__ */ jsx(
        Badge,
        {
          variant: "outline",
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
          children: "Pending"
        }
      );
    case "paid":
      return /* @__PURE__ */ jsx(Badge, { className: "bg-green-100 text-green-800 border-green-200 hover:bg-green-200", children: "Paid" });
    case "failed":
      return /* @__PURE__ */ jsx(Badge, { variant: "destructive", children: "Failed" });
    case "refunded":
      return /* @__PURE__ */ jsx(
        Badge,
        {
          variant: "outline",
          className: "bg-blue-100 text-blue-800 border-blue-200",
          children: "Refunded"
        }
      );
    default:
      return /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: status });
  }
};
function Show({ payment }) {
  const booking = payment.booking;
  const user = booking?.user;
  const room = booking?.room;
  const hotel = room?.hotel;
  const roomType = room?.room_type;
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(
      Head,
      {
        title: `Payment - ${payment.transaction_id || `PAY-${payment.id}`}`
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.payments.index"), children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Payment Details" })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: route("dashboard.payments.edit", payment.uuid), children: [
          /* @__PURE__ */ jsx(Edit, { className: "mr-2 h-4 w-4" }),
          " Edit Payment"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-6", children: [
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(CreditCard, { className: "h-5 w-5" }),
              " Payment Information"
            ] }) }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Transaction ID" }),
                  /* @__PURE__ */ jsx("p", { className: "font-mono font-semibold", children: payment.transaction_id || `PAY-${payment.id}` })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Status" }),
                  /* @__PURE__ */ jsx("div", { className: "mt-1", children: getStatusBadge(payment.status) })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Separator, {}),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "bg-primary/10 p-2 rounded-md", children: /* @__PURE__ */ jsx(DollarSign, { className: "h-5 w-5 text-primary" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Amount" }),
                    /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold text-primary", children: [
                      "$",
                      payment.amount
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Payment Method" }),
                  /* @__PURE__ */ jsx("p", { className: "font-semibold uppercase", children: payment.method })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Separator, {}),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Paid At" }),
                  /* @__PURE__ */ jsx("p", { className: "font-medium", children: payment.paid_at ? new Date(
                    payment.paid_at
                  ).toLocaleDateString(
                    void 0,
                    {
                      dateStyle: "long"
                    }
                  ) : "Not yet paid" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Created At" }),
                  /* @__PURE__ */ jsx("p", { className: "font-medium", children: new Date(
                    payment.created_at
                  ).toLocaleDateString(void 0, {
                    dateStyle: "long"
                  }) })
                ] })
              ] })
            ] })
          ] }),
          booking && /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Hotel, { className: "h-5 w-5" }),
              " Booking Information"
            ] }) }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Booking ID" }),
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: route(
                        "dashboard.bookings.show",
                        booking.uuid
                      ),
                      className: "text-primary hover:underline font-semibold text-lg block",
                      children: [
                        "#",
                        booking.id
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Hotel" }),
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: hotel?.name || "N/A" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Separator, {}),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Room Type" }),
                  /* @__PURE__ */ jsx("p", { className: "font-medium", children: roomType?.name || "N/A" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Room Number" }),
                  /* @__PURE__ */ jsx("p", { className: "font-medium", children: room?.room_number || "N/A" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Separator, {}),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "bg-primary/10 p-2 rounded-md", children: /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5 text-primary" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Check In" }),
                    /* @__PURE__ */ jsx("p", { className: "font-medium", children: booking.check_in_date ? new Date(
                      booking.check_in_date
                    ).toLocaleDateString(
                      void 0,
                      {
                        dateStyle: "long"
                      }
                    ) : "N/A" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "bg-primary/10 p-2 rounded-md", children: /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5 text-primary" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Check Out" }),
                    /* @__PURE__ */ jsx("p", { className: "font-medium", children: booking.check_out_date ? new Date(
                      booking.check_out_date
                    ).toLocaleDateString(
                      void 0,
                      {
                        dateStyle: "long"
                      }
                    ) : "N/A" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-muted p-4 rounded-lg", children: [
                /* @__PURE__ */ jsx("span", { className: "text-lg font-medium", children: "Booking Total" }),
                /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold text-primary", children: [
                  "$",
                  booking.total_price
                ] })
              ] })
            ] })
          ] })
        ] }),
        user && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(User, { className: "h-5 w-5" }),
            " user Information"
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Name" }),
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: user.name })
            ] }),
            /* @__PURE__ */ jsx(Separator, {}),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Email" }),
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: user.email })
            ] })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Show as default
};
