import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { W as WebLayout } from "./WebLayout-Dc8gJj4l.js";
import { Head, router, Link } from "@inertiajs/react";
import { C as Card, c as CardContent } from "./card-BY9Lq84_.js";
import { c as cn, B as Button } from "./button-Dm9784FB.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { I as Input } from "./input-D6vmmPPF.js";
import { MapPin, X, Search, Map, Sparkles, Compass, ArrowRight, TrendingUp, BedDouble, Star, Loader2 } from "lucide-react";
import { useState } from "react";
import { F as FavoriteButton } from "./FavoriteButton-CyjSbvvu.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent } from "./dialog-zbygvPRX.js";
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
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "@base-ui/react/input";
import "@base-ui/react/dialog";
function DestinationFilter({
  cities,
  currentCity,
  onCitySelect,
  triggerClassName,
  placeholder = "Where are you going?",
  icon: TriggerIcon = MapPin
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filteredCities = cities.filter(
    (city) => city.toLowerCase().includes(search.toLowerCase())
  );
  const popularCities = cities.slice(0, 4);
  const handleSelect = (city) => {
    onCitySelect(city);
    setIsOpen(false);
  };
  return /* @__PURE__ */ jsxs(Dialog, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx("div", { className: "relative group cursor-pointer w-full", children: /* @__PURE__ */ jsxs("div", { className: cn(
      "flex items-center gap-2 h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900 group-hover:border-primary/50",
      currentCity && "border-primary/50 bg-primary/5",
      triggerClassName
    ), children: [
      /* @__PURE__ */ jsx(TriggerIcon, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
      /* @__PURE__ */ jsx("span", { className: cn(
        "flex-1 text-left line-clamp-1",
        !currentCity && "text-muted-foreground"
      ), children: currentCity || placeholder }),
      currentCity && /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "h-6 w-6 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800",
          onClick: (e) => {
            e.stopPropagation();
            onCitySelect(null);
          },
          children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-[500px] p-0 overflow-hidden gap-0", children: [
      /* @__PURE__ */ jsx("div", { className: "p-4 border-b", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: "Find destinations...",
            className: "pl-10 h-11 bg-zinc-50 dark:bg-zinc-900 border-none ring-0 focus-visible:ring-1 focus-visible:ring-primary/20",
            autoFocus: true,
            value: search,
            onChange: (e) => setSearch(e.target.value)
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-8 max-h-[60vh] overflow-y-auto", children: [
        !search && popularCities.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm font-semibold text-foreground/70 uppercase tracking-wider", children: [
            /* @__PURE__ */ jsx(Map, { className: "h-4 w-4 text-primary" }),
            "Popular destinations"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: popularCities.map((city) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleSelect(city),
              className: cn(
                "inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all hover:border-primary/30 hover:bg-primary/5",
                currentCity === city ? "border-primary bg-primary text-primary-foreground" : "bg-background text-zinc-600 border-zinc-200 dark:border-zinc-800 dark:text-zinc-400"
              ),
              children: city
            },
            city
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 pb-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm font-semibold text-foreground/70 uppercase tracking-wider", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-primary" }),
            search ? "Search results" : "All destinations"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: filteredCities.length > 0 ? filteredCities.map((city) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleSelect(city),
              className: cn(
                "flex items-center gap-3 p-3 rounded-lg border text-left transition-all group",
                currentCity === city ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-zinc-100 bg-zinc-50/50 hover:bg-zinc-100/80 hover:border-primary/20 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
              ),
              children: [
                /* @__PURE__ */ jsx("div", { className: cn(
                  "p-2 rounded-md transition-colors",
                  currentCity === city ? "bg-primary text-primary-foreground" : "bg-white dark:bg-zinc-800 text-muted-foreground group-hover:text-primary"
                ), children: /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm", children: city }),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    "Explore rooms in ",
                    city
                  ] })
                ] })
              ]
            },
            city
          )) : /* @__PURE__ */ jsxs("div", { className: "col-span-full py-10 text-center space-y-2", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium", children: [
              'No destinations found for "',
              search,
              '"'
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Try searching for another city." })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
function Hotels({ hotels, cities, filters }) {
  const [search, setSearch] = useState(filters?.search || "");
  const [loadingMore, setLoadingMore] = useState(false);
  const applyFilters = (newFilters) => {
    router.get(
      "/explore",
      { ...filters, ...newFilters },
      { preserveState: true }
    );
  };
  const hasFilters = filters?.search || filters?.city;
  return /* @__PURE__ */ jsxs(WebLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Explore Hotels" }),
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden isolate", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-mesh" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          "aria-hidden": true,
          className: "absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--foreground)_4%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--foreground)_4%,transparent)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent_78%)]"
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          "aria-hidden": true,
          className: "pointer-events-none absolute -top-40 -right-24 h-[520px] w-[520px] rounded-full bg-gradient-primary opacity-25 blur-3xl"
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          "aria-hidden": true,
          className: "pointer-events-none absolute -bottom-48 -left-20 h-[460px] w-[460px] rounded-full bg-primary/30 blur-3xl"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 noise" }),
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-14 md:pb-20", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center animate-fade-up", children: /* @__PURE__ */ jsxs(
          Badge,
          {
            variant: "outline",
            className: "glass border-foreground/10 pl-1.5 pr-3 py-1 text-[11px]",
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-primary", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-2.5 w-2.5 text-white" }) }),
              /* @__PURE__ */ jsxs("span", { className: "uppercase tracking-[0.18em] font-semibold text-foreground/80", children: [
                hotels.total,
                " handpicked stays",
                filters?.city ? ` · ${filters.city}` : ""
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs("h1", { className: "mt-6 text-center text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.02] animate-fade-up [animation-delay:80ms]", children: [
          "Discover",
          " ",
          /* @__PURE__ */ jsx("span", { className: "italic font-serif font-medium text-gradient-primary", children: "extraordinary" }),
          /* @__PURE__ */ jsx("br", { className: "hidden sm:block" }),
          /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: " " }),
          "places to stay"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-center text-base md:text-lg text-muted-foreground max-w-xl mx-auto animate-fade-up [animation-delay:160ms]", children: "Search our curated collection by name, city, or destination — your next escape starts here." }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 md:mt-12 animate-fade-up [animation-delay:240ms]", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              "aria-hidden": true,
              className: "absolute -inset-x-8 -inset-y-4 bg-gradient-primary opacity-[0.08] blur-2xl rounded-[3rem]"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "relative glass-strong rounded-[28px] p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] ring-1 ring-foreground/5", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] md:divide-x divide-border/60", children: [
            /* @__PURE__ */ jsxs("div", { className: "group px-4 pt-2 pb-1.5 md:pr-5 transition-colors rounded-t-[22px] md:rounded-l-[22px] md:rounded-tr-none hover:bg-foreground/[0.02]", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground", children: [
                /* @__PURE__ */ jsx(Search, { className: "h-3 w-3" }),
                "Hotel"
              ] }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  variant: "soft",
                  placeholder: "Search by name…",
                  className: "mt-0.5 h-9 bg-transparent border-0 rounded-none px-0 text-[15px] font-medium placeholder:text-muted-foreground/70 focus-visible:bg-transparent focus-visible:border-0 focus-visible:ring-0",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter")
                      applyFilters({
                        search,
                        page: 1
                      });
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "group px-4 pt-2 pb-1.5 md:px-5 transition-colors hover:bg-foreground/[0.02]", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground", children: [
                /* @__PURE__ */ jsx(Compass, { className: "h-3 w-3" }),
                "Destination"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-0.5", children: /* @__PURE__ */ jsx(
                DestinationFilter,
                {
                  cities,
                  currentCity: filters?.city,
                  onCitySelect: (city) => applyFilters({
                    city,
                    page: 1
                  }),
                  triggerClassName: "h-9 px-0 bg-transparent border-0 rounded-none text-[15px] font-medium hover:bg-transparent dark:hover:bg-transparent group-hover:border-0",
                  placeholder: "Anywhere you dream of",
                  icon: MapPin
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-1.5 md:p-2", children: /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "gradient",
                shape: "pill",
                size: "lg",
                className: "w-full md:w-auto md:px-6 group/btn",
                onClick: () => applyFilters({
                  search,
                  page: 1
                }),
                children: [
                  /* @__PURE__ */ jsx(Search, { className: "h-4 w-4" }),
                  "Search",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5" })
                ]
              }
            ) })
          ] }) })
        ] }) }),
        cities?.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap items-center justify-center gap-2 animate-fade-up [animation-delay:320ms]", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] font-semibold text-muted-foreground/90", children: [
            /* @__PURE__ */ jsx(TrendingUp, { className: "h-3.5 w-3.5 text-primary" }),
            "Trending"
          ] }),
          cities.slice(0, 5).map((city) => {
            const active = filters?.city === city;
            return /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => applyFilters({
                  city: active ? null : city,
                  page: 1
                }),
                className: cn(
                  "inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ease-out-expo hover:-translate-y-0.5",
                  active ? "bg-foreground text-background border-foreground shadow-md" : "bg-background/70 backdrop-blur border-foreground/10 text-foreground/75 hover:border-foreground/25 hover:bg-background hover:text-foreground"
                ),
                children: city
              },
              city
            );
          }),
          hasFilters && /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                setSearch("");
                router.get("/explore");
              },
              className: "inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground transition-colors",
              children: [
                /* @__PURE__ */ jsx(X, { className: "h-3 w-3" }),
                "Clear all"
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 space-y-8", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between gap-3 animate-fade-up", children: /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold tracking-tight", children: filters?.city ? `Stays in ${filters.city}` : filters?.search ? `Results for "${filters.search}"` : "All stays" }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
          hotels.total,
          " ",
          hotels.total === 1 ? "hotel" : "hotels"
        ] })
      ] }) }),
      hotels.data.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: hotels.data.map((hotel, idx) => /* @__PURE__ */ jsx(
        Link,
        {
          href: `/explore/${hotel.uuid}`,
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
                  hotel.rating > 0 && /* @__PURE__ */ jsxs("div", { className: "absolute top-3 left-3 glass rounded-full px-2.5 py-1 text-xs font-semibold inline-flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 fill-amber-400 text-amber-400" }),
                    Number(hotel.rating).toFixed(
                      1
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-semibold truncate group-hover:text-primary transition-colors", children: hotel.name }),
                    /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground flex items-center gap-1 mt-1 truncate", children: [
                      /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5 shrink-0" }),
                      hotel.city,
                      ",",
                      " ",
                      hotel.country
                    ] })
                  ] }) }),
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
        /* @__PURE__ */ jsx("div", { className: "mx-auto h-16 w-16 rounded-full bg-gradient-primary-soft flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(BedDouble, { className: "h-8 w-8 text-primary" }) }),
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: "No hotels found" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Try adjusting your search or filters." })
      ] }) }),
      hotels.total > hotels.data.length && /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "glass",
          size: "xl",
          shape: "pill",
          disabled: loadingMore,
          onClick: () => {
            setLoadingMore(true);
            router.get(
              "/explore",
              { ...filters, all: 1 },
              {
                preserveState: true,
                onFinish: () => setLoadingMore(false)
              }
            );
          },
          children: loadingMore ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
            "Loading…"
          ] }) : `See more (${hotels.total - hotels.data.length} more)`
        }
      ) })
    ] })
  ] });
}
export {
  Hotels as default
};
