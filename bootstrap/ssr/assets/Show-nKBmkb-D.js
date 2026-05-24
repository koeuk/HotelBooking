import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { Head, Link } from "@inertiajs/react";
import { B as Button } from "./button-Dm9784FB.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BY9Lq84_.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { S as Separator } from "./separator-CBwNKPLd.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { ChevronLeft, Edit, Ticket, Percent, Calendar, Hash } from "lucide-react";
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
function Show({ coupon }) {
  const now = /* @__PURE__ */ new Date();
  const validFrom = new Date(coupon.valid_from);
  const validUntil = new Date(coupon.valid_until);
  const isActive = now >= validFrom && now <= validUntil;
  const isExpired = now > validUntil;
  const statusLabel = isActive ? "Active" : isExpired ? "Expired" : "Upcoming";
  const statusClass = isActive ? "bg-green-100 text-green-800" : isExpired ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800";
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Coupon - ${coupon.code}` }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.coupons.index"), children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Coupon Details" }),
          /* @__PURE__ */ jsx(Badge, { className: statusClass, children: statusLabel })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("dashboard.coupons.edit", coupon.uuid),
            children: [
              /* @__PURE__ */ jsx(Edit, { className: "mr-2 h-4 w-4" }),
              " Edit Coupon"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Ticket, { className: "h-5 w-5" }),
            " Coupon Information"
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Code" }),
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-mono font-bold mt-1", children: coupon.code })
            ] }),
            /* @__PURE__ */ jsx(Separator, {}),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Discount" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                /* @__PURE__ */ jsx(Percent, { className: "h-5 w-5 text-primary" }),
                /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold text-primary", children: [
                  coupon.discount_percent,
                  "%"
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5" }),
            " Validity & Usage"
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Valid From" }),
                /* @__PURE__ */ jsx("p", { className: "font-medium mt-1", children: validFrom.toLocaleDateString(
                  void 0,
                  { dateStyle: "long" }
                ) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Valid Until" }),
                /* @__PURE__ */ jsx("p", { className: "font-medium mt-1", children: validUntil.toLocaleDateString(
                  void 0,
                  { dateStyle: "long" }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Separator, {}),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Max Uses" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                  /* @__PURE__ */ jsx(Hash, { className: "h-4 w-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold", children: coupon.max_uses === 0 ? "Unlimited" : coupon.max_uses })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Times Used" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                  /* @__PURE__ */ jsx(Hash, { className: "h-4 w-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold", children: coupon.used_count ?? 0 })
                ] })
              ] })
            ] }),
            coupon.max_uses > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Separator, {}),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Usage Progress" }),
                /* @__PURE__ */ jsx("div", { className: "w-full bg-muted rounded-full h-2.5 mt-2", children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "bg-primary h-2.5 rounded-full",
                    style: {
                      width: `${Math.min(
                        (coupon.used_count ?? 0) / coupon.max_uses * 100,
                        100
                      )}%`
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                  coupon.used_count ?? 0,
                  " of",
                  " ",
                  coupon.max_uses,
                  " uses"
                ] })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Show as default
};
