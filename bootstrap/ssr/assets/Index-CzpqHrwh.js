import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BbquYNfF.js";
import { B as Button } from "./button-Dm9784FB.js";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-zbygvPRX.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { Plus, Eye, Pencil, Trash2, AlertTriangle } from "lucide-react";
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
function Index({ coupons }) {
  const [couponToDelete, setCouponToDelete] = useState(null);
  const { delete: destroy, processing } = useForm();
  const handleDelete = () => {
    destroy(route("dashboard.coupons.destroy", couponToDelete.uuid), {
      onSuccess: () => {
        setCouponToDelete(null);
        toast.success("Coupon deleted successfully");
      },
      onError: (err) => toast.error(err.msg || "Failed to delete coupon")
    });
  };
  const isActive = (coupon) => {
    return new Date(coupon.valid_until) >= /* @__PURE__ */ new Date();
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Coupons Management" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Coupons" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Manage discount coupons and promotional codes." })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: route("dashboard.coupons.create"), children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
          " New Coupon"
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-card rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Code" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Discount %" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Valid From" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Valid Until" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Max Uses" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Used" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: coupons.data.map((coupon) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: coupon.code }),
          /* @__PURE__ */ jsxs(TableCell, { children: [
            coupon.discount_percent,
            "%"
          ] }),
          /* @__PURE__ */ jsx(TableCell, { children: coupon.valid_from }),
          /* @__PURE__ */ jsx(TableCell, { children: coupon.valid_until }),
          /* @__PURE__ */ jsx(TableCell, { children: coupon.max_uses }),
          /* @__PURE__ */ jsx(TableCell, { children: coupon.used_count }),
          /* @__PURE__ */ jsx(TableCell, { children: isActive(coupon) ? /* @__PURE__ */ jsx(Badge, { className: "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20", children: "Active" }) : /* @__PURE__ */ jsx(Badge, { variant: "destructive", children: "Expired" }) }),
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
                      "dashboard.coupons.show",
                      coupon.uuid
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
                      "dashboard.coupons.edit",
                      coupon.uuid
                    ),
                    children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" })
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
                onClick: () => setCouponToDelete(coupon),
                children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] })
        ] }, coupon.id)) })
      ] }) }),
      coupons.links.length > 3 && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end space-x-2", children: coupons.links.map((link, i) => /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx(Dialog, { open: !!couponToDelete, onOpenChange: (open) => !open && setCouponToDelete(null), children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "text-center sm:text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "h-7 w-7 text-destructive" }) }),
        /* @__PURE__ */ jsx(DialogTitle, { className: "text-xl", children: "Delete Coupon" }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "pt-2 text-center", children: "Are you sure? This action cannot be undone." })
      ] }),
      couponToDelete && /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-muted/50 p-4 space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Code" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: couponToDelete.code })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Discount" }),
          /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
            couponToDelete.discount_percent,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Valid Until" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: couponToDelete.valid_until })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Usage" }),
          /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
            couponToDelete.used_count,
            " / ",
            couponToDelete.max_uses
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "gap-2 sm:gap-0", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", className: "flex-1", onClick: () => setCouponToDelete(null), children: "Cancel" }),
        /* @__PURE__ */ jsx(Button, { variant: "destructive", className: "flex-1", onClick: handleDelete, disabled: processing, children: processing ? "Deleting..." : "Delete" })
      ] })
    ] }) })
  ] });
}
export {
  Index as default
};
