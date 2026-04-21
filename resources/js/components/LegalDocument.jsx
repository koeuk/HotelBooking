import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import WebLayout from "@/Layouts/WebLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LegalDocument({
    title,
    eyebrow,
    eyebrowIcon: EyebrowIcon,
    headline,
    subtitle,
    lastUpdated,
    intro,
    sections,
    cta,
}) {
    const [activeId, setActiveId] = useState(sections[0]?.id);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top - b.boundingClientRect.top,
                    );
                if (visible[0]) setActiveId(visible[0].target.id);
            },
            {
                rootMargin: "-20% 0px -65% 0px",
                threshold: 0,
            },
        );
        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [sections]);

    return (
        <WebLayout>
            <Head title={title} />

            {/* Hero */}
            <section className="relative overflow-hidden isolate">
                <div className="absolute inset-0 bg-gradient-mesh" />
                <div
                    aria-hidden
                    className="pointer-events-none absolute -top-40 -right-24 h-[480px] w-[480px] rounded-full bg-gradient-primary opacity-20 blur-3xl"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-48 -left-20 h-[440px] w-[440px] rounded-full bg-primary/25 blur-3xl"
                />
                <div className="absolute inset-0 noise" />
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-20 md:pb-28 text-center">
                    <Badge
                        variant="outline"
                        className="glass border-foreground/10 pl-1.5 pr-3 py-1 text-[11px] animate-fade-up"
                    >
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-primary">
                            <EyebrowIcon className="h-2.5 w-2.5 text-white" />
                        </span>
                        <span className="uppercase tracking-[0.18em] font-semibold text-foreground/80">
                            {eyebrow}
                        </span>
                    </Badge>
                    <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05] animate-fade-up [animation-delay:80ms]">
                        {headline}
                    </h1>
                    <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl mx-auto animate-fade-up [animation-delay:160ms]">
                        {subtitle}
                    </p>
                    {lastUpdated && (
                        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground/80 animate-fade-up [animation-delay:220ms]">
                            Last updated · {lastUpdated}
                        </p>
                    )}
                </div>
            </section>

            {/* Content — floating paper */}
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-16 md:-mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 lg:gap-10">
                    {/* Sticky TOC */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24">
                            <div className="rounded-2xl border border-foreground/10 bg-background/80 backdrop-blur-xl p-4 shadow-sm">
                                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground mb-3 px-1">
                                    On this page
                                </div>
                                <ul className="space-y-0.5">
                                    {sections.map((s) => {
                                        const active = activeId === s.id;
                                        return (
                                            <li key={s.id} className="relative">
                                                <a
                                                    href={`#${s.id}`}
                                                    className={cn(
                                                        "relative block pl-4 pr-2 py-1.5 rounded-lg text-sm transition-all duration-200",
                                                        active
                                                            ? "text-foreground font-semibold bg-primary/5"
                                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                                                    )}
                                                >
                                                    <span
                                                        className={cn(
                                                            "absolute left-1 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full transition-all duration-300 ease-out-expo",
                                                            active
                                                                ? "bg-gradient-primary opacity-100"
                                                                : "bg-foreground/20 opacity-0",
                                                        )}
                                                    />
                                                    {s.title}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </aside>

                    {/* Paper */}
                    <article className="relative rounded-3xl border border-foreground/10 bg-background shadow-[0_24px_60px_-24px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] p-6 sm:p-10 md:p-14 animate-fade-up [animation-delay:200ms]">
                        {/* Decorative corner accent */}
                        <div
                            aria-hidden
                            className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                        />

                        {/* Lede */}
                        <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light first-letter:text-4xl first-letter:font-serif first-letter:font-semibold first-letter:text-primary first-letter:mr-1 first-letter:float-left first-letter:leading-[0.9] first-letter:mt-1">
                            {intro}
                        </p>

                        <div className="mt-10 space-y-12">
                            {sections.map((s, idx) => {
                                const Icon = s.icon;
                                return (
                                    <section
                                        key={s.id}
                                        id={s.id}
                                        className="scroll-mt-24 group/sec"
                                    >
                                        {idx > 0 && (
                                            <div
                                                aria-hidden
                                                className="mb-12 flex items-center gap-3"
                                            >
                                                <div className="h-px flex-1 bg-foreground/5" />
                                                <div className="h-1 w-1 rounded-full bg-foreground/15" />
                                                <div className="h-px flex-1 bg-foreground/5" />
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="relative">
                                                <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 blur-md transition-opacity duration-500 group-hover/sec:opacity-30" />
                                                <div className="relative h-10 w-10 rounded-2xl bg-gradient-primary-soft flex items-center justify-center">
                                                    <Icon className="h-4.5 w-4.5 text-primary" />
                                                </div>
                                            </div>
                                            <div className="flex items-baseline gap-3">
                                                <span className="text-[11px] font-mono font-semibold text-muted-foreground/60 tabular-nums">
                                                    {String(idx + 1).padStart(
                                                        2,
                                                        "0",
                                                    )}
                                                </span>
                                                <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                                                    {s.title}
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="space-y-4 text-[15px] md:text-base text-foreground/70 leading-[1.75] pl-[52px]">
                                            {s.body.map((p, i) => (
                                                <p key={i}>{p}</p>
                                            ))}
                                        </div>
                                    </section>
                                );
                            })}
                        </div>

                        {/* CTA */}
                        {cta && (
                            <div className="mt-14 relative overflow-hidden rounded-2xl border border-foreground/10">
                                <div className="absolute inset-0 bg-gradient-primary-soft" />
                                <div className="absolute inset-0 noise" />
                                <div className="relative px-6 md:px-8 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold tracking-tight">
                                            {cta.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {cta.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        <Button
                                            variant="gradient"
                                            shape="pill"
                                            asChild
                                        >
                                            <a href={`mailto:${cta.email}`}>
                                                <Mail className="h-4 w-4" />
                                                {cta.email}
                                            </a>
                                        </Button>
                                        {cta.secondary && (
                                            <Button
                                                variant="glass"
                                                shape="pill"
                                                asChild
                                            >
                                                <Link href={cta.secondary.href}>
                                                    <cta.secondary.icon className="h-4 w-4" />
                                                    {cta.secondary.label}
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </article>
                </div>
            </div>
        </WebLayout>
    );
}
