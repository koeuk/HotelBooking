import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { W as WebLayout } from "./WebLayout-Dc8gJj4l.js";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { T as Textarea } from "./textarea-kC2BQjKr.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent, d as CardDescription } from "./card-BY9Lq84_.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { B as Button } from "./button-Dm9784FB.js";
import { S as Separator } from "./separator-CBwNKPLd.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-zbygvPRX.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DjoqtalQ.js";
import { ArrowLeft, Hotel, BedDouble, MapPin, CalendarDays, DollarSign, MessageSquare, Star, CreditCard, Loader2, XCircle } from "lucide-react";
import { H as HotelMap } from "./HotelMap-DhZ8GF4X.js";
import "./BackToTop-Cf3OnJBv.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "sonner";
import "./ThemeToggle-DzFfzEoP.js";
import "class-variance-authority";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/separator";
import "@base-ui/react/dialog";
import "@base-ui/react/select";
const getStatusBadge = (status) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmed: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200"
  };
  return /* @__PURE__ */ jsx(Badge, { variant: "outline", className: styles[status] || "", children: status?.charAt(0).toUpperCase() + status?.slice(1) });
};
function BookingShow({ booking, canReview }) {
  const [payOpen, setPayOpen] = useState(false);
  const [payMethod, setPayMethod] = useState("card");
  const [payProcessing, setPayProcessing] = useState(false);
  const [cancelProcessing, setCancelProcessing] = useState(false);
  const handlePay = () => {
    setPayProcessing(true);
    router.post(route("bookings.pay", booking.uuid), { method: payMethod }, {
      onFinish: () => {
        setPayProcessing(false);
        setPayOpen(false);
      }
    });
  };
  const handleCancel = () => {
    setCancelProcessing(true);
    router.post(route("bookings.cancel", booking.uuid), {}, {
      onFinish: () => setCancelProcessing(false)
    });
  };
  const hotel = booking.room?.hotel;
  const roomType = booking.room?.room_type;
  const payment = booking.payment;
  const review = booking.review;
  return /* @__PURE__ */ jsxs(WebLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Booking #${booking.id}` }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6", children: [
      /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: route("bookings.index"), children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
        "Back to My Bookings"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold tracking-tight", children: [
            "Booking #",
            booking.id
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1", children: hotel?.name || "Hotel" })
        ] }),
        getStatusBadge(booking.status)
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
          /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-sm", children: [
            /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
              /* @__PURE__ */ jsx(Hotel, { className: "h-5 w-5 text-primary" }),
              "Hotel & Room Details"
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-muted/50", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Hotel" }),
                /* @__PURE__ */ jsx("p", { className: "font-semibold mt-1", children: hotel?.name || "N/A" }),
                hotel?.city && /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  hotel.city,
                  ", ",
                  hotel.country
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-muted/50", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Room" }),
                /* @__PURE__ */ jsxs("p", { className: "font-semibold mt-1 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(BedDouble, { className: "h-4 w-4" }),
                  roomType?.name || "N/A"
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  "Room #",
                  booking.room?.room_number
                ] })
              ] })
            ] }) })
          ] }),
          hotel?.latitude && hotel?.longitude && /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-sm overflow-hidden", children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
              /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 text-primary" }),
                "Hotel Location"
              ] }),
              /* @__PURE__ */ jsxs(CardDescription, { children: [
                hotel.address && `${hotel.address}, `,
                hotel.city,
                ", ",
                hotel.country
              ] })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsx(
              HotelMap,
              {
                latitude: hotel.latitude,
                longitude: hotel.longitude,
                name: hotel.name,
                className: "h-[250px] w-full"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-sm", children: [
            /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
              /* @__PURE__ */ jsx(CalendarDays, { className: "h-5 w-5 text-primary" }),
              "Stay Details"
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-muted/50", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Check-in" }),
                /* @__PURE__ */ jsx("p", { className: "font-semibold mt-1", children: new Date(booking.check_in_date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-muted/50", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Check-out" }),
                /* @__PURE__ */ jsx("p", { className: "font-semibold mt-1", children: new Date(booking.check_out_date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-primary/5", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Total Price" }),
                /* @__PURE__ */ jsxs("p", { className: "font-bold text-2xl mt-1 text-primary flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(DollarSign, { className: "h-5 w-5" }),
                  booking.total_price
                ] })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-sm", children: [
            /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
              /* @__PURE__ */ jsx(MessageSquare, { className: "h-5 w-5 text-primary" }),
              "Review"
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: review ? /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-muted/40", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 mb-2", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(
                Star,
                {
                  className: `h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-zinc-300"}`
                },
                i
              )) }),
              review.comment && /* @__PURE__ */ jsx("p", { className: "text-sm", children: review.comment })
            ] }) : canReview ? /* @__PURE__ */ jsx(ReviewForm, { bookingUuid: booking.uuid }) : /* @__PURE__ */ jsx(
              ReviewLockedState,
              {
                status: booking.status,
                checkOut: booking.check_out_date
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-sm", children: [
            /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
              /* @__PURE__ */ jsx(CreditCard, { className: "h-5 w-5 text-primary" }),
              "Payment Info"
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: payment ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-muted/50 space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Status" }),
                /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(
                  Badge,
                  {
                    className: payment.status === "paid" ? "bg-green-100 text-green-800 border-green-200" : "bg-yellow-100 text-yellow-800 border-yellow-200",
                    children: payment.status?.charAt(0).toUpperCase() + payment.status?.slice(1)
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsx(Separator, {}),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Method" }),
                /* @__PURE__ */ jsx("p", { className: "font-semibold mt-1 capitalize", children: payment.payment_method || "N/A" })
              ] }),
              payment.transaction_id && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Separator, {}),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Transaction ID" }),
                  /* @__PURE__ */ jsx("p", { className: "font-mono text-sm mt-1 break-all", children: payment.transaction_id })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Separator, {}),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Amount" }),
                /* @__PURE__ */ jsxs("p", { className: "font-bold text-lg mt-1", children: [
                  "$",
                  payment.amount
                ] })
              ] })
            ] }) }) : /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-4 text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3", children: /* @__PURE__ */ jsx(CreditCard, { className: "h-6 w-6 text-muted-foreground" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground font-medium", children: "No payment yet" })
              ] }),
              booking.status !== "cancelled" && /* @__PURE__ */ jsxs(Dialog, { open: payOpen, onOpenChange: setPayOpen, children: [
                /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "w-full h-12 rounded-xl text-base", children: [
                  /* @__PURE__ */ jsx(CreditCard, { className: "mr-2 h-4 w-4" }),
                  " Pay Now — $",
                  booking.total_price
                ] }) }),
                /* @__PURE__ */ jsxs(DialogContent, { children: [
                  /* @__PURE__ */ jsxs(DialogHeader, { children: [
                    /* @__PURE__ */ jsx(DialogTitle, { children: "Complete Payment" }),
                    /* @__PURE__ */ jsxs(DialogDescription, { children: [
                      "Pay ",
                      /* @__PURE__ */ jsxs("strong", { children: [
                        "$",
                        booking.total_price
                      ] }),
                      " for your booking at ",
                      hotel?.name,
                      "."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-4 py-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx(Label, { children: "Payment Method" }),
                      /* @__PURE__ */ jsxs(Select, { value: payMethod, onValueChange: setPayMethod, children: [
                        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                        /* @__PURE__ */ jsxs(SelectContent, { children: [
                          /* @__PURE__ */ jsx(SelectItem, { value: "card", children: "Credit Card" }),
                          /* @__PURE__ */ jsx(SelectItem, { value: "cash", children: "Cash" }),
                          /* @__PURE__ */ jsx(SelectItem, { value: "paypal", children: "PayPal" })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "p-3 bg-muted rounded-lg flex justify-between items-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Total" }),
                      /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold text-primary", children: [
                        "$",
                        booking.total_price
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs(DialogFooter, { children: [
                    /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setPayOpen(false), children: "Cancel" }),
                    /* @__PURE__ */ jsxs(Button, { onClick: handlePay, disabled: payProcessing, children: [
                      payProcessing && /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                      "Confirm Payment"
                    ] })
                  ] })
                ] })
              ] })
            ] }) })
          ] }),
          booking.status === "pending" && /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              className: "w-full text-destructive hover:text-destructive hover:bg-destructive/5",
              onClick: handleCancel,
              disabled: cancelProcessing,
              children: [
                cancelProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(XCircle, { className: "mr-2 h-4 w-4" }),
                "Cancel Booking"
              ]
            }
          ) }) })
        ] })
      ] })
    ] })
  ] });
}
function ReviewForm({ bookingUuid }) {
  const [hoverRating, setHoverRating] = useState(0);
  const { data, setData, post, processing, errors } = useForm({
    rating: 0,
    comment: ""
  });
  const submit = (e) => {
    e.preventDefault();
    if (data.rating < 1) return;
    post(route("bookings.review", bookingUuid), {
      preserveScroll: true
    });
  };
  const display = hoverRating || data.rating;
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium mb-2", children: "How was your stay?" }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center gap-1",
          onMouseLeave: () => setHoverRating(0),
          children: [
            [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setData("rating", star),
                onMouseEnter: () => setHoverRating(star),
                "aria-label": `${star} star${star === 1 ? "" : "s"}`,
                className: "p-1 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-md",
                children: /* @__PURE__ */ jsx(
                  Star,
                  {
                    className: `h-7 w-7 transition-colors ${star <= display ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}`
                  }
                )
              },
              star
            )),
            /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-muted-foreground", children: display > 0 ? `${display}/5` : "Tap to rate" })
          ]
        }
      ),
      errors.rating && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive mt-1", children: errors.rating })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(
        Label,
        {
          htmlFor: "comment",
          className: "text-xs uppercase tracking-wide text-muted-foreground",
          children: "Your feedback (optional)"
        }
      ),
      /* @__PURE__ */ jsx(
        Textarea,
        {
          id: "comment",
          rows: 4,
          placeholder: "Share what made your stay memorable…",
          value: data.comment,
          onChange: (e) => setData("comment", e.target.value),
          className: "rounded-2xl bg-muted/60 border-input px-4 py-3 focus-visible:bg-background focus-visible:border-primary/40 focus-visible:ring-4 focus-visible:ring-primary/15 transition-all duration-300",
          maxLength: 1e3
        }
      ),
      errors.comment && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.comment })
    ] }),
    /* @__PURE__ */ jsx(
      Button,
      {
        type: "submit",
        variant: "gradient",
        size: "lg",
        shape: "pill",
        disabled: processing || data.rating < 1,
        children: processing ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin mr-2" }),
          "Submitting…"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 mr-2 fill-current" }),
          "Submit review"
        ] })
      }
    )
  ] });
}
function ReviewLockedState({ status, checkOut }) {
  let message = "You haven't reviewed this stay yet.";
  if (status === "pending") {
    message = "Confirm your booking before leaving a review.";
  } else if (status === "cancelled") {
    message = "Cancelled bookings can't be reviewed.";
  } else if (["confirmed", "completed"].includes(status) && /* @__PURE__ */ new Date() < new Date(checkOut)) {
    const out = new Date(checkOut).toLocaleDateString(void 0, {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    message = `You can review your stay after check-out on ${out}.`;
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-8 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3", children: /* @__PURE__ */ jsx(MessageSquare, { className: "h-6 w-6 text-muted-foreground" }) }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground font-medium", children: "No review yet" }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-sm", children: message })
  ] });
}
export {
  BookingShow as default
};
