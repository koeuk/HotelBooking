import { jsxs, jsx } from "react/jsx-runtime";
import { W as WebLayout } from "./WebLayout-Dc8gJj4l.js";
import { Head, Link } from "@inertiajs/react";
import { C as Card, c as CardContent } from "./card-BY9Lq84_.js";
import { B as Button } from "./button-Dm9784FB.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { Award, Hotel, Shield, Heart, Users, Zap, CreditCard, MapPin, Headphones, ArrowRight, Globe, CheckCircle, Star } from "lucide-react";
import "./BackToTop-Cf3OnJBv.js";
import "react";
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
const stats = [
  { value: "500+", label: "Hotels Worldwide" },
  { value: "50K+", label: "Happy users" },
  { value: "120+", label: "Cities Covered" },
  { value: "4.8", label: "Average Rating" }
];
const features = [
  {
    icon: Hotel,
    title: "Quality Hotels",
    desc: "Every property is handpicked and vetted for quality, comfort, and cleanliness."
  },
  {
    icon: Shield,
    title: "Secure Booking",
    desc: "Your personal data and payment information are always protected with encryption."
  },
  {
    icon: Heart,
    title: "Best Price Guarantee",
    desc: "We guarantee the lowest prices. Found it cheaper? We'll match it."
  },
  {
    icon: Users,
    title: "24/7 Support",
    desc: "Our dedicated support team is available around the clock to assist you."
  },
  {
    icon: Zap,
    title: "Instant Confirmation",
    desc: "Get immediate booking confirmation with real-time availability updates."
  },
  {
    icon: CreditCard,
    title: "Flexible Payment",
    desc: "Pay with credit card, PayPal, or cash. Multiple currencies supported."
  },
  {
    icon: MapPin,
    title: "Location Maps",
    desc: "Interactive maps help you find the perfect hotel in your desired location."
  },
  {
    icon: Headphones,
    title: "Concierge Service",
    desc: "Need restaurant reservations or local tips? Our concierge team helps."
  }
];
const partners = [
  { name: "Marriott", category: "Luxury Hotels" },
  { name: "Hilton", category: "Global Chain" },
  { name: "Booking.com", category: "Platform Partner" },
  { name: "Airbnb", category: "Alternative Stays" },
  { name: "Expedia", category: "Travel Partner" },
  { name: "TripAdvisor", category: "Review Partner" }
];
const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Founder",
    desc: "15+ years in hospitality technology"
  },
  {
    name: "Marcus Johnson",
    role: "CTO",
    desc: "Former lead engineer at Booking.com"
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Operations",
    desc: "Manages global hotel partnerships"
  },
  {
    name: "David Kim",
    role: "Head of Design",
    desc: "Crafting beautiful travel experiences"
  }
];
const timeline = [
  {
    year: "2020",
    title: "Founded",
    desc: "HotelBook was born with a simple idea: make hotel booking effortless."
  },
  {
    year: "2021",
    title: "1,000 Hotels",
    desc: "Reached our first milestone of 1,000 partner hotels across 30 cities."
  },
  {
    year: "2023",
    title: "Global Expansion",
    desc: "Expanded to 120+ cities with AI-powered recommendations."
  },
  {
    year: "2026",
    title: "Today",
    desc: "Serving 50,000+ travelers with the best hotel deals worldwide."
  }
];
function About() {
  return /* @__PURE__ */ jsxs(WebLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "About Us" }),
    /* @__PURE__ */ jsx("section", { className: "relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 dark:from-primary/10 dark:via-zinc-950 dark:to-primary/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center", children: [
      /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "mb-4", children: [
        /* @__PURE__ */ jsx(Award, { className: "h-3 w-3 mr-1" }),
        " Trusted by 50,000+ travelers"
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-extrabold tracking-tight", children: [
        "About ",
        /* @__PURE__ */ jsx("span", { className: "text-primary", children: "HotelBook" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto", children: "We're on a mission to make hotel booking simple, transparent, and delightful for travelers worldwide. Every journey deserves the perfect place to stay." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: stats.map((stat, i) => /* @__PURE__ */ jsx(
      Card,
      {
        className: "border-none shadow-sm text-center",
        children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6 pb-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-extrabold text-primary", children: stat.value }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: stat.label })
        ] })
      },
      i
    )) }) }),
    /* @__PURE__ */ jsxs("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Why Choose HotelBook?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground max-w-xl mx-auto", children: "We go beyond just booking. Here's what makes us different." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: features.map((item, i) => /* @__PURE__ */ jsx(
        Card,
        {
          className: "border-none shadow-sm group hover:shadow-md transition-all",
          children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-8 pb-6 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "inline-flex p-3 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsx(item.icon, { className: "h-6 w-6 text-primary" }) }),
            /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-2", children: item.desc })
          ] })
        },
        i
      )) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-zinc-50 dark:bg-zinc-900/50 py-16", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Our Story" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-4 text-muted-foreground", children: [
          /* @__PURE__ */ jsx("p", { children: "Founded with a passion for travel, HotelBook was created to solve a simple problem: finding and booking the perfect hotel shouldn't be complicated or stressful." }),
          /* @__PURE__ */ jsx("p", { children: "We started as a small team of travel enthusiasts who were frustrated with the existing booking experience. Hidden fees, confusing interfaces, and unreliable reviews made planning trips a headache. We knew there had to be a better way." }),
          /* @__PURE__ */ jsx("p", { children: "Today, HotelBook connects travelers with exceptional accommodations in over 120 cities worldwide. Our platform features transparent pricing, verified user reviews, and real-time availability — everything you need to make the best choice for your next trip." }),
          /* @__PURE__ */ jsx("p", { children: "Whether you're planning a business trip, a family vacation, or a solo adventure, HotelBook is here to help you find your ideal stay at the best possible price." })
        ] }),
        /* @__PURE__ */ jsx(Button, { className: "mt-6 rounded-xl", asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: "/explore", children: [
          "Explore Hotels",
          " ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: timeline.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-primary", children: item.year }) }),
          i < timeline.length - 1 && /* @__PURE__ */ jsx("div", { className: "w-px h-full bg-primary/20 mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pb-6", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: item.desc })
        ] })
      ] }, i)) })
    ] }) }) }),
    /* @__PURE__ */ jsxs("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Meet Our Team" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: "The people behind your perfect stay." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: team.map((person, i) => /* @__PURE__ */ jsx(
        Card,
        {
          className: "border-none shadow-sm text-center group hover:shadow-md transition-all",
          children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-8 pb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-primary", children: person.name.split(" ").map((n) => n[0]).join("") }) }),
            /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: person.name }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-primary font-medium", children: person.role }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-2", children: person.desc })
          ] })
        },
        i
      )) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-zinc-50 dark:bg-zinc-900/50 py-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Our Partners" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: "Trusted by leading brands in the travel industry." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4", children: partners.map((partner, i) => /* @__PURE__ */ jsx(
        Card,
        {
          className: "border-none shadow-sm group hover:shadow-md transition-all",
          children: /* @__PURE__ */ jsxs(CardContent, { className: "py-6 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsx(Globe, { className: "h-6 w-6 text-primary" }) }),
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm", children: partner.name }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground mt-1", children: partner.category })
          ] })
        },
        i
      )) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-12", children: /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Our Values" }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
        {
          icon: CheckCircle,
          title: "Transparency",
          desc: "No hidden fees, no surprises. What you see is what you pay. We believe in honest pricing and clear communication with every booking."
        },
        {
          icon: Star,
          title: "Excellence",
          desc: "We hold our partner hotels to the highest standards. Every property is verified, reviewed, and continuously monitored for quality."
        },
        {
          icon: Heart,
          title: "Customer First",
          desc: "Your satisfaction is our priority. From browsing to checkout to check-in, we design every step around your needs and comfort."
        }
      ].map((value, i) => /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex p-4 rounded-2xl bg-primary/10 mb-4", children: /* @__PURE__ */ jsx(value.icon, { className: "h-8 w-8 text-primary" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: value.title }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-3 leading-relaxed", children: value.desc })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16", children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-gradient-primary p-8 md:p-14 text-center text-primary-foreground", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 noise opacity-20" }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold", children: "Ready to start your journey?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-primary-foreground/85 max-w-xl mx-auto", children: "Join thousands of travelers who trust HotelBook for unforgettable stays worldwide." }),
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
  About as default
};
