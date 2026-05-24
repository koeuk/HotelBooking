import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BbquYNfF.js";
import { B as Button } from "./button-Dm9784FB.js";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-zbygvPRX.js";
import { Plus, Eye, Pencil, Trash2, AlertTriangle, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import "./BackToTop-Cf3OnJBv.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
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
function StarRating({ rating }) {
  return /* @__PURE__ */ jsx("div", { className: "flex items-center gap-0.5", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(
    Star,
    {
      className: `h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`
    },
    star
  )) });
}
function Index({ reviews }) {
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const { delete: destroy, processing } = useForm();
  const handleDelete = () => {
    destroy(route("dashboard.reviews.destroy", reviewToDelete.uuid), {
      onSuccess: () => {
        setReviewToDelete(null);
        toast.success("Review deleted successfully");
      },
      onError: () => toast.error("Failed to delete review")
    });
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Reviews Management" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Reviews" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Manage user reviews and ratings." })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: route("dashboard.reviews.create"), children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
          " New Review"
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-card rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "user" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Hotel" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Booking #" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Rating" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Comment" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxs(TableBody, { children: [
          reviews.data.map((review) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxs(TableCell, { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: review.user?.name }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: review.user?.email })
            ] }),
            /* @__PURE__ */ jsx(TableCell, { children: review.hotel?.name }),
            /* @__PURE__ */ jsxs(TableCell, { children: [
              "#",
              review.booking_id
            ] }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(StarRating, { rating: review.rating }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "max-w-[200px] truncate", children: review.comment }),
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
                        "dashboard.reviews.show",
                        review.uuid
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
                        "dashboard.reviews.edit",
                        review.uuid
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
                  onClick: () => setReviewToDelete(review),
                  children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }, review.id)),
          reviews.data.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
            TableCell,
            {
              colSpan: 6,
              className: "text-center py-8 text-muted-foreground",
              children: "No reviews found. Start by adding one."
            }
          ) })
        ] })
      ] }) }),
      reviews.links.length > 3 && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end space-x-2", children: reviews.links.map((link, i) => /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx(Dialog, { open: !!reviewToDelete, onOpenChange: (open) => !open && setReviewToDelete(null), children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "text-center sm:text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "h-7 w-7 text-destructive" }) }),
        /* @__PURE__ */ jsx(DialogTitle, { className: "text-xl", children: "Delete Review" }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "pt-2 text-center", children: "Are you sure? This action cannot be undone." })
      ] }),
      reviewToDelete && /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-muted/50 p-4 space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "User" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: reviewToDelete.user?.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Hotel" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: reviewToDelete.hotel?.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Rating" }),
          /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
            reviewToDelete.rating,
            " / 5"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Comment" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium truncate max-w-[200px]", children: reviewToDelete.comment?.length > 50 ? reviewToDelete.comment.substring(0, 50) + "..." : reviewToDelete.comment })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "gap-2 sm:gap-0", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", className: "flex-1", onClick: () => setReviewToDelete(null), children: "Cancel" }),
        /* @__PURE__ */ jsx(Button, { variant: "destructive", className: "flex-1", onClick: handleDelete, disabled: processing, children: processing ? "Deleting..." : "Delete" })
      ] })
    ] }) })
  ] });
}
export {
  Index as default
};
