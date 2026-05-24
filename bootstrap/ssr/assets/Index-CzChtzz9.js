import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { W as WebLayout } from "./WebLayout-Dc8gJj4l.js";
import { Head, Link, router } from "@inertiajs/react";
import { C as Card, c as CardContent } from "./card-BY9Lq84_.js";
import { B as Button } from "./button-Dm9784FB.js";
import { I as Input } from "./input-D6vmmPPF.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DjoqtalQ.js";
import { Sparkles, Search, X, Hotel, Star, MapPin, BedDouble } from "lucide-react";
import { F as FavoriteButton } from "./FavoriteButton-CyjSbvvu.js";
import "./BackToTop-Cf3OnJBv.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "sonner";
import "./ThemeToggle-DzFfzEoP.js";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/input";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "@base-ui/react/select";
function HotelsIndex({ hotels, cities, filters }) {
  const [search, setSearch] = useState(filters?.search || "");
  const hotelData = hotels.data || [];
  const handleSearch = (e) => {
    e.preventDefault();
    router.get(
      route("hotels.index"),
      { search, city: filters?.city },
      { preserveState: true }
    );
  };
  const handleCityFilter = (city) => {
    router.get(
      route("hotels.index"),
      { search: filters?.search, city: city === "all" ? "" : city },
      { preserveState: true }
    );
  };
  const clearFilters = () => {
    setSearch("");
    router.get(route("hotels.index"));
  };
  const hasFilters = filters?.search || filters?.city;
  return /* @__PURE__ */ jsxs(WebLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Explore Hotels" }),
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-mesh" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 noise" }),
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 space-y-5", children: [
        /* @__PURE__ */ jsxs(
          Badge,
          {
            variant: "outline",
            className: "glass border-foreground/10 w-fit",
            children: [
              /* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3" }),
              hotels.total ?? hotelData.length,
              " stays available"
            ]
          }
        ),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold tracking-tight animate-fade-up", children: [
          "Explore",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-gradient-primary", children: "hotels" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground max-w-xl animate-fade-up [animation-delay:80ms]", children: "Discover the perfect place for your next trip — filtered by city, search, and rating." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8", children: [
      /* @__PURE__ */ jsx("div", { className: "glass rounded-3xl p-3 sm:p-4 -mt-2 shadow-soft animate-fade-up [animation-delay:120ms]", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
        /* @__PURE__ */ jsxs(
          "form",
          {
            onSubmit: handleSearch,
            className: "flex-1 flex gap-2",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    variant: "soft",
                    placeholder: "Search by hotel, city, or country…",
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    className: "pl-11"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  variant: "gradient",
                  shape: "pill",
                  size: "lg",
                  children: "Search"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Select,
          {
            value: filters?.city || "all",
            onValueChange: handleCityFilter,
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full sm:w-48 h-11 rounded-2xl bg-muted/60 border-transparent", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "All cities" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All cities" }),
                cities?.map((city) => /* @__PURE__ */ jsx(SelectItem, { value: city, children: city }, city))
              ] })
            ]
          }
        ),
        hasFilters && /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "icon-lg",
            shape: "pill",
            onClick: clearFilters,
            "aria-label": "Clear filters",
            children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
          }
        )
      ] }) }),
      hotelData.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: hotelData.map((hotel, idx) => /* @__PURE__ */ jsx(
        Link,
        {
          href: route("hotels.show", hotel.id),
          className: "block group animate-fade-up",
          style: {
            animationDelay: `${Math.min(idx * 40, 320)}ms`
          },
          children: /* @__PURE__ */ jsxs(
            Card,
            {
              variant: "elevated",
              interactive: true,
              className: "overflow-hidden h-full",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "aspect-[4/3] bg-muted relative overflow-hidden", children: [
                  /* @__PURE__ */ jsx(
                    FavoriteButton,
                    {
                      hotelId: hotel.id,
                      hotelUuid: hotel.uuid,
                      className: "absolute top-3 right-3 z-10"
                    }
                  ),
                  hotel.images?.length > 0 ? /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: hotel.images[0],
                      alt: hotel.name,
                      className: "w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                    }
                  ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Hotel, { className: "h-12 w-12 text-muted-foreground" }) }),
                  hotel.rating > 0 && /* @__PURE__ */ jsxs("div", { className: "absolute top-3 left-3 glass rounded-full px-2.5 py-1 text-xs font-semibold inline-flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 fill-amber-400 text-amber-400" }),
                    hotel.rating
                  ] })
                ] }),
                /* @__PURE__ */ jsxs(CardContent, { className: "p-5", children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg group-hover:text-primary transition-colors truncate", children: hotel.name }),
                  /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 mt-1.5 text-sm text-muted-foreground truncate", children: [
                    /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5 shrink-0" }),
                    /* @__PURE__ */ jsxs("span", { className: "truncate", children: [
                      hotel.city,
                      ", ",
                      hotel.country
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-4 pt-3 border-t border-border/60 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsx(BedDouble, { className: "h-3.5 w-3.5" }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      hotel.rooms_count,
                      " rooms available"
                    ] })
                  ] })
                ] })
              ]
            }
          )
        },
        hotel.id
      )) }) : /* @__PURE__ */ jsx(Card, { variant: "soft", className: "text-center py-16", children: /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto h-16 w-16 rounded-full bg-gradient-primary-soft flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Hotel, { className: "h-8 w-8 text-primary" }) }),
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: "No hotels found" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Try adjusting your search or filter criteria." }),
        hasFilters && /* @__PURE__ */ jsx(
          Button,
          {
            variant: "gradient",
            shape: "pill",
            className: "mt-5",
            onClick: clearFilters,
            children: "Clear filters"
          }
        )
      ] }) }),
      hotels.links && hotels.last_page > 1 && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-1", children: hotels.links.map((link, index) => /* @__PURE__ */ jsx(
        Link,
        {
          href: link.url || "#",
          className: `min-w-9 h-9 inline-flex items-center justify-center px-3 text-sm rounded-full transition-all ${link.active ? "bg-gradient-primary text-primary-foreground shadow-glow" : link.url ? "hover:bg-muted" : "text-muted-foreground cursor-not-allowed"}`,
          dangerouslySetInnerHTML: {
            __html: link.label
          },
          preserveScroll: true
        },
        index
      )) })
    ] })
  ] });
}
export {
  HotelsIndex as default
};
