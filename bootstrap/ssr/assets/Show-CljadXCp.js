import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { Head, Link, router } from "@inertiajs/react";
import { B as Button } from "./button-Dm9784FB.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent, e as CardFooter } from "./card-BY9Lq84_.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { S as Separator } from "./separator-CBwNKPLd.js";
import { ChevronLeft, Hotel, Calendar, MapPin, DollarSign, CreditCard, Loader2, Mail, Phone } from "lucide-react";
import { H as HotelMap } from "./HotelMap-DhZ8GF4X.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DjoqtalQ.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-zbygvPRX.js";
import { A as Avatar, a as AvatarImage, b as AvatarFallback } from "./BackToTop-Cf3OnJBv.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { toast } from "sonner";
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
import "@base-ui/react/select";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
function Show({ booking }) {
  const [processing, setProcessing] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const updateStatus = (status) => {
    setProcessing(true);
    router.patch(
      route("dashboard.bookings.update", booking.uuid),
      { status },
      {
        onSuccess: () => toast.success("Status updated"),
        onFinish: () => setProcessing(false)
      }
    );
  };
  const handleRecordPayment = () => {
    setPaymentProcessing(true);
    router.post(
      route("dashboard.payments.store"),
      {
        booking_id: booking.id,
        amount: booking.total_price,
        method: paymentMethod,
        status: "paid"
      },
      {
        onSuccess: () => {
          toast.success("Payment recorded successfully");
          setPaymentOpen(false);
        },
        onError: () => toast.error("Failed to record payment"),
        onFinish: () => setPaymentProcessing(false)
      }
    );
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Booking Details - #${booking.id}` }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.bookings.index"), children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Booking Details" }),
          /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "text-lg", children: [
            "#",
            booking.id
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-muted-foreground mr-2", children: "Update Status:" }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              defaultValue: booking.status,
              onValueChange: updateStatus,
              disabled: processing,
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[180px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "pending", children: "Pending" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "confirmed", children: "Confirmed" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "cancelled", children: "Cancelled" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "completed", children: "Completed" })
                ] })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-6", children: [
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Hotel, { className: "h-5 w-5" }),
              " Stay Information"
            ] }) }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Hotel" }),
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: booking.room.hotel.name }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                    booking.room.hotel.city,
                    ",",
                    " ",
                    booking.room.hotel.country
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Room Type" }),
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: booking.room.room_type.name }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                    "Room #: ",
                    booking.room.room_number
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Separator, {}),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "bg-primary/10 p-2 rounded-md", children: /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5 text-primary" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Check In" }),
                    /* @__PURE__ */ jsx("p", { className: "font-medium", children: new Date(
                      booking.check_in_date
                    ).toLocaleDateString(
                      void 0,
                      { dateStyle: "long" }
                    ) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "bg-primary/10 p-2 rounded-md", children: /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5 text-primary" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Check Out" }),
                    /* @__PURE__ */ jsx("p", { className: "font-medium", children: new Date(
                      booking.check_out_date
                    ).toLocaleDateString(
                      void 0,
                      { dateStyle: "long" }
                    ) })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          booking.room?.hotel?.latitude && booking.room?.hotel?.longitude && /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5" }),
              " Hotel Location"
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsx(
              HotelMap,
              {
                latitude: booking.room.hotel.latitude,
                longitude: booking.room.hotel.longitude,
                name: booking.room.hotel.name,
                className: "h-[200px] w-full"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(DollarSign, { className: "h-5 w-5" }),
              " Payment Summary"
            ] }) }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-muted p-4 rounded-lg", children: [
                /* @__PURE__ */ jsx("span", { className: "text-lg font-medium", children: "Total Amount" }),
                /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold text-primary", children: [
                  "$",
                  booking.total_price
                ] })
              ] }),
              booking.payment ? /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground italic", children: "Transaction ID:" }),
                  /* @__PURE__ */ jsx("span", { className: "font-mono", children: booking.payment.transaction_id || "N/A" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground italic", children: "Method:" }),
                  /* @__PURE__ */ jsx("span", { className: "uppercase", children: booking.payment.method })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground italic", children: "Payment Status:" }),
                  /* @__PURE__ */ jsx(
                    Badge,
                    {
                      className: booking.payment.status === "paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
                      children: booking.payment.status.toUpperCase()
                    }
                  )
                ] })
              ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("div", { className: "text-center py-4 text-muted-foreground", children: "No payment record associated with this booking." }),
                booking.status !== "cancelled" && /* @__PURE__ */ jsxs(
                  Dialog,
                  {
                    open: paymentOpen,
                    onOpenChange: setPaymentOpen,
                    children: [
                      /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "w-full", children: [
                        /* @__PURE__ */ jsx(CreditCard, { className: "mr-2 h-4 w-4" }),
                        "Proceed to Payment"
                      ] }) }),
                      /* @__PURE__ */ jsxs(DialogContent, { children: [
                        /* @__PURE__ */ jsxs(DialogHeader, { children: [
                          /* @__PURE__ */ jsx(DialogTitle, { children: "Record Payment" }),
                          /* @__PURE__ */ jsxs(DialogDescription, { children: [
                            "Record a payment of",
                            " ",
                            /* @__PURE__ */ jsxs("strong", { children: [
                              "$",
                              booking.total_price
                            ] }),
                            " ",
                            "for booking #",
                            booking.id,
                            "."
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-4 py-4", children: [
                          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                            /* @__PURE__ */ jsx(Label, { children: "Payment Method" }),
                            /* @__PURE__ */ jsxs(
                              Select,
                              {
                                value: paymentMethod,
                                onValueChange: setPaymentMethod,
                                children: [
                                  /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                                    /* @__PURE__ */ jsx(SelectItem, { value: "card", children: "Credit Card" }),
                                    /* @__PURE__ */ jsx(SelectItem, { value: "cash", children: "Cash" }),
                                    /* @__PURE__ */ jsx(SelectItem, { value: "paypal", children: "PayPal" })
                                  ] })
                                ]
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-muted p-3 rounded-lg", children: [
                            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Amount" }),
                            /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold text-primary", children: [
                              "$",
                              booking.total_price
                            ] })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs(DialogFooter, { children: [
                          /* @__PURE__ */ jsx(
                            Button,
                            {
                              variant: "outline",
                              onClick: () => setPaymentOpen(
                                false
                              ),
                              children: "Cancel"
                            }
                          ),
                          /* @__PURE__ */ jsxs(
                            Button,
                            {
                              onClick: handleRecordPayment,
                              disabled: paymentProcessing,
                              children: [
                                paymentProcessing && /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                                "Confirm Payment"
                              ]
                            }
                          )
                        ] })
                      ] })
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "user Information" }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxs(Avatar, { className: "h-20 w-20", children: [
                /* @__PURE__ */ jsx(
                  AvatarImage,
                  {
                    src: booking.user.avatar
                  }
                ),
                /* @__PURE__ */ jsx(AvatarFallback, { className: "text-2xl", children: booking.user.name.charAt(0) })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: booking.user.name }),
              /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: booking.user.role })
            ] }),
            /* @__PURE__ */ jsx(Separator, {}),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
                /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsx("span", { children: booking.user.email })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
                /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsx("span", { children: booking.user.phone || "No phone provided" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              className: "w-full",
              asChild: true,
              children: /* @__PURE__ */ jsx(
                Link,
                {
                  href: route(
                    "dashboard.users.edit",
                    booking.user.uuid
                  ),
                  children: "Edit User Profile"
                }
              )
            }
          ) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Show as default
};
