import WebLayout from "@/Layouts/WebLayout";
import { Head, Link } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    LifeBuoy,
    Sparkles,
    CreditCard,
    CalendarCheck,
    UserCircle,
    Hotel,
    ShieldCheck,
    Headphones,
    Mail,
    MessageCircle,
    ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = [
    {
        icon: CalendarCheck,
        title: "Bookings",
        desc: "Reservations, changes & cancellations",
    },
    {
        icon: CreditCard,
        title: "Payments",
        desc: "Methods, refunds & invoicing",
    },
    {
        icon: UserCircle,
        title: "Account",
        desc: "Profile, password & preferences",
    },
    {
        icon: Hotel,
        title: "Hotels & Rooms",
        desc: "Amenities, photos & availability",
    },
    {
        icon: ShieldCheck,
        title: "Safety",
        desc: "Trust, verification & security",
    },
    {
        icon: Headphones,
        title: "Support",
        desc: "Contact channels & response times",
    },
];

const faqs = [
    {
        q: "How do I book a hotel?",
        a: "Browse or search for hotels on the Explore page, pick your dates and room, then follow the checkout flow. You'll receive an instant confirmation email once payment is processed.",
    },
    {
        q: "Can I cancel or change a reservation?",
        a: "Yes — open My Bookings, select the reservation and choose Cancel or Modify. Cancellation fees depend on the property's policy shown at booking time.",
    },
    {
        q: "When will I be charged?",
        a: "Most stays are charged at the time of booking. Some properties offer pay-at-hotel or partial deposits — the exact terms appear on the room's booking panel.",
    },
    {
        q: "Do you offer a best-price guarantee?",
        a: "Yes. If you find the exact same room at a lower public rate within 24 hours of booking, contact support and we'll refund the difference.",
    },
    {
        q: "How do I contact a hotel directly?",
        a: "Each hotel page lists its address, phone and email under the Contact tab. You can also message the property through your booking detail page.",
    },
    {
        q: "Is my payment information secure?",
        a: "All transactions use TLS encryption and PCI-DSS compliant payment processors. We never store raw card numbers on our servers.",
    },
];

function FAQItem({ q, a, idx }) {
    const [open, setOpen] = useState(idx === 0);
    return (
        <button
            onClick={() => setOpen(!open)}
            className={cn(
                "w-full text-left rounded-2xl border transition-all duration-300 ease-out-expo",
                open
                    ? "border-foreground/15 bg-background shadow-sm"
                    : "border-foreground/10 bg-muted/30 hover:border-foreground/20 hover:bg-muted/50",
            )}
        >
            <div className="flex items-center justify-between gap-4 px-5 py-4">
                <span className="font-semibold text-[15px]">{q}</span>
                <ChevronDown
                    className={cn(
                        "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out-expo",
                        open && "rotate-180 text-foreground",
                    )}
                />
            </div>
            <div
                className={cn(
                    "grid transition-all duration-300 ease-out-expo",
                    open
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                )}
            >
                <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {a}
                    </p>
                </div>
            </div>
        </button>
    );
}

export default function Help() {
    return (
        <WebLayout>
            <Head title="Help Center" />

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
                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-12 md:pb-16 text-center">
                    <Badge
                        variant="outline"
                        className="glass border-foreground/10 pl-1.5 pr-3 py-1 text-[11px] animate-fade-up"
                    >
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-primary">
                            <LifeBuoy className="h-2.5 w-2.5 text-white" />
                        </span>
                        <span className="uppercase tracking-[0.18em] font-semibold text-foreground/80">
                            Help Center
                        </span>
                    </Badge>
                    <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05] animate-fade-up [animation-delay:80ms]">
                        How can we{" "}
                        <span className="italic font-serif font-medium text-gradient-primary">
                            help
                        </span>{" "}
                        you?
                    </h1>
                    <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl mx-auto animate-fade-up [animation-delay:160ms]">
                        Answers, guides and quick tips for everything from
                        booking your stay to managing your account.
                    </p>
                </div>
            </section>

            {/* Categories */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 pb-16 space-y-16">
                <section className="animate-fade-up">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((cat, idx) => {
                            const Icon = cat.icon;
                            return (
                                <Card
                                    key={cat.title}
                                    variant="elevated"
                                    interactive
                                    className="group animate-fade-up"
                                    style={{
                                        animationDelay: `${idx * 60}ms`,
                                    }}
                                >
                                    <CardContent className="p-5">
                                        <div className="flex items-start gap-4">
                                            <div className="h-11 w-11 rounded-2xl bg-gradient-primary-soft flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 ease-out-expo">
                                                <Icon className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-semibold tracking-tight">
                                                    {cat.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {cat.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </section>

                {/* FAQ */}
                <section>
                    <div className="flex items-baseline justify-between mb-6">
                        <div>
                            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-primary">
                                <Sparkles className="h-3.5 w-3.5" />
                                Frequently asked
                            </div>
                            <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">
                                The answers, up front.
                            </h2>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {faqs.map((f, idx) => (
                            <FAQItem key={f.q} {...f} idx={idx} />
                        ))}
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="relative overflow-hidden rounded-3xl border border-foreground/10">
                    <div className="absolute inset-0 bg-gradient-primary-soft" />
                    <div className="absolute inset-0 noise" />
                    <div className="relative px-6 md:px-10 py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="max-w-xl">
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                                Still need a hand?
                            </h3>
                            <p className="mt-2 text-muted-foreground">
                                Our support team replies within a few hours,
                                every day of the week.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Button
                                variant="gradient"
                                shape="pill"
                                size="lg"
                                asChild
                            >
                                <Link href="/contact">
                                    <Mail className="h-4 w-4" /> Contact us
                                </Link>
                            </Button>
                            <Button
                                variant="glass"
                                shape="pill"
                                size="lg"
                                asChild
                            >
                                <a href="mailto:support@hotelbook.com">
                                    <MessageCircle className="h-4 w-4" />{" "}
                                    support@hotelbook.com
                                </a>
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </WebLayout>
    );
}
