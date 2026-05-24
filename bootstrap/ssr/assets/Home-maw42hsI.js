import { jsxs, jsx } from "react/jsx-runtime";
import { W as WebLayout } from "./WebLayout-Dc8gJj4l.js";
import { Head, Link } from "@inertiajs/react";
import { B as Button } from "./button-Dm9784FB.js";
import { C as Card, c as CardContent } from "./card-BY9Lq84_.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { Sparkles, Search, Shield, Clock, Star, ArrowRight, BedDouble, MapPin } from "lucide-react";
import { I as Input } from "./input-D6vmmPPF.js";
import { useState } from "react";
import { F as FavoriteButton } from "./FavoriteButton-CyjSbvvu.js";
import "./BackToTop-Cf3OnJBv.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "sonner";
import "./ThemeToggle-DzFfzEoP.js";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "@base-ui/react/input";
function Home({
  featuredHotels,
  totalHotels,
  totalReviews,
  amenities,
  latestReviews
}) {
  const [search, setSearch] = useState("");
  const goSearch = () => {
    window.location.href = search ? `/explore?search=${encodeURIComponent(search)}` : "/explore";
  };
  return /* @__PURE__ */ jsxs(WebLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Book Your Perfect Stay" }),
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-mesh" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 noise" }),
      /* @__PURE__ */ jsx("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center space-y-6", children: [
        /* @__PURE__ */ jsxs(
          Badge,
          {
            variant: "outline",
            className: "glass border-foreground/10 mx-auto animate-fade-up",
            children: [
              /* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3" }),
              "Hand-picked stays for 2026"
            ]
          }
        ),
        /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] animate-fade-up [animation-delay:80ms]", children: [
          "Find your",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-gradient-primary", children: "perfect stay" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-muted-foreground max-w-xl mx-auto animate-fade-up [animation-delay:160ms]", children: "Discover boutique hotels, beachside resorts, and urban escapes — booked in seconds." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-col sm:flex-row gap-2 max-w-xl mx-auto animate-fade-up [animation-delay:220ms]", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                variant: "soft",
                placeholder: "Search hotels, cities, countries…",
                className: "pl-12 h-14 text-base",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter") goSearch();
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "gradient",
              size: "xl",
              shape: "pill",
              onClick: goSearch,
              children: "Search"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground animate-fade-up [animation-delay:300ms]", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Shield, { className: "h-4 w-4 text-emerald-500" }),
            "Best Price Guarantee"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-sky-500" }),
            "Free Cancellation"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 text-amber-500" }),
            totalReviews,
            "+ Reviews"
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Top rated stays" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1", children: "Discover our highest-rated properties" })
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", shape: "pill", asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: "/explore", children: [
          "View all ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: featuredHotels.map((hotel) => /* @__PURE__ */ jsx(Link, { href: `/explore/${hotel.uuid}`, children: /* @__PURE__ */ jsxs(
        Card,
        {
          variant: "elevated",
          interactive: true,
          className: "group overflow-hidden cursor-pointer",
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
              /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-semibold truncate group-hover:text-primary transition-colors", children: hotel.name }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground flex items-center gap-1 mt-1 truncate", children: [
                    /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5 shrink-0" }),
                    hotel.city,
                    ", ",
                    hotel.country
                  ] })
                ] }),
                hotel.reviews_avg_rating && /* @__PURE__ */ jsxs(Badge, { className: "bg-gradient-primary text-primary-foreground font-bold shrink-0", children: [
                  /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 fill-current" }),
                  Number(
                    hotel.reviews_avg_rating
                  ).toFixed(1)
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
      ) }, hotel.id)) })
    ] }),
    latestReviews.length > 0 && /* @__PURE__ */ jsx("section", { className: "bg-muted/30 py-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight mb-8", children: "What guests are saying" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: latestReviews.map((review) => /* @__PURE__ */ jsx(
        Card,
        {
          variant: "glass",
          className: "hover-lift",
          children: /* @__PURE__ */ jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsx("div", { className: "flex gap-0.5 mb-3", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsx(
              Star,
              {
                className: `h-4 w-4 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}`
              },
              s
            )) }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground line-clamp-3", children: [
              '"',
              review.comment || "Great experience!",
              '"'
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-3 border-t border-border/60", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: review.user?.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: review.hotel?.name })
            ] })
          ] })
        },
        review.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-gradient-primary p-8 md:p-14 text-center text-primary-foreground", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 noise opacity-20" }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold", children: "Ready to book your stay?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-primary-foreground/85 max-w-xl mx-auto", children: "Join thousands of travelers who trust HotelBook for their accommodation needs." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "xl",
              shape: "pill",
              variant: "secondary",
              asChild: true,
              children: /* @__PURE__ */ jsx(Link, { href: "/explore", children: "Browse hotels" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "xl",
              shape: "pill",
              variant: "glass",
              className: "text-primary-foreground border-white/20",
              asChild: true,
              children: /* @__PURE__ */ jsx(Link, { href: route("register"), children: "Create account" })
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Home as default
};
