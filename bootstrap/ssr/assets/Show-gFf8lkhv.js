import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { Head, Link } from "@inertiajs/react";
import { B as Button } from "./button-Dm9784FB.js";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle } from "./card-BY9Lq84_.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { S as Separator } from "./separator-CBwNKPLd.js";
import "react";
import "clsx";
import { A as Avatar, b as AvatarFallback } from "./BackToTop-Cf3OnJBv.js";
import { ChevronLeft, Edit, ShieldCheck, User, Mail, Phone, Calendar, Hotel, DollarSign } from "lucide-react";
import "@base-ui/react/scroll-area";
import "./ThemeToggle-DzFfzEoP.js";
import "@base-ui/react/dialog";
import "sonner";
import "./input-D6vmmPPF.js";
import "@base-ui/react/input";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "tailwind-merge";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "@base-ui/react/separator";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-green-100 text-green-800"
};
function Show({ user }) {
  const initials = user.name.split(" ").map((n) => n.charAt(0)).join("").toUpperCase().slice(0, 2);
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `User - ${user.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.users.index"), children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "User Details" })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: route("dashboard.users.edit", user.uuid), children: [
          /* @__PURE__ */ jsx(Edit, { className: "mr-2 h-4 w-4" }),
          " Edit User"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3", children: [
            /* @__PURE__ */ jsx(Avatar, { className: "h-20 w-20", children: /* @__PURE__ */ jsx(AvatarFallback, { className: "text-2xl", children: initials }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: user.name }),
            user.role === "admin" ? /* @__PURE__ */ jsxs(Badge, { className: "bg-primary/10 text-primary border-primary/20", children: [
              /* @__PURE__ */ jsx(ShieldCheck, { className: "w-3 h-3 mr-1" }),
              " ",
              "Dashboard"
            ] }) : /* @__PURE__ */ jsxs(Badge, { variant: "secondary", children: [
              /* @__PURE__ */ jsx(User, { className: "w-3 h-3 mr-1" }),
              " ",
              "user"
            ] })
          ] }),
          /* @__PURE__ */ jsx(Separator, { className: "my-4" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
              /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsx("span", { children: user.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsx("span", { children: user.phone || "No phone provided" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Joined",
                " ",
                new Date(
                  user.created_at
                ).toLocaleDateString(void 0, {
                  dateStyle: "long"
                })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Hotel, { className: "h-5 w-5" }),
            " Bookings",
            /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "ml-2", children: user.bookings?.length || 0 })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: user.bookings && user.bookings.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: user.bookings.map((booking) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center justify-between p-4 border rounded-lg",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "font-semibold", children: booking.room?.hotel?.name || "Unknown Hotel" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3" }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      new Date(
                        booking.check_in_date
                      ).toLocaleDateString(),
                      " ",
                      "-",
                      " ",
                      new Date(
                        booking.check_out_date
                      ).toLocaleDateString()
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 font-semibold", children: [
                      /* @__PURE__ */ jsx(DollarSign, { className: "h-4 w-4" }),
                      booking.total_price
                    ] }),
                    /* @__PURE__ */ jsx(
                      Badge,
                      {
                        className: statusColors[booking.status] || "",
                        children: booking.status
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      asChild: true,
                      children: /* @__PURE__ */ jsx(
                        Link,
                        {
                          href: route(
                            "dashboard.bookings.show",
                            booking.uuid
                          ),
                          children: "View"
                        }
                      )
                    }
                  )
                ] })
              ]
            },
            booking.id
          )) }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center py-8", children: "No bookings found for this user." }) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Show as default
};
