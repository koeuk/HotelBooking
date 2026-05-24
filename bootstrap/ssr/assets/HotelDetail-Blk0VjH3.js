import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { W as WebLayout } from "./WebLayout-Dc8gJj4l.js";
import { usePage, Head, Link } from "@inertiajs/react";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent, d as CardDescription } from "./card-BY9Lq84_.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { B as Button } from "./button-Dm9784FB.js";
import { ArrowLeft, Sparkles, MapPin, Star, BedDouble, Users, Wine, Snowflake, Car, UtensilsCrossed, Dumbbell, Waves, Wifi, ConciergeBell } from "lucide-react";
import { H as HotelMap } from "./HotelMap-DhZ8GF4X.js";
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
const amenityIcons = {
  wifi: Wifi,
  waves: Waves,
  pool: Waves,
  dumbbell: Dumbbell,
  gym: Dumbbell,
  sparkles: Sparkles,
  spa: Sparkles,
  utensils: UtensilsCrossed,
  restaurant: UtensilsCrossed,
  car: Car,
  parking: Car,
  snowflake: Snowflake,
  wine: Wine,
  bar: Wine
};
function HotelDetail({ hotel }) {
  const { auth } = usePage().props;
  const roomTypes = hotel.room_types || [];
  const amenities = hotel.amenities || [];
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
            children: /* @__PURE__ */ jsxs(Link, { href: "/explore", children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
              " Back to hotels"
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
            auth?.user ? /* @__PURE__ */ jsx(
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
            ) : /* @__PURE__ */ jsx(
              Button,
              {
                variant: "gradient",
                size: "xl",
                shape: "pill",
                asChild: true,
                children: /* @__PURE__ */ jsx(Link, { href: route("login"), children: "Sign in to book" })
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-6", children: [
      images.length > 0 ? /* @__PURE__ */ jsx(Gallery, { images, name: hotel.name }) : /* @__PURE__ */ jsx("div", { className: "h-72 rounded-3xl bg-gradient-primary-soft flex items-center justify-center", children: /* @__PURE__ */ jsx(BedDouble, { className: "h-16 w-16 text-primary/60" }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
          hotel.description && /* @__PURE__ */ jsxs(Card, { variant: "elevated", className: "animate-fade-up", children: [
            /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsx(CardTitle, { children: "About this hotel" }) }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: hotel.description }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { variant: "elevated", className: "animate-fade-up", children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
              /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(BedDouble, { className: "h-5 w-5 text-primary" }),
                "Available rooms"
              ] }),
              /* @__PURE__ */ jsxs(CardDescription, { children: [
                roomTypes.length,
                " room types available"
              ] })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { children: [
              roomTypes.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: roomTypes.map((type) => {
                const available = (type.rooms || []).filter(
                  (r) => r.status === "available"
                ).length;
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between p-4 rounded-2xl bg-muted/40 transition-all duration-300 ease-out-expo hover:bg-muted/60 hover:-translate-y-0.5",
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: type.name }),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1.5 text-xs", children: [
                          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-background px-2 py-0.5 text-muted-foreground", children: [
                            /* @__PURE__ */ jsx(Users, { className: "h-3 w-3" }),
                            type.max_users,
                            " ",
                            "guests"
                          ] }),
                          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center rounded-full bg-background px-2 py-0.5 text-muted-foreground", children: [
                            available,
                            " ",
                            "available"
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "text-right shrink-0 ml-3", children: [
                        /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold text-gradient-primary leading-none", children: [
                          "$",
                          type.price_per_night
                        ] }),
                        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "per night" })
                      ] })
                    ]
                  },
                  type.id
                );
              }) }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center py-8", children: "No rooms available at the moment." }),
              /* @__PURE__ */ jsx("div", { className: "mt-6 rounded-2xl bg-gradient-primary-soft p-5 text-center", children: auth?.user ? /* @__PURE__ */ jsx(
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
              ) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "Sign in to book this hotel" }),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "gradient",
                    size: "xl",
                    shape: "pill",
                    asChild: true,
                    children: /* @__PURE__ */ jsx(Link, { href: route("login"), children: "Sign in to book" })
                  }
                )
              ] }) })
            ] })
          ] }),
          hotel.latitude && hotel.longitude && /* @__PURE__ */ jsxs(
            Card,
            {
              variant: "elevated",
              className: "overflow-hidden animate-fade-up",
              children: [
                /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
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
          reviews.length > 0 && /* @__PURE__ */ jsxs(Card, { variant: "elevated", className: "animate-fade-up", children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
              /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Star, { className: "h-5 w-5 text-amber-500" }),
                "Guest reviews"
              ] }),
              /* @__PURE__ */ jsxs(CardDescription, { children: [
                reviews.length,
                " reviews"
              ] })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-3", children: reviews.map((review) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "p-4 rounded-2xl bg-muted/40",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-medium text-sm", children: review.user?.name || "Guest" }),
                    /* @__PURE__ */ jsx("div", { className: "flex gap-0.5", children: [1, 2, 3, 4, 5].map(
                      (s) => /* @__PURE__ */ jsx(
                        Star,
                        {
                          className: `h-3.5 w-3.5 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}`
                        },
                        s
                      )
                    ) })
                  ] }),
                  review.comment && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-2", children: review.comment })
                ]
              },
              review.id
            )) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          amenities.length > 0 && /* @__PURE__ */ jsxs(
            Card,
            {
              variant: "glass",
              className: "animate-fade-up",
              children: [
                /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Amenities" }) }),
                /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: amenities.map((a) => {
                  const IconComponent = amenityIcons[a.icon?.toLowerCase()] || amenityIcons[a.name?.toLowerCase()] || ConciergeBell;
                  return /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2 p-2.5 rounded-xl bg-muted/30 transition-colors hover:bg-muted/50",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-primary text-primary-foreground shrink-0", children: /* @__PURE__ */ jsx(IconComponent, { className: "h-4 w-4" }) }),
                        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium truncate", children: a.name })
                      ]
                    },
                    a.id
                  );
                }) }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(Card, { variant: "elevated", className: "animate-fade-up", children: [
            /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Quick info" }) }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3 text-sm", children: [
              /* @__PURE__ */ jsx(
                Row,
                {
                  label: "Room types",
                  value: roomTypes.length
                }
              ),
              /* @__PURE__ */ jsx(
                Row,
                {
                  label: "Reviews",
                  value: reviews.length
                }
              ),
              /* @__PURE__ */ jsx(
                Row,
                {
                  label: "Rating",
                  value: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(Star, { className: "h-3.5 w-3.5 fill-amber-400 text-amber-400" }),
                    hotel.rating || "—"
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(Row, { label: "Location", value: hotel.city })
            ] })
          ] })
        ] })
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `group relative overflow-hidden bg-muted ${className}`,
      children: [
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
            children: /* @__PURE__ */ jsx(BedDoubleIcon, {})
          }
        )
      ]
    }
  );
}
function BedDoubleIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "48",
      height: "48",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "text-primary/60",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" }),
        /* @__PURE__ */ jsx("path", { d: "M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" }),
        /* @__PURE__ */ jsx("path", { d: "M12 4v6" }),
        /* @__PURE__ */ jsx("path", { d: "M2 18h20" })
      ]
    }
  );
}
function Row({ label, value }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("span", { className: "font-medium", children: value })
  ] });
}
export {
  HotelDetail as default
};
