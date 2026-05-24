import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { Head, Link } from "@inertiajs/react";
import { B as Button } from "./button-Dm9784FB.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BY9Lq84_.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { S as Separator } from "./separator-CBwNKPLd.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { ChevronLeft, Pencil, BedDouble, Users, DollarSign, ImageIcon, DoorOpen } from "lucide-react";
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
function Show({ roomType }) {
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Room Type - ${roomType.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.room-types.index"), children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: roomType.name })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("dashboard.room-types.edit", roomType.uuid),
            children: [
              /* @__PURE__ */ jsx(Pencil, { className: "mr-2 h-4 w-4" }),
              "Edit Room Type"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-6", children: [
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(BedDouble, { className: "h-5 w-5" }),
              " Room Type Details"
            ] }) }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Hotel" }),
                  roomType.hotel ? /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route(
                        "dashboard.hotels.show",
                        roomType.hotel.uuid
                      ),
                      className: "hover:underline",
                      children: roomType.hotel.name
                    }
                  ) }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "N/A" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Name" }),
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: roomType.name })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Separator, {}),
              roomType.description && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Description" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1", children: roomType.description })
                ] }),
                /* @__PURE__ */ jsx(Separator, {})
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "bg-primary/10 p-2 rounded-md", children: /* @__PURE__ */ jsx(Users, { className: "h-5 w-5 text-primary" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Max users" }),
                    /* @__PURE__ */ jsx("p", { className: "font-medium", children: roomType.max_users })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "bg-primary/10 p-2 rounded-md", children: /* @__PURE__ */ jsx(DollarSign, { className: "h-5 w-5 text-primary" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Price Per Night" }),
                    /* @__PURE__ */ jsxs("p", { className: "font-medium", children: [
                      "$",
                      roomType.price_per_night
                    ] })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          roomType.images && roomType.images.length > 0 && /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(ImageIcon, { className: "h-5 w-5" }),
              " Images"
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: roomType.images.map((image, index) => /* @__PURE__ */ jsx(
              "img",
              {
                src: image,
                alt: `${roomType.name} - ${index + 1}`,
                className: "rounded-lg object-cover w-full h-48"
              },
              index
            )) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(DoorOpen, { className: "h-5 w-5" }),
            " Rooms",
            /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: roomType.rooms?.length || 0 })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: roomType.rooms && roomType.rooms.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: roomType.rooms.map((room) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center justify-between p-3 border rounded-lg",
              children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: route(
                        "dashboard.rooms.show",
                        room.uuid
                      ),
                      className: "font-medium hover:underline",
                      children: [
                        "Room ",
                        room.room_number
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                    "Floor ",
                    room.floor
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  Badge,
                  {
                    className: statusColors[room.status] || "",
                    children: room.status
                  }
                )
              ]
            },
            room.id
          )) }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center py-4", children: "No rooms found." }) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Show as default
};
