import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { B as Button } from "./button-Dm9784FB.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardDescription, c as CardContent, e as CardFooter } from "./card-BY9Lq84_.js";
import { I as Input } from "./input-D6vmmPPF.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DjoqtalQ.js";
import "clsx";
import { ChevronLeft } from "lucide-react";
import "react";
import "./BackToTop-Cf3OnJBv.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "sonner";
import "@base-ui/react/scroll-area";
import "./badge-qMfuib1i.js";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "class-variance-authority";
import "./ThemeToggle-DzFfzEoP.js";
import "@base-ui/react/dialog";
import "./separator-CBwNKPLd.js";
import "@base-ui/react/separator";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "tailwind-merge";
import "@base-ui/react/input";
import "@base-ui/react/select";
function Edit({ payment }) {
  const booking = payment.booking;
  const user = booking?.user;
  const hotel = booking?.room?.hotel;
  const { data, setData, patch, processing, errors } = useForm({
    amount: payment.amount || "",
    method: payment.method || "card",
    status: payment.status || "pending"
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("dashboard.payments.update", payment.uuid));
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(
      Head,
      {
        title: `Edit Payment - ${payment.transaction_id || `PAY-${payment.id}`}`
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.payments.index"), children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Edit Payment" })
      ] }),
      /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "Booking Information" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Associated booking details (read-only)." })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Booking ID" }),
              /* @__PURE__ */ jsxs("p", { className: "font-semibold", children: [
                "#",
                booking?.id || "N/A"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "user" }),
              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: user?.name || "N/A" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Hotel" }),
              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: hotel?.name || "N/A" })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "Payment Details" }),
            /* @__PURE__ */ jsxs(CardDescription, { children: [
              "Update the payment information for transaction",
              " ",
              /* @__PURE__ */ jsx("strong", { children: payment.transaction_id || `PAY-${payment.id}` }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "amount", children: "Amount ($)" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "amount",
                    type: "number",
                    step: "0.01",
                    min: "0",
                    value: data.amount,
                    onChange: (e) => setData(
                      "amount",
                      e.target.value
                    ),
                    placeholder: "0.00"
                  }
                ),
                errors.amount && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.amount })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "method", children: "Payment Method" }),
                /* @__PURE__ */ jsxs(
                  Select,
                  {
                    value: data.method,
                    onValueChange: (v) => setData("method", v),
                    children: [
                      /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                      /* @__PURE__ */ jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsx(SelectItem, { value: "card", children: "Credit Card" }),
                        /* @__PURE__ */ jsx(SelectItem, { value: "cash", children: "Cash" }),
                        /* @__PURE__ */ jsx(SelectItem, { value: "paypal", children: "PayPal" })
                      ] })
                    ]
                  }
                ),
                errors.method && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.method })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "status", children: "Status" }),
              /* @__PURE__ */ jsxs(
                Select,
                {
                  value: data.status,
                  onValueChange: (v) => setData("status", v),
                  children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full md:w-1/2", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsx(SelectItem, { value: "pending", children: "Pending" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "paid", children: "Paid" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "failed", children: "Failed" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "refunded", children: "Refunded" })
                    ] })
                  ]
                }
              ),
              errors.status && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.status })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(CardFooter, { className: "flex justify-end gap-4 border-t px-6 py-4", children: [
            /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.payments.index"), children: "Cancel" }) }),
            /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, children: processing ? "Saving..." : "Update Payment" })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Edit as default
};
