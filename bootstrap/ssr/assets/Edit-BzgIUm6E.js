import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { B as Button } from "./button-Dm9784FB.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardDescription, c as CardContent, e as CardFooter } from "./card-BY9Lq84_.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { T as Textarea } from "./textarea-kC2BQjKr.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DjoqtalQ.js";
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
import "./input-D6vmmPPF.js";
import "@base-ui/react/input";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/select";
function Edit({ review, users, hotels }) {
  const { data, setData, put, processing, errors } = useForm({
    rating: String(review.rating) || "",
    comment: review.comment || ""
  });
  const submit = (e) => {
    e.preventDefault();
    put(route("dashboard.reviews.update", review.uuid));
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Edit Review" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.reviews.index"), children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Edit Review" })
      ] }),
      /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Review Details" }),
          /* @__PURE__ */ jsxs(CardDescription, { children: [
            "Update the review by",
            " ",
            /* @__PURE__ */ jsx("strong", { children: review.user?.name }),
            " for",
            " ",
            /* @__PURE__ */ jsx("strong", { children: review.hotel?.name }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "user" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground pt-2", children: [
                review.user?.name,
                " (",
                review.user?.email,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Hotel" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground pt-2", children: review.hotel?.name })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Booking" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground pt-2", children: [
                "Booking #",
                review.booking_id
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "rating", children: "Rating" }),
              /* @__PURE__ */ jsxs(
                Select,
                {
                  value: data.rating,
                  onValueChange: (value) => setData("rating", value),
                  children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { id: "rating", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a rating" }) }),
                    /* @__PURE__ */ jsx(SelectContent, { children: [1, 2, 3, 4, 5].map((num) => /* @__PURE__ */ jsxs(
                      SelectItem,
                      {
                        value: String(num),
                        children: [
                          num,
                          " ",
                          num === 1 ? "Star" : "Stars"
                        ]
                      },
                      num
                    )) })
                  ]
                }
              ),
              errors.rating && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.rating })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "comment", children: "Comment" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "comment",
                value: data.comment,
                onChange: (e) => setData("comment", e.target.value),
                placeholder: "Write the review comment...",
                rows: 5
              }
            ),
            errors.comment && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.comment })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(CardFooter, { className: "flex justify-end gap-4 border-t px-6 py-4", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.reviews.index"), children: "Cancel" }) }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, children: processing ? "Saving..." : "Update Review" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Edit as default
};
