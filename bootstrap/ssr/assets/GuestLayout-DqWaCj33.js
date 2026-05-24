import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { Hotel, Sparkles, ArrowLeft } from "lucide-react";
import { B as Button } from "./button-Dm9784FB.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { T as ThemeToggle } from "./ThemeToggle-DzFfzEoP.js";
function GuestLayout({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen", children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex lg:w-1/2 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 bg-cover bg-center scale-110",
          style: {
            backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-primary opacity-80 mix-blend-multiply" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-mesh opacity-50" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 noise" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col justify-between p-12 text-white w-full", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/",
            className: "flex items-center gap-3 w-fit group",
            children: [
              /* @__PURE__ */ jsx("div", { className: "glass p-2.5 rounded-2xl border-white/20", children: /* @__PURE__ */ jsx(Hotel, { className: "w-6 h-6" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-xl font-bold tracking-tight", children: "HotelBook" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "space-y-5 animate-fade-up", children: [
          /* @__PURE__ */ jsxs(
            Badge,
            {
              variant: "outline",
              className: "glass border-white/20 text-white",
              children: [
                /* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3" }),
                "Premium stays, instant booking"
              ]
            }
          ),
          /* @__PURE__ */ jsxs("h2", { className: "text-5xl font-bold leading-[1.05] tracking-tight", children: [
            "Discover your",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent", children: "perfect getaway" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-white/80 text-lg max-w-md leading-relaxed", children: "Book premium hotels worldwide with best prices guaranteed. Your next adventure starts here." }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 pt-4", children: [
            /* @__PURE__ */ jsx(Stat, { label: "Hotels", value: "500+" }),
            /* @__PURE__ */ jsx("div", { className: "w-px h-10 bg-white/20" }),
            /* @__PURE__ */ jsx(Stat, { label: "Destinations", value: "50+" }),
            /* @__PURE__ */ jsx("div", { className: "w-px h-10 bg-white/20" }),
            /* @__PURE__ */ jsx(Stat, { label: "Happy guests", value: "10k+" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-white/50 text-sm", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " HotelBook. All rights reserved."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex items-center justify-center p-6 sm:p-8 bg-background relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-mesh opacity-40 lg:opacity-0" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-6 left-6 lg:hidden z-10", children: /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-gradient-primary p-2 rounded-xl", children: /* @__PURE__ */ jsx(Hotel, { className: "w-5 h-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-lg font-bold tracking-tight", children: "HotelBook" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "absolute top-6 right-6 flex items-center gap-2 z-10", children: [
        /* @__PURE__ */ jsx(ThemeToggle, {}),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            shape: "pill",
            size: "sm",
            asChild: true,
            children: /* @__PURE__ */ jsxs(Link, { href: "/", children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
              "Home"
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full max-w-[440px] relative animate-fade-up", children })
    ] })
  ] });
}
function Stat({ label, value }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold tracking-tight", children: value }),
    /* @__PURE__ */ jsx("p", { className: "text-white/60 text-sm", children: label })
  ] });
}
export {
  GuestLayout as G
};
