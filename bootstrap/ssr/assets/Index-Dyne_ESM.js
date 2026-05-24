import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BbquYNfF.js";
import { B as Button } from "./button-Dm9784FB.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DjoqtalQ.js";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-zbygvPRX.js";
import { Plus, Eye, Edit, Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import "./BackToTop-Cf3OnJBv.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "@base-ui/react/scroll-area";
import "./ThemeToggle-DzFfzEoP.js";
import "@base-ui/react/dialog";
import "./separator-CBwNKPLd.js";
import "@base-ui/react/separator";
import "./input-D6vmmPPF.js";
import "@base-ui/react/input";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "@base-ui/react/select";
function Index({ payments }) {
  const [paymentToDelete, setPaymentToDelete] = useState(null);
  const { delete: destroy, processing } = useForm();
  const updateStatus = (id, status) => {
    router.patch(route("dashboard.payments.update", id), { status }, {
      onSuccess: () => toast.success("Payment status updated")
    });
  };
  const handleDelete = () => {
    destroy(route("dashboard.payments.destroy", paymentToDelete.uuid), {
      onSuccess: () => {
        setPaymentToDelete(null);
        toast.success("Payment deleted successfully");
      },
      onError: () => toast.error("Failed to delete payment")
    });
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Payments Management" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Payments" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Monitor transaction history and payment statuses." })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: route("dashboard.payments.create"), children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
          " Add Payment"
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-card rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Transaction ID" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Booking" }),
          /* @__PURE__ */ jsx(TableHead, { children: "User" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Amount" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Method" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxs(TableBody, { children: [
          payments.data.map((payment) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-mono text-xs", children: payment.transaction_id || `PAY-${payment.id}` }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(
              Link,
              {
                href: route(
                  "dashboard.bookings.show",
                  payment.booking.uuid
                ),
                className: "text-primary hover:underline",
                children: [
                  "#",
                  payment.booking_id
                ]
              }
            ) }),
            /* @__PURE__ */ jsx(TableCell, { children: payment.booking.user.name }),
            /* @__PURE__ */ jsxs(TableCell, { className: "font-semibold", children: [
              "$",
              payment.amount
            ] }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
              Badge,
              {
                variant: "outline",
                className: "uppercase text-[10px]",
                children: payment.method
              }
            ) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(
              Select,
              {
                defaultValue: payment.status,
                onValueChange: (v) => updateStatus(payment.uuid, v),
                disabled: false,
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[120px] h-8 text-xs", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "pending", children: "Pending" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "paid", children: "Paid" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "failed", children: "Failed" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "refunded", children: "Refunded" })
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxs(TableCell, { className: "text-right space-x-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  asChild: true,
                  children: /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route(
                        "dashboard.payments.show",
                        payment.uuid
                      ),
                      children: /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  size: "icon",
                  asChild: true,
                  children: /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route(
                        "dashboard.payments.edit",
                        payment.uuid
                      ),
                      children: /* @__PURE__ */ jsx(Edit, { className: "h-4 w-4" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "text-destructive hover:text-destructive",
                  onClick: () => setPaymentToDelete(payment),
                  children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }, payment.id)),
          payments.data.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
            TableCell,
            {
              colSpan: 7,
              className: "text-center py-8 text-muted-foreground",
              children: "No payments found."
            }
          ) })
        ] })
      ] }) }),
      payments.links.length > 3 && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end space-x-2", children: payments.links.map((link, i) => /* @__PURE__ */ jsx(
        Button,
        {
          variant: link.active ? "default" : "outline",
          size: "sm",
          asChild: !!link.url,
          disabled: !link.url,
          className: !link.url ? "opacity-50" : "",
          children: link.url ? /* @__PURE__ */ jsx(
            Link,
            {
              href: link.url,
              dangerouslySetInnerHTML: {
                __html: link.label
              }
            }
          ) : /* @__PURE__ */ jsx(
            "span",
            {
              dangerouslySetInnerHTML: {
                __html: link.label
              }
            }
          )
        },
        i
      )) })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: !!paymentToDelete, onOpenChange: (open) => !open && setPaymentToDelete(null), children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "text-center sm:text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "h-7 w-7 text-destructive" }) }),
        /* @__PURE__ */ jsx(DialogTitle, { className: "text-xl", children: "Delete Payment" }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "pt-2 text-center", children: "Are you sure? This action cannot be undone." })
      ] }),
      paymentToDelete && /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-muted/50 p-4 space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "User" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: paymentToDelete.booking.user.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Booking" }),
          /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
            "#",
            paymentToDelete.booking_id
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Amount" }),
          /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
            "$",
            paymentToDelete.amount
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Method" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium uppercase", children: paymentToDelete.method })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Status" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium capitalize", children: paymentToDelete.status })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "gap-2 sm:gap-0", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", className: "flex-1", onClick: () => setPaymentToDelete(null), children: "Cancel" }),
        /* @__PURE__ */ jsx(Button, { variant: "destructive", className: "flex-1", onClick: handleDelete, disabled: processing, children: processing ? "Deleting..." : "Delete" })
      ] })
    ] }) })
  ] });
}
export {
  Index as default
};
