import { jsxs, jsx } from "react/jsx-runtime";
import { W as WebLayout } from "./WebLayout-Dc8gJj4l.js";
import { Head, Link } from "@inertiajs/react";
import { B as Badge } from "./badge-qMfuib1i.js";
import { B as Button, c as cn } from "./button-Dm9784FB.js";
import { C as Card, c as CardContent } from "./card-BY9Lq84_.js";
import { LifeBuoy, CalendarCheck, CreditCard, UserCircle, Hotel, ShieldCheck, Headphones, Sparkles, Mail, MessageCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import "./BackToTop-Cf3OnJBv.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "sonner";
import "./ThemeToggle-DzFfzEoP.js";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
const categories = [
  {
    icon: CalendarCheck,
    title: "Bookings",
    desc: "Reservations, changes & cancellations"
  },
  {
    icon: CreditCard,
    title: "Payments",
    desc: "Methods, refunds & invoicing"
  },
  {
    icon: UserCircle,
    title: "Account",
    desc: "Profile, password & preferences"
  },
  {
    icon: Hotel,
    title: "Hotels & Rooms",
    desc: "Amenities, photos & availability"
  },
  {
    icon: ShieldCheck,
    title: "Safety",
    desc: "Trust, verification & security"
  },
  {
    icon: Headphones,
    title: "Support",
    desc: "Contact channels & response times"
  }
];
const faqs = [
  {
    q: "How do I book a hotel?",
    a: "Browse or search for hotels on the Explore page, pick your dates and room, then follow the checkout flow. You'll receive an instant confirmation email once payment is processed."
  },
  {
    q: "Can I cancel or change a reservation?",
    a: "Yes — open My Bookings, select the reservation and choose Cancel or Modify. Cancellation fees depend on the property's policy shown at booking time."
  },
  {
    q: "When will I be charged?",
    a: "Most stays are charged at the time of booking. Some properties offer pay-at-hotel or partial deposits — the exact terms appear on the room's booking panel."
  },
  {
    q: "Do you offer a best-price guarantee?",
    a: "Yes. If you find the exact same room at a lower public rate within 24 hours of booking, contact support and we'll refund the difference."
  },
  {
    q: "How do I contact a hotel directly?",
    a: "Each hotel page lists its address, phone and email under the Contact tab. You can also message the property through your booking detail page."
  },
  {
    q: "Is my payment information secure?",
    a: "All transactions use TLS encryption and PCI-DSS compliant payment processors. We never store raw card numbers on our servers."
  }
];
function FAQItem({ q, a, idx }) {
  const [open, setOpen] = useState(idx === 0);
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: () => setOpen(!open),
      className: cn(
        "w-full text-left rounded-2xl border transition-all duration-300 ease-out-expo",
        open ? "border-foreground/15 bg-background shadow-sm" : "border-foreground/10 bg-muted/30 hover:border-foreground/20 hover:bg-muted/50"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 px-5 py-4", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-[15px]", children: q }),
          /* @__PURE__ */ jsx(
            ChevronDown,
            {
              className: cn(
                "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out-expo",
                open && "rotate-180 text-foreground"
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "grid transition-all duration-300 ease-out-expo",
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            ),
            children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx("p", { className: "px-5 pb-5 text-sm text-muted-foreground leading-relaxed", children: a }) })
          }
        )
      ]
    }
  );
}
function Help() {
  return /* @__PURE__ */ jsxs(WebLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Help Center" }),
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden isolate", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-mesh" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          "aria-hidden": true,
          className: "pointer-events-none absolute -top-40 -right-24 h-[480px] w-[480px] rounded-full bg-gradient-primary opacity-20 blur-3xl"
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          "aria-hidden": true,
          className: "pointer-events-none absolute -bottom-48 -left-20 h-[440px] w-[440px] rounded-full bg-primary/25 blur-3xl"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 noise" }),
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-12 md:pb-16 text-center", children: [
        /* @__PURE__ */ jsxs(
          Badge,
          {
            variant: "outline",
            className: "glass border-foreground/10 pl-1.5 pr-3 py-1 text-[11px] animate-fade-up",
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-primary", children: /* @__PURE__ */ jsx(LifeBuoy, { className: "h-2.5 w-2.5 text-white" }) }),
              /* @__PURE__ */ jsx("span", { className: "uppercase tracking-[0.18em] font-semibold text-foreground/80", children: "Help Center" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("h1", { className: "mt-6 text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05] animate-fade-up [animation-delay:80ms]", children: [
          "How can we",
          " ",
          /* @__PURE__ */ jsx("span", { className: "italic font-serif font-medium text-gradient-primary", children: "help" }),
          " ",
          "you?"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-base md:text-lg text-muted-foreground max-w-xl mx-auto animate-fade-up [animation-delay:160ms]", children: "Answers, guides and quick tips for everything from booking your stay to managing your account." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 pb-16 space-y-16", children: [
      /* @__PURE__ */ jsx("section", { className: "animate-fade-up", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: categories.map((cat, idx) => {
        const Icon = cat.icon;
        return /* @__PURE__ */ jsx(
          Card,
          {
            variant: "elevated",
            interactive: true,
            className: "group animate-fade-up",
            style: {
              animationDelay: `${idx * 60}ms`
            },
            children: /* @__PURE__ */ jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "h-11 w-11 rounded-2xl bg-gradient-primary-soft flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 ease-out-expo", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-primary" }) }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold tracking-tight", children: cat.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: cat.desc })
              ] })
            ] }) })
          },
          cat.title
        );
      }) }) }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-baseline justify-between mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-primary", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }),
            "Frequently asked"
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "mt-2 text-2xl md:text-3xl font-bold tracking-tight", children: "The answers, up front." })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: faqs.map((f, idx) => /* @__PURE__ */ jsx(FAQItem, { ...f, idx }, f.q)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden rounded-3xl border border-foreground/10", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-primary-soft" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 noise" }),
        /* @__PURE__ */ jsxs("div", { className: "relative px-6 md:px-10 py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "max-w-xl", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-bold tracking-tight", children: "Still need a hand?" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: "Our support team replies within a few hours, every day of the week." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "gradient",
                shape: "pill",
                size: "lg",
                asChild: true,
                children: /* @__PURE__ */ jsxs(Link, { href: "/contact", children: [
                  /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }),
                  " Contact us"
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "glass",
                shape: "pill",
                size: "lg",
                asChild: true,
                children: /* @__PURE__ */ jsxs("a", { href: "mailto:support@hotelbook.com", children: [
                  /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }),
                  " ",
                  "support@hotelbook.com"
                ] })
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Help as default
};
