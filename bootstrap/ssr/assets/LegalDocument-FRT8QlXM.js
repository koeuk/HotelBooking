import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { W as WebLayout } from "./WebLayout-Dc8gJj4l.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { c as cn, B as Button } from "./button-Dm9784FB.js";
import { Mail } from "lucide-react";
function LegalDocument({
  title,
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  headline,
  subtitle,
  lastUpdated,
  intro,
  sections,
  cta
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0
      }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);
  return /* @__PURE__ */ jsxs(WebLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title }),
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
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-20 md:pb-28 text-center", children: [
        /* @__PURE__ */ jsxs(
          Badge,
          {
            variant: "outline",
            className: "glass border-foreground/10 pl-1.5 pr-3 py-1 text-[11px] animate-fade-up",
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-primary", children: /* @__PURE__ */ jsx(EyebrowIcon, { className: "h-2.5 w-2.5 text-white" }) }),
              /* @__PURE__ */ jsx("span", { className: "uppercase tracking-[0.18em] font-semibold text-foreground/80", children: eyebrow })
            ]
          }
        ),
        /* @__PURE__ */ jsx("h1", { className: "mt-6 text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05] animate-fade-up [animation-delay:80ms]", children: headline }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-base md:text-lg text-muted-foreground max-w-xl mx-auto animate-fade-up [animation-delay:160ms]", children: subtitle }),
        lastUpdated && /* @__PURE__ */ jsxs("p", { className: "mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground/80 animate-fade-up [animation-delay:220ms]", children: [
          "Last updated · ",
          lastUpdated
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-16 md:-mt-20", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 lg:gap-10", children: [
      /* @__PURE__ */ jsx("aside", { className: "hidden lg:block", children: /* @__PURE__ */ jsx("div", { className: "sticky top-24", children: /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-foreground/10 bg-background/80 backdrop-blur-xl p-4 shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground mb-3 px-1", children: "On this page" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-0.5", children: sections.map((s) => {
          const active = activeId === s.id;
          return /* @__PURE__ */ jsx("li", { className: "relative", children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: `#${s.id}`,
              className: cn(
                "relative block pl-4 pr-2 py-1.5 rounded-lg text-sm transition-all duration-200",
                active ? "text-foreground font-semibold bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              ),
              children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: cn(
                      "absolute left-1 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full transition-all duration-300 ease-out-expo",
                      active ? "bg-gradient-primary opacity-100" : "bg-foreground/20 opacity-0"
                    )
                  }
                ),
                s.title
              ]
            }
          ) }, s.id);
        }) })
      ] }) }) }),
      /* @__PURE__ */ jsxs("article", { className: "relative rounded-3xl border border-foreground/10 bg-background shadow-[0_24px_60px_-24px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] p-6 sm:p-10 md:p-14 animate-fade-up [animation-delay:200ms]", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": true,
            className: "absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-foreground/80 leading-relaxed font-light first-letter:text-4xl first-letter:font-serif first-letter:font-semibold first-letter:text-primary first-letter:mr-1 first-letter:float-left first-letter:leading-[0.9] first-letter:mt-1", children: intro }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 space-y-12", children: sections.map((s, idx) => {
          const Icon = s.icon;
          return /* @__PURE__ */ jsxs(
            "section",
            {
              id: s.id,
              className: "scroll-mt-24 group/sec",
              children: [
                idx > 0 && /* @__PURE__ */ jsxs(
                  "div",
                  {
                    "aria-hidden": true,
                    className: "mb-12 flex items-center gap-3",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-foreground/5" }),
                      /* @__PURE__ */ jsx("div", { className: "h-1 w-1 rounded-full bg-foreground/15" }),
                      /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-foreground/5" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 blur-md transition-opacity duration-500 group-hover/sec:opacity-30" }),
                    /* @__PURE__ */ jsx("div", { className: "relative h-10 w-10 rounded-2xl bg-gradient-primary-soft flex items-center justify-center", children: /* @__PURE__ */ jsx(Icon, { className: "h-4.5 w-4.5 text-primary" }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-3", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-semibold text-muted-foreground/60 tabular-nums", children: String(idx + 1).padStart(
                      2,
                      "0"
                    ) }),
                    /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold tracking-tight", children: s.title })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "space-y-4 text-[15px] md:text-base text-foreground/70 leading-[1.75] pl-[52px]", children: s.body.map((p, i) => /* @__PURE__ */ jsx("p", { children: p }, i)) })
              ]
            },
            s.id
          );
        }) }),
        cta && /* @__PURE__ */ jsxs("div", { className: "mt-14 relative overflow-hidden rounded-2xl border border-foreground/10", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-primary-soft" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 noise" }),
          /* @__PURE__ */ jsxs("div", { className: "relative px-6 md:px-8 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg md:text-xl font-bold tracking-tight", children: cta.title }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: cta.description })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "gradient",
                  shape: "pill",
                  asChild: true,
                  children: /* @__PURE__ */ jsxs("a", { href: `mailto:${cta.email}`, children: [
                    /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }),
                    cta.email
                  ] })
                }
              ),
              cta.secondary && /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "glass",
                  shape: "pill",
                  asChild: true,
                  children: /* @__PURE__ */ jsxs(Link, { href: cta.secondary.href, children: [
                    /* @__PURE__ */ jsx(cta.secondary.icon, { className: "h-4 w-4" }),
                    cta.secondary.label
                  ] })
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  LegalDocument as L
};
