import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import { LayoutDashboard, CalendarCheck, Heart, Star, Bell, ChevronRight, Settings, X, Menu } from "lucide-react";
import { c as cn, B as Button } from "./button-Dm9784FB.js";
import { A as Avatar, a as AvatarImage, b as AvatarFallback } from "./BackToTop-Cf3OnJBv.js";
import { W as WebLayout } from "./WebLayout-Dc8gJj4l.js";
import "./ThemeToggle-DzFfzEoP.js";
import "./badge-qMfuib1i.js";
const sidebarLinks = [
  {
    name: "Dashboard",
    href: "/web",
    icon: LayoutDashboard,
    color: "text-blue-500"
  },
  {
    name: "My Bookings",
    href: "/web/my-bookings",
    icon: CalendarCheck,
    color: "text-emerald-500"
  },
  {
    name: "Favorites",
    href: "/web/favorites",
    icon: Heart,
    color: "text-rose-500"
  },
  {
    name: "My Reviews",
    href: "/web/my-reviews",
    icon: Star,
    color: "text-amber-500"
  },
  {
    name: "Notifications",
    href: "/web/notifications",
    icon: Bell,
    color: "text-indigo-500"
  }
];
function UserLayout({ children, title }) {
  const { auth } = usePage().props;
  const { url } = usePage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = auth.user;
  const isActive = (href) => {
    if (href === "/web") return url === "/web";
    return url.startsWith(href);
  };
  return /* @__PURE__ */ jsx(WebLayout, { children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
    /* @__PURE__ */ jsx("aside", { className: "hidden lg:block w-72 shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-24 space-y-6", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxs(Avatar, { className: "h-16 w-16 border-2 border-primary/20 p-0.5", children: [
          /* @__PURE__ */ jsx(AvatarImage, { src: user.avatar }),
          /* @__PURE__ */ jsx(AvatarFallback, { className: "bg-primary/10 text-primary text-xl font-bold font-serif", children: user.name?.charAt(0) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg text-foreground truncate max-w-[200px]", children: user.name }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground truncate max-w-[200px]", children: user.email })
        ] }),
        /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "mt-3 capitalize px-3 py-0.5", children: [
          user.role,
          " Member"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("nav", { className: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsx("p", { className: "px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Dashboard Menu" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-1", children: sidebarLinks.map((link) => /* @__PURE__ */ jsxs(
            Link,
            {
              href: link.href,
              className: cn(
                "flex items-center justify-between group px-4 py-3 rounded-xl transition-all duration-200",
                isActive(link.href) ? "bg-primary/10 text-primary shadow-sm" : "text-muted-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-foreground"
              ),
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(link.icon, { className: cn(
                    "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                    isActive(link.href) ? "text-primary" : link.color
                  ) }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: link.name })
                ] }),
                isActive(link.href) && /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
              ]
            },
            link.name
          )) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-t border-zinc-100 dark:border-zinc-800 p-3 bg-zinc-50/50 dark:bg-zinc-900/50", children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/web/profile",
            className: cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-muted-foreground hover:bg-white dark:hover:bg-zinc-800 hover:text-foreground",
              url === "/profile" ? "text-primary bg-primary/10" : ""
            ),
            children: [
              /* @__PURE__ */ jsx(Settings, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Profile Settings" })
            ]
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:hidden flex items-center justify-between bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-6 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs(Avatar, { className: "h-10 w-10", children: [
            /* @__PURE__ */ jsx(AvatarImage, { src: user.avatar }),
            /* @__PURE__ */ jsx(AvatarFallback, { className: "bg-primary/10 text-primary font-bold", children: user.name?.charAt(0) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm leading-none", children: user.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-1 capitalize", children: [
              user.role,
              " Account"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "rounded-lg h-9 gap-2",
            onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
            children: [
              isMobileMenuOpen ? /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Menu, { className: "h-4 w-4" }),
              sidebarLinks.find((l) => isActive(l.href))?.name || "Menu"
            ]
          }
        )
      ] }),
      isMobileMenuOpen && /* @__PURE__ */ jsx("div", { className: "lg:hidden animate-in fade-in slide-in-from-top-2 duration-300 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden mb-6 shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-2 space-y-1", children: [
        sidebarLinks.map((link) => /* @__PURE__ */ jsxs(
          Link,
          {
            href: link.href,
            onClick: () => setIsMobileMenuOpen(false),
            className: cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium",
              isActive(link.href) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900"
            ),
            children: [
              /* @__PURE__ */ jsx(link.icon, { className: cn("h-4 w-4", isActive(link.href) ? "text-primary" : link.color) }),
              link.name
            ]
          },
          link.name
        )),
        /* @__PURE__ */ jsx(Separator, { className: "my-1 mx-2" }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/web/profile",
            onClick: () => setIsMobileMenuOpen(false),
            className: "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900",
            children: [
              /* @__PURE__ */ jsx(Settings, { className: "h-4 w-4" }),
              "Profile Settings"
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "animate-in fade-in slide-in-from-bottom-2 duration-500", children })
    ] })
  ] }) }) });
}
function Badge({ variant = "default", className, ...props }) {
  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border text-foreground"
  };
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      ),
      ...props
    }
  );
}
function Separator({ className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("h-px bg-zinc-200 dark:bg-zinc-800", className) });
}
export {
  UserLayout as U
};
