import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { Head, Link } from "@inertiajs/react";
import { B as Button } from "./button-Dm9784FB.js";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle } from "./card-BY9Lq84_.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import "clsx";
import { ChevronLeft, Edit, Sparkles, Hotel, MapPin } from "lucide-react";
import "react";
import "./BackToTop-Cf3OnJBv.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "sonner";
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
import "tailwind-merge";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
function Show({ amenity }) {
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Amenity - ${amenity.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.amenities.index"), children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Amenity Details" })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: route(
              "dashboard.amenities.edit",
              amenity.uuid
            ),
            children: [
              /* @__PURE__ */ jsx(Edit, { className: "mr-2 h-4 w-4" }),
              " Edit Amenity"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-primary/10 p-4 rounded-full", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-8 w-8 text-primary" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: amenity.name }),
          amenity.icon && /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
            "Icon: ",
            amenity.icon
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Hotel, { className: "h-5 w-5" }),
            " Associated Hotels",
            /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "ml-2", children: amenity.hotels?.length || 0 })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: amenity.hotels && amenity.hotels.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: amenity.hotels.map((hotel) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center justify-between p-4 border rounded-lg",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "font-semibold", children: hotel.name }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsx(MapPin, { className: "h-3 w-3" }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      hotel.city,
                      ",",
                      " ",
                      hotel.country
                    ] })
                  ] })
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
                          "dashboard.hotels.show",
                          hotel.uuid
                        ),
                        children: "View"
                      }
                    )
                  }
                )
              ]
            },
            hotel.id
          )) }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center py-8", children: "No hotels are using this amenity yet." }) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Show as default
};
