import { jsxs, jsx } from "react/jsx-runtime";
import { U as UserLayout } from "./UserLayout-Cqdl8mOt.js";
import { Head, Link } from "@inertiajs/react";
import { C as Card, c as CardContent } from "./card-BY9Lq84_.js";
import { B as Button } from "./button-Dm9784FB.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { MessageSquare, Hotel, Star } from "lucide-react";
import "react";
import "./BackToTop-Cf3OnJBv.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "sonner";
import "./WebLayout-Dc8gJj4l.js";
import "./ThemeToggle-DzFfzEoP.js";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
function StarRating({ rating }) {
  return /* @__PURE__ */ jsx("div", { className: "flex items-center gap-0.5", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(
    Star,
    {
      className: `h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-300 dark:text-zinc-600"}`
    },
    star
  )) });
}
function Index({ reviews }) {
  return /* @__PURE__ */ jsxs(UserLayout, { title: "My Reviews", children: [
    /* @__PURE__ */ jsx(Head, { title: "My Reviews" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "My Reviews" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Your ratings and feedback for hotels you've stayed at." })
      ] }),
      reviews.data.length === 0 ? /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-col items-center justify-center py-16 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-zinc-100 dark:bg-zinc-800 p-4 rounded-full mb-4", children: /* @__PURE__ */ jsx(MessageSquare, { className: "h-8 w-8 text-zinc-400" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-1", children: "No reviews yet" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "After completing a stay, you can leave a review for the hotel." }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("bookings.index"), children: "View My Bookings" }) })
      ] }) }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: reviews.data.map((review) => /* @__PURE__ */ jsx(
        Card,
        {
          className: "border-none shadow-sm",
          children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx(Hotel, { className: "h-5 w-5 text-muted-foreground" }),
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg", children: review.hotel?.name })
              ] }),
              /* @__PURE__ */ jsx(
                StarRating,
                {
                  rating: review.rating
                }
              ),
              review.comment && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: review.comment }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Booking #",
                review.booking_id,
                " ·",
                " ",
                new Date(
                  review.created_at
                ).toLocaleDateString()
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              Badge,
              {
                variant: "secondary",
                className: "text-lg px-3",
                children: [
                  review.rating,
                  "/5"
                ]
              }
            )
          ] }) })
        },
        review.id
      )) }),
      reviews.links?.length > 3 && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end space-x-2", children: reviews.links.map((link, i) => /* @__PURE__ */ jsx(
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
    ] })
  ] });
}
export {
  Index as default
};
