import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { usePage, Link, router } from "@inertiajs/react";
import { c as cn, B as Button } from "./button-Dm9784FB.js";
import { D as DropdownMenu, c as DropdownMenuTrigger, A as Avatar, a as AvatarImage, b as AvatarFallback, d as DropdownMenuContent, e as DropdownMenuGroup, f as DropdownMenuLabel, g as DropdownMenuSeparator, h as DropdownMenuItem, T as Toaster, B as BackToTop } from "./BackToTop-Cf3OnJBv.js";
import { User, CalendarCheck, Heart, Star, Bell, Settings, LogOut, LogIn, UserPlus, X, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { T as ThemeToggle } from "./ThemeToggle-DzFfzEoP.js";
import { toast } from "sonner";
const publicLinks = [
  { name: "Home", href: "/" },
  { name: "Hotels", href: "/explore" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];
const userLinks = [
  { name: "Home", href: "/" },
  { name: "Hotels", href: "/explore" },
  { name: "About", href: "/about" },
  { name: "My Bookings", href: "/web/my-bookings" },
  { name: "Contact", href: "/contact" }
];
function WebLayout({ children }) {
  const { auth, flash } = usePage().props;
  const { url } = usePage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = auth?.user;
  const navLinks = user ? userLinks : publicLinks;
  useEffect(() => {
    if (flash?.success) toast.success(flash.success);
    if (flash?.error) toast.error(flash.error);
  }, [flash]);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-white dark:bg-zinc-950 font-sans", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-16", children: [
        /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex items-center gap-2 group", children: [
          /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl group-hover:scale-110 transition-transform", children: "H" }),
          /* @__PURE__ */ jsxs("span", { className: "text-xl font-bold tracking-tight", children: [
            "Hotel",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Book" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("nav", { className: "hidden md:flex items-center gap-1", children: navLinks.map((link) => /* @__PURE__ */ jsx(
          Link,
          {
            href: link.href,
            className: cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
              url === link.href ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-accent"
            ),
            children: link.name
          },
          link.name
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(ThemeToggle, {}),
          user ? /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center gap-2", children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "relative h-9 w-9 rounded-full p-0", children: /* @__PURE__ */ jsxs(Avatar, { className: "h-9 w-9", children: [
              /* @__PURE__ */ jsx(AvatarImage, { src: user.avatar }),
              /* @__PURE__ */ jsx(AvatarFallback, { className: "bg-primary/10 text-primary font-bold text-sm", children: user.name?.charAt(0) })
            ] }) }) }),
            /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", className: "w-56", children: [
              /* @__PURE__ */ jsx(DropdownMenuGroup, { children: /* @__PURE__ */ jsx(DropdownMenuLabel, { className: "font-normal", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-bold", children: user.name }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: user.email })
              ] }) }) }),
              /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsxs(DropdownMenuItem, { className: "cursor-pointer", onClick: () => router.get("/web"), children: [
                /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }),
                " Dashboard"
              ] }),
              /* @__PURE__ */ jsxs(DropdownMenuItem, { className: "cursor-pointer", onClick: () => router.get("/web/my-bookings"), children: [
                /* @__PURE__ */ jsx(CalendarCheck, { className: "h-4 w-4" }),
                " My Bookings"
              ] }),
              /* @__PURE__ */ jsxs(DropdownMenuItem, { className: "cursor-pointer", onClick: () => router.get("/web/favorites"), children: [
                /* @__PURE__ */ jsx(Heart, { className: "h-4 w-4" }),
                " Favorites"
              ] }),
              /* @__PURE__ */ jsxs(DropdownMenuItem, { className: "cursor-pointer", onClick: () => router.get("/web/my-reviews"), children: [
                /* @__PURE__ */ jsx(Star, { className: "h-4 w-4" }),
                " My Reviews"
              ] }),
              /* @__PURE__ */ jsxs(DropdownMenuItem, { className: "cursor-pointer", onClick: () => router.get("/web/notifications"), children: [
                /* @__PURE__ */ jsx(Bell, { className: "h-4 w-4" }),
                " Notifications"
              ] }),
              /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsxs(DropdownMenuItem, { className: "cursor-pointer", onClick: () => router.get(route("profile.edit")), children: [
                /* @__PURE__ */ jsx(Settings, { className: "h-4 w-4" }),
                " Profile Settings"
              ] }),
              /* @__PURE__ */ jsxs(
                DropdownMenuItem,
                {
                  className: "cursor-pointer text-rose-500 focus:text-rose-500",
                  onClick: () => router.post(route("logout")),
                  children: [
                    /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
                    " Sign Out"
                  ]
                }
              )
            ] })
          ] }) }) : /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", asChild: true, className: "rounded-full px-4", children: /* @__PURE__ */ jsxs(Link, { href: route("login"), children: [
              /* @__PURE__ */ jsx(LogIn, { className: "mr-2 h-4 w-4" }),
              "Sign In"
            ] }) }),
            /* @__PURE__ */ jsx(Button, { size: "sm", asChild: true, className: "rounded-full px-4", children: /* @__PURE__ */ jsxs(Link, { href: route("register"), children: [
              /* @__PURE__ */ jsx(UserPlus, { className: "mr-2 h-4 w-4" }),
              "Get Started"
            ] }) })
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "md:hidden",
              onClick: () => setMobileOpen(!mobileOpen),
              children: mobileOpen ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
            }
          )
        ] })
      ] }),
      mobileOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden py-4 border-t border-zinc-200 dark:border-zinc-800", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
        navLinks.map((link) => /* @__PURE__ */ jsx(
          Link,
          {
            href: link.href,
            onClick: () => setMobileOpen(false),
            className: cn(
              "px-4 py-2.5 text-sm font-medium rounded-lg",
              url === link.href ? "text-primary bg-primary/5" : "text-muted-foreground hover:bg-accent"
            ),
            children: link.name
          },
          link.name
        )),
        /* @__PURE__ */ jsx("div", { className: "pt-2 mt-2 border-t border-zinc-200 dark:border-zinc-800 flex gap-2", children: user ? /* @__PURE__ */ jsx(Button, { variant: "outline", className: "w-full", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("user.dashboard"), children: "Dashboard" }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", className: "flex-1 rounded-full", asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: route("login"), children: [
            /* @__PURE__ */ jsx(LogIn, { className: "mr-2 h-4 w-4" }),
            "Sign In"
          ] }) }),
          /* @__PURE__ */ jsx(Button, { className: "flex-1 rounded-full", asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: route("register"), children: [
            /* @__PURE__ */ jsx(UserPlus, { className: "mr-2 h-4 w-4" }),
            "Get Started"
          ] }) })
        ] }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsx("footer", { className: "bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-1", children: [
          /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl", children: "H" }),
            /* @__PURE__ */ jsxs("span", { className: "text-xl font-bold tracking-tight", children: [
              "Hotel",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Book" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Find and book the perfect hotel for your next adventure. Best prices guaranteed." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-3", children: "Explore" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/explore", className: "hover:text-foreground transition-colors", children: "Hotels" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/about", className: "hover:text-foreground transition-colors", children: "About Us" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/contact", className: "hover:text-foreground transition-colors", children: "Contact" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-3", children: "Support" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/help", className: "hover:text-foreground transition-colors", children: "Help Center" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/privacy", className: "hover:text-foreground transition-colors", children: "Privacy Policy" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/terms", className: "hover:text-foreground transition-colors", children: "Terms of Service" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-3", children: "Account" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: route("login"), className: "hover:text-foreground transition-colors", children: "Sign In" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: route("register"), className: "hover:text-foreground transition-colors", children: "Create Account" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-xs text-muted-foreground", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " HotelBook. All rights reserved."
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Toaster, { position: "top-right", closeButton: true, richColors: true }),
    /* @__PURE__ */ jsx(BackToTop, {})
  ] });
}
export {
  WebLayout as W
};
