import { jsxs, jsx } from "react/jsx-runtime";
import { U as UserLayout } from "./UserLayout-Cqdl8mOt.js";
import { Head, Link } from "@inertiajs/react";
import { C as Card, c as CardContent } from "./card-BY9Lq84_.js";
import { B as Button } from "./button-Dm9784FB.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { Heart, BedDouble, Star, MapPin, ArrowRight } from "lucide-react";
import { F as FavoriteButton } from "./FavoriteButton-CyjSbvvu.js";
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
function Index({ hotels = [] }) {
  return /* @__PURE__ */ jsxs(UserLayout, { title: "My Favorites", children: [
    /* @__PURE__ */ jsx(Head, { title: "My Favorites" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-mesh opacity-30 mix-blend-overlay" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 noise opacity-30" }),
        /* @__PURE__ */ jsxs("div", { className: "relative p-8 text-white space-y-2", children: [
          /* @__PURE__ */ jsxs(
            Badge,
            {
              variant: "outline",
              className: "glass border-white/20 text-white w-fit",
              children: [
                /* @__PURE__ */ jsx(Heart, { className: "h-3 w-3 fill-current" }),
                hotels.length,
                " ",
                hotels.length === 1 ? "favorite" : "favorites"
              ]
            }
          ),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "My favorites" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/85 max-w-lg", children: hotels.length > 0 ? "Your saved hotels — ready to book." : "Hotels you love will appear here." })
        ] })
      ] }),
      hotels.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: hotels.map((hotel, idx) => /* @__PURE__ */ jsx(
        Link,
        {
          href: `/explore/${hotel.uuid}`,
          className: "block group animate-fade-up",
          style: {
            animationDelay: `${Math.min(idx * 40, 240)}ms`
          },
          children: /* @__PURE__ */ jsxs(
            Card,
            {
              variant: "elevated",
              interactive: true,
              className: "overflow-hidden h-full",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "aspect-[4/3] overflow-hidden bg-muted relative", children: [
                  /* @__PURE__ */ jsx(
                    FavoriteButton,
                    {
                      hotelId: hotel.id,
                      hotelUuid: hotel.uuid,
                      className: "absolute top-3 right-3 z-10"
                    }
                  ),
                  hotel.images?.[0] ? /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: hotel.images[0],
                      alt: hotel.name,
                      className: "w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                    }
                  ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsx(BedDouble, { className: "h-12 w-12 text-muted-foreground" }) }),
                  hotel.reviews_avg_rating && /* @__PURE__ */ jsxs("div", { className: "absolute top-3 left-3 glass rounded-full px-2.5 py-1 text-xs font-semibold inline-flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 fill-amber-400 text-amber-400" }),
                    Number(
                      hotel.reviews_avg_rating
                    ).toFixed(1)
                  ] })
                ] }),
                /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-semibold truncate group-hover:text-primary transition-colors", children: hotel.name }),
                    /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground flex items-center gap-1 mt-1 truncate", children: [
                      /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5 shrink-0" }),
                      hotel.city,
                      ", ",
                      hotel.country
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-3 pt-3 border-t border-border/60 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxs("span", { children: [
                      hotel.rooms_count,
                      " rooms"
                    ] }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      hotel.reviews_count,
                      " reviews"
                    ] })
                  ] })
                ] })
              ]
            }
          )
        },
        hotel.id
      )) }) : /* @__PURE__ */ jsx(Card, { variant: "soft", className: "text-center py-16", children: /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Heart, { className: "h-8 w-8 text-white fill-current" }) }),
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: "No favorites yet" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-sm mx-auto", children: "Browse hotels and tap the heart icon to save your favorites for easy access later." }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "gradient",
            shape: "pill",
            size: "lg",
            className: "mt-6",
            asChild: true,
            children: /* @__PURE__ */ jsxs(Link, { href: "/explore", children: [
              "Browse hotels",
              " ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
            ] })
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  Index as default
};
