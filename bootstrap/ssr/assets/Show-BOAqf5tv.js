import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { Head, Link } from "@inertiajs/react";
import { B as Button } from "./button-Dm9784FB.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BY9Lq84_.js";
import "./badge-qMfuib1i.js";
import { S as Separator } from "./separator-CBwNKPLd.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { ChevronLeft, Edit, Star, MessageSquare, User, Hotel, Calendar } from "lucide-react";
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
function Show({ review }) {
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Review #${review.id}` }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.reviews.index"), children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Review Details" })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: route("dashboard.reviews.edit", review.uuid), children: [
          /* @__PURE__ */ jsx(Edit, { className: "mr-2 h-4 w-4" }),
          " Edit Review"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsx("div", { className: "md:col-span-2 space-y-6", children: /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Star, { className: "h-5 w-5" }),
            " Rating & Comment"
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Rating" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 mt-1", children: [
                [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(
                  Star,
                  {
                    className: `h-6 w-6 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`
                  },
                  star
                )),
                /* @__PURE__ */ jsxs("span", { className: "ml-2 text-lg font-semibold", children: [
                  review.rating,
                  "/5"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Separator, {}),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Comment" }),
              /* @__PURE__ */ jsxs("div", { className: "mt-2 p-4 bg-muted rounded-lg", children: [
                /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4 text-muted-foreground mb-2" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed", children: review.comment || "No comment provided." })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Separator, {}),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Created" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm mt-1", children: new Date(
                review.created_at
              ).toLocaleDateString(void 0, {
                dateStyle: "long"
              }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(User, { className: "h-5 w-5" }),
              " user"
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: review.user ? /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: review.user.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: review.user.email }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "w-full mt-2",
                  asChild: true,
                  children: /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route(
                        "dashboard.users.show",
                        review.user.uuid
                      ),
                      children: "View User"
                    }
                  )
                }
              )
            ] }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "User not found." }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Hotel, { className: "h-5 w-5" }),
              " Hotel"
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: review.hotel ? /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: review.hotel.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                review.hotel.city,
                ",",
                " ",
                review.hotel.country
              ] }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "w-full mt-2",
                  asChild: true,
                  children: /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route(
                        "dashboard.hotels.show",
                        review.hotel.uuid
                      ),
                      children: "View Hotel"
                    }
                  )
                }
              )
            ] }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Hotel not found." }) })
          ] }),
          review.booking && /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5" }),
              " Booking"
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
                  "Room:",
                  " "
                ] }),
                review.booking.room?.room_number || "N/A"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
                  "Check-in:",
                  " "
                ] }),
                new Date(
                  review.booking.check_in_date
                ).toLocaleDateString()
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
                  "Check-out:",
                  " "
                ] }),
                new Date(
                  review.booking.check_out_date
                ).toLocaleDateString()
              ] }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "w-full mt-2",
                  asChild: true,
                  children: /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route(
                        "dashboard.bookings.show",
                        review.booking.uuid
                      ),
                      children: "View Booking"
                    }
                  )
                }
              )
            ] }) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Show as default
};
