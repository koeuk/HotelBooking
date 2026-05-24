import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { Head, Link } from "@inertiajs/react";
import { H as HotelMap } from "./HotelMap-DhZ8GF4X.js";
import { B as Button } from "./button-Dm9784FB.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BY9Lq84_.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { S as Separator } from "./separator-CBwNKPLd.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { ChevronLeft, Pencil, BedDouble, MapPin, ImageIcon, Users, MessageSquare, Tags, Star } from "lucide-react";
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
function Show({ hotel }) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        /* @__PURE__ */ jsx(
          Star,
          {
            className: `h-4 w-4 ${i <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`
          },
          i
        )
      );
    }
    return stars;
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Hotel - ${hotel.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.hotels.index"), children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: hotel.name })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: route("dashboard.hotels.edit", hotel.uuid), children: [
          /* @__PURE__ */ jsx(Pencil, { className: "mr-2 h-4 w-4" }),
          "Edit Hotel"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-6", children: [
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(BedDouble, { className: "h-5 w-5" }),
              " Hotel Details"
            ] }) }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Name" }),
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: hotel.name })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Rating" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "flex", children: renderStars(hotel.rating || 0) }),
                    /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: hotel.rating || "N/A" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Separator, {}),
              hotel.description && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Description" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1", children: hotel.description })
                ] }),
                /* @__PURE__ */ jsx(Separator, {})
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 mt-1 text-muted-foreground" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Address" }),
                    /* @__PURE__ */ jsx("p", { children: hotel.address })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "City" }),
                  /* @__PURE__ */ jsx("p", { children: hotel.city })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-muted-foreground", children: "Country" }),
                  /* @__PURE__ */ jsx("p", { children: hotel.country })
                ] })
              ] })
            ] })
          ] }),
          hotel.images && hotel.images.length > 0 && /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(ImageIcon, { className: "h-5 w-5" }),
              " Images"
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: hotel.images.map((image, index) => /* @__PURE__ */ jsx(
              "img",
              {
                src: image,
                alt: `${hotel.name} - ${index + 1}`,
                className: "rounded-lg object-cover w-full h-48"
              },
              index
            )) }) })
          ] }),
          hotel.latitude && hotel.longitude && /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5" }),
              " Location"
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { className: "p-0 pb-0", children: /* @__PURE__ */ jsx(
              HotelMap,
              {
                latitude: hotel.latitude,
                longitude: hotel.longitude,
                name: hotel.name,
                className: "h-[250px] w-full rounded-b-lg"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(BedDouble, { className: "h-5 w-5" }),
              " Room Types",
              /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: hotel.room_types?.length || 0 })
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: hotel.room_types && hotel.room_types.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: hotel.room_types.map((roomType) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex items-center justify-between p-3 border rounded-lg",
                children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(
                      Link,
                      {
                        href: route(
                          "dashboard.room-types.show",
                          roomType.uuid
                        ),
                        className: "font-medium hover:underline",
                        children: roomType.name
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4 text-sm text-muted-foreground mt-1", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx(Users, { className: "h-3 w-3" }),
                      "Max",
                      " ",
                      roomType.max_users,
                      " ",
                      "users"
                    ] }) })
                  ] }),
                  /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
                    "$",
                    roomType.price_per_night,
                    "/night"
                  ] })
                ]
              },
              roomType.id
            )) }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center py-4", children: "No room types found." }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(MessageSquare, { className: "h-5 w-5" }),
              " Recent Reviews",
              /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: hotel.reviews?.length || 0 })
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: hotel.reviews && hotel.reviews.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: hotel.reviews.map((review) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "border rounded-lg p-4 space-y-2",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: review.user?.name || "Unknown User" }),
                    /* @__PURE__ */ jsx("div", { className: "flex", children: renderStars(
                      review.rating
                    ) })
                  ] }),
                  review.comment && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: review.comment })
                ]
              },
              review.id
            )) }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center py-4", children: "No reviews yet." }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Tags, { className: "h-5 w-5" }),
            " Amenities"
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: hotel.amenities && hotel.amenities.length > 0 ? /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: hotel.amenities.map((amenity) => /* @__PURE__ */ jsx(
            Badge,
            {
              variant: "secondary",
              children: amenity.name
            },
            amenity.id
          )) }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center py-4", children: "No amenities listed." }) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Show as default
};
