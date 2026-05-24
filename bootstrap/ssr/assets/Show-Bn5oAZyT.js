import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { Head, Link } from "@inertiajs/react";
import { B as Button } from "./button-Dm9784FB.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BY9Lq84_.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { S as Separator } from "./separator-CBwNKPLd.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { ChevronLeft, Pencil, DoorOpen, Calendar } from "lucide-react";
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
const statusColors = {
  available: "bg-green-100 text-green-800",
  booked: "bg-blue-100 text-blue-800",
  maintenance: "bg-yellow-100 text-yellow-800"
};
const bookingStatusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800"
};
function Show({ room }) {
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Room - ${room.room_number}` }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.rooms.index"), children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold tracking-tight", children: [
            "Room ",
            room.room_number
          ] }),
          /* @__PURE__ */ jsx(
            Badge,
            {
              className: statusColors[room.status] || "",
              children: room.status
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: route("dashboard.rooms.edit", room.uuid), children: [
          /* @__PURE__ */ jsx(Pencil, { className: "mr-2 h-4 w-4" }),
          "Edit Room"
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(DoorOpen, { className: "h-5 w-5" }),
            " Room Details"
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Hotel" }),
                room.hotel ? /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route(
                      "dashboard.hotels.show",
                      room.hotel.uuid
                    ),
                    className: "hover:underline",
                    children: room.hotel.name
                  }
                ) }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "N/A" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Room Type" }),
                room.room_type ? /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route(
                      "dashboard.room-types.show",
                      room.room_type.uuid
                    ),
                    className: "hover:underline",
                    children: room.room_type.name
                  }
                ) }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "N/A" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Separator, {}),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Room Number" }),
                /* @__PURE__ */ jsx("p", { className: "font-medium", children: room.room_number })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Floor" }),
                /* @__PURE__ */ jsx("p", { className: "font-medium", children: room.floor || "N/A" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Status" }),
                /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(
                  Badge,
                  {
                    className: statusColors[room.status] || "",
                    children: room.status
                  }
                ) })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5" }),
            " Recent Bookings",
            /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: room.bookings?.length || 0 })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: room.bookings && room.bookings.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: room.bookings.map((booking) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center justify-between p-3 border rounded-lg",
              children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route(
                        "dashboard.bookings.show",
                        booking.uuid
                      ),
                      className: "font-medium hover:underline",
                      children: booking.user?.name || "Unknown User"
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground mt-1", children: [
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
                    ] }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      "$",
                      booking.total_price
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  Badge,
                  {
                    className: bookingStatusColors[booking.status] || "",
                    children: booking.status
                  }
                )
              ]
            },
            booking.id
          )) }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center py-4", children: "No bookings found." }) })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Show as default
};
