import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { B as Button } from "./button-Dm9784FB.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardDescription, c as CardContent, e as CardFooter } from "./card-BY9Lq84_.js";
import { I as Input } from "./input-D6vmmPPF.js";
import { L as Label } from "./label-BrVZIReJ.js";
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
import "clsx";
import "tailwind-merge";
import "@base-ui/react/input";
function Edit({ coupon }) {
  const { data, setData, put, processing, errors } = useForm({
    code: coupon.code || "",
    discount_percent: coupon.discount_percent ?? "",
    valid_from: coupon.valid_from ? coupon.valid_from.slice(0, 10) : "",
    valid_until: coupon.valid_until ? coupon.valid_until.slice(0, 10) : "",
    max_uses: coupon.max_uses ?? ""
  });
  const submit = (e) => {
    e.preventDefault();
    put(route("dashboard.coupons.update", coupon.uuid));
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit Coupon - ${coupon.code}` }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.coupons.index"), children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Edit Coupon" })
      ] }),
      /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Coupon Details" }),
          /* @__PURE__ */ jsxs(CardDescription, { children: [
            "Update details for coupon",
            " ",
            /* @__PURE__ */ jsx("strong", { children: coupon.code }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "code", children: "Code" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "code",
                value: data.code,
                onChange: (e) => setData(
                  "code",
                  e.target.value.toUpperCase()
                ),
                placeholder: "SUMMER2026"
              }
            ),
            errors.code && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.code })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "discount_percent", children: "Discount Percent" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "discount_percent",
                type: "number",
                min: "1",
                max: "100",
                value: data.discount_percent,
                onChange: (e) => setData(
                  "discount_percent",
                  e.target.value
                ),
                placeholder: "10"
              }
            ),
            errors.discount_percent && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.discount_percent })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "valid_from", children: "Valid From" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "valid_from",
                  type: "date",
                  value: data.valid_from,
                  onChange: (e) => setData(
                    "valid_from",
                    e.target.value
                  )
                }
              ),
              errors.valid_from && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.valid_from })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "valid_until", children: "Valid Until" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "valid_until",
                  type: "date",
                  value: data.valid_until,
                  onChange: (e) => setData(
                    "valid_until",
                    e.target.value
                  )
                }
              ),
              errors.valid_until && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.valid_until })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "max_uses", children: "Max Uses" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "max_uses",
                type: "number",
                min: "1",
                value: data.max_uses,
                onChange: (e) => setData("max_uses", e.target.value),
                placeholder: "100"
              }
            ),
            errors.max_uses && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.max_uses })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(CardFooter, { className: "flex justify-end gap-4 border-t px-6 py-4", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.coupons.index"), children: "Cancel" }) }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, children: processing ? "Saving..." : "Update Coupon" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Edit as default
};
