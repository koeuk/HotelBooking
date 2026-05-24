import { jsxs, jsx } from "react/jsx-runtime";
import { W as WebLayout } from "./WebLayout-Dc8gJj4l.js";
import { Head, Link } from "@inertiajs/react";
import { H as HotelMap } from "./HotelMap-DhZ8GF4X.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent, d as CardDescription } from "./card-BY9Lq84_.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { B as Button } from "./button-Dm9784FB.js";
import { ArrowLeft, Sparkles, MapPin, Star, Hotel, BedDouble, MessageSquare, User, CheckCircle2 } from "lucide-react";
import { F as FavoriteButton } from "./FavoriteButton-CyjSbvvu.js";
import "./BackToTop-Cf3OnJBv.js";
import "react";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "sonner";
import "./ThemeToggle-DzFfzEoP.js";
import "class-variance-authority";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
function HotelShow({ hotel }) {
  const amenities = hotel.amenities || [];
  const roomTypes = hotel.room_types || [];
  const reviews = hotel.reviews || [];
  const images = hotel.images || [];
  const heroImage = images[0];
  return /* @__PURE__ */ jsxs(WebLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: hotel.name }),
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden", children: [
      heroImage ? /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 bg-cover bg-center scale-110 blur-2xl",
          style: { backgroundImage: `url(${heroImage})` }
        }
      ) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-mesh" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/85 via-background/92 to-background" }),
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 space-y-6", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            shape: "pill",
            size: "sm",
            asChild: true,
            className: "w-fit",
            children: /* @__PURE__ */ jsxs(Link, { href: route("hotels.index"), children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
              "Back to hotels"
            ] })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 animate-fade-up", children: [
            /* @__PURE__ */ jsxs(
              Badge,
              {
                variant: "outline",
                className: "glass border-foreground/10",
                children: [
                  /* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3" }),
                  "Featured stay"
                ]
              }
            ),
            /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl font-bold tracking-tight", children: /* @__PURE__ */ jsx("span", { className: "text-gradient-primary", children: hotel.name }) }),
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-sm text-foreground w-fit", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-primary shrink-0" }),
              /* @__PURE__ */ jsxs("span", { className: "truncate max-w-[60ch]", children: [
                hotel.address && `${hotel.address}, `,
                hotel.city,
                ", ",
                hotel.country
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 animate-fade-up [animation-delay:80ms]", children: [
            /* @__PURE__ */ jsx(
              FavoriteButton,
              {
                hotelId: hotel.id,
                hotelUuid: hotel.uuid
              }
            ),
            hotel.rating > 0 && /* @__PURE__ */ jsxs("div", { className: "glass rounded-full px-4 py-2 inline-flex items-center gap-1.5 font-semibold", children: [
              /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-amber-400 text-amber-400" }),
              hotel.rating,
              " / 5"
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "gradient",
                size: "xl",
                shape: "pill",
                asChild: true,
                children: /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route(
                      "bookings.create",
                      hotel.uuid
                    ),
                    children: "Book now"
                  }
                )
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-6", children: [
      images.length > 0 ? /* @__PURE__ */ jsx(Gallery, { images, name: hotel.name }) : /* @__PURE__ */ jsx("div", { className: "h-72 rounded-3xl bg-gradient-primary-soft flex items-center justify-center", children: /* @__PURE__ */ jsx(Hotel, { className: "h-16 w-16 text-primary/60" }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
          hotel.description && /* @__PURE__ */ jsxs(Card, { variant: "elevated", className: "animate-fade-up", children: [
            /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "About this hotel" }) }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: hotel.description }) })
          ] }),
          hotel.latitude && hotel.longitude && /* @__PURE__ */ jsxs(
            Card,
            {
              variant: "elevated",
              className: "overflow-hidden animate-fade-up",
              children: [
                /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
                  /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 text-primary" }),
                  "Location"
                ] }) }),
                /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsx(
                  HotelMap,
                  {
                    latitude: hotel.latitude,
                    longitude: hotel.longitude,
                    name: hotel.name,
                    className: "h-[320px] w-full"
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(Card, { variant: "elevated", className: "animate-fade-up", children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
              /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
                /* @__PURE__ */ jsx(BedDouble, { className: "h-5 w-5 text-primary" }),
                "Room types"
              ] }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Available rooms and pricing" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: roomTypes.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: roomTypes.map((roomType) => {
              const availableRooms = roomType.rooms?.filter(
                (r) => r.status === "available"
              ) || [];
              return /* @__PURE__ */ jsx(
                "div",
                {
                  className: "p-4 rounded-2xl border border-border/60 bg-muted/20 transition-all duration-300 ease-out-expo hover:border-primary/30 hover:-translate-y-0.5",
                  children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between flex-wrap gap-3", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base", children: roomType.name }),
                      roomType.description && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-md", children: roomType.description }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-2 text-xs", children: [
                        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-background px-2 py-0.5 text-muted-foreground", children: [
                          /* @__PURE__ */ jsx(BedDouble, { className: "h-3 w-3" }),
                          availableRooms.length,
                          " ",
                          "available"
                        ] }),
                        roomType.capacity && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center rounded-full bg-background px-2 py-0.5 text-muted-foreground", children: [
                          "Up to",
                          " ",
                          roomType.capacity,
                          " ",
                          "guests"
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                      /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-gradient-primary leading-none", children: [
                        "$",
                        roomType.price_per_night
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "per night" })
                    ] })
                  ] })
                },
                roomType.id
              );
            }) }) : /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground py-6", children: "No room information available." }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { variant: "elevated", className: "animate-fade-up", children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
              /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
                /* @__PURE__ */ jsx(MessageSquare, { className: "h-5 w-5 text-primary" }),
                "Guest reviews"
              ] }),
              /* @__PURE__ */ jsxs(CardDescription, { children: [
                reviews.length,
                " ",
                reviews.length === 1 ? "review" : "reviews"
              ] })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: reviews.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: reviews.map((review) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "p-4 rounded-2xl bg-muted/40",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("div", { className: "h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground", children: /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }) }),
                      /* @__PURE__ */ jsx("span", { className: "font-medium text-sm", children: review.user?.name || "Guest" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-0.5", children: [...Array(5)].map(
                      (_, i) => /* @__PURE__ */ jsx(
                        Star,
                        {
                          className: `h-3.5 w-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}`
                        },
                        i
                      )
                    ) })
                  ] }),
                  review.comment && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-3", children: review.comment })
                ]
              },
              review.id
            )) }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
              /* @__PURE__ */ jsx("div", { className: "mx-auto h-12 w-12 rounded-full bg-gradient-primary-soft flex items-center justify-center mb-3", children: /* @__PURE__ */ jsx(MessageSquare, { className: "h-6 w-6 text-primary" }) }),
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: "No reviews yet" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Be the first to review this hotel." })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs(
          Card,
          {
            variant: "glass",
            className: "sticky top-24 animate-fade-up",
            children: [
              /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "h-5 w-5 text-primary" }),
                "Amenities"
              ] }) }),
              /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
                amenities.length > 0 ? /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: amenities.map((amenity) => /* @__PURE__ */ jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "text-sm py-1 px-3",
                    children: amenity.name
                  },
                  amenity.id
                )) }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No amenities listed." }),
                /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-gradient-primary-soft p-4 text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Ready when you are" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Reserve in seconds. Pay after confirmation." }),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "gradient",
                      size: "xl",
                      shape: "pill",
                      className: "mt-4 w-full",
                      asChild: true,
                      children: /* @__PURE__ */ jsx(
                        Link,
                        {
                          href: route(
                            "bookings.create",
                            hotel.uuid
                          ),
                          children: "Book this hotel"
                        }
                      )
                    }
                  )
                ] })
              ] })
            ]
          }
        ) })
      ] })
    ] })
  ] });
}
function Gallery({ images, name }) {
  const count = images.length;
  if (count === 1) {
    return /* @__PURE__ */ jsx("div", { className: "rounded-3xl overflow-hidden animate-fade-up", children: /* @__PURE__ */ jsx(
      GalleryImage,
      {
        src: images[0],
        alt: `${name} - 1`,
        className: "h-72 md:h-[420px]"
      }
    ) });
  }
  if (count === 2) {
    return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 rounded-3xl overflow-hidden animate-fade-up", children: images.slice(0, 2).map((img, i) => /* @__PURE__ */ jsx(
      GalleryImage,
      {
        src: img,
        alt: `${name} - ${i + 1}`,
        className: "h-72 md:h-[420px]"
      },
      i
    )) });
  }
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3 rounded-3xl overflow-hidden animate-fade-up", children: images.slice(0, 3).map((img, i) => /* @__PURE__ */ jsx(
    GalleryImage,
    {
      src: img,
      alt: `${name} - ${i + 1}`,
      className: i === 0 ? "md:col-span-2 md:row-span-2 h-72 md:h-[420px]" : "h-52"
    },
    i
  )) });
}
function GalleryImage({ src, alt, className = "" }) {
  return /* @__PURE__ */ jsxs("div", { className: `group relative overflow-hidden bg-muted ${className}`, children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src,
        alt,
        onError: (e) => {
          e.currentTarget.style.display = "none";
          const ph = e.currentTarget.nextElementSibling;
          if (ph) ph.style.display = "flex";
        },
        className: "w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 hidden items-center justify-center bg-gradient-primary-soft",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsx(Hotel, { className: "h-12 w-12 text-primary/60" })
      }
    )
  ] });
}
export {
  HotelShow as default
};
