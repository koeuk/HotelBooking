import WebLayout from "@/Layouts/WebLayout";
import { Head, Link } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    FileText,
    Scale,
    UserCheck,
    CreditCard,
    CalendarX,
    AlertTriangle,
    Gavel,
    Mail,
    ShieldCheck,
} from "lucide-react";

const sections = [
    {
        id: "acceptance",
        icon: UserCheck,
        title: "Acceptance of terms",
        body: [
            "By creating an account, browsing, or booking a stay through HotelBook, you agree to these Terms of Service and our Privacy Policy.",
            "If you are using the service on behalf of an organization, you confirm you have authority to bind that organization to these terms.",
        ],
    },
    {
        id: "accounts",
        icon: ShieldCheck,
        title: "Accounts & eligibility",
        body: [
            "You must be at least 18 years old to create an account. You are responsible for keeping your login credentials confidential and for all activity under your account.",
            "We may suspend or terminate accounts that violate these terms, abuse our services, or attempt to disrupt the platform for other users.",
        ],
    },
    {
        id: "bookings",
        icon: CalendarX,
        title: "Bookings & cancellations",
        body: [
            "Each booking is subject to the rate, availability and cancellation policy of the specific property at the time of confirmation. These details are shown before you check out and repeated on your confirmation email.",
            "Changes and cancellations follow the property's published policy. Refunds, where applicable, are issued back to the original payment method within 7 to 14 business days.",
        ],
    },
    {
        id: "payments",
        icon: CreditCard,
        title: "Payments & pricing",
        body: [
            "Prices are shown in the currency selected at checkout and include applicable taxes unless stated otherwise. Payment is charged at the time of booking unless a pay-at-hotel option is selected.",
            "We reserve the right to correct obvious pricing errors. If a booking is affected, we'll contact you to confirm at the correct price or cancel with a full refund.",
        ],
    },
    {
        id: "conduct",
        icon: AlertTriangle,
        title: "User conduct",
        body: [
            "You agree not to misuse the service — including posting false reviews, scraping content, attempting to access other users' accounts, or bypassing security measures.",
            "Abusive, fraudulent or illegal activity will be reported to relevant authorities and may result in immediate account termination.",
        ],
    },
    {
        id: "liability",
        icon: Scale,
        title: "Liability",
        body: [
            "HotelBook acts as an intermediary between guests and hotels. The underlying stay is provided by the hotel and governed by their own terms. We are not liable for issues arising from a hotel's service, facilities or cancellations outside our control.",
            "To the maximum extent permitted by law, our total liability for any claim relating to the service is limited to the amount you paid for the booking giving rise to the claim.",
        ],
    },
    {
        id: "law",
        icon: Gavel,
        title: "Governing law",
        body: [
            "These terms are governed by the laws of the jurisdiction in which HotelBook is incorporated, without regard to conflict-of-law principles.",
            "Any disputes not resolved informally will be brought before the competent courts of that jurisdiction.",
        ],
    },
];

export default function Terms() {
    return (
        <WebLayout>
            <Head title="Terms of Service" />

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
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-12 md:pb-16 text-center">
                    <Badge
                        variant="outline"
                        className="glass border-foreground/10 pl-1.5 pr-3 py-1 text-[11px] animate-fade-up"
                    >
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-primary">
                            <FileText className="h-2.5 w-2.5 text-white" />
                        </span>
                        <span className="uppercase tracking-[0.18em] font-semibold text-foreground/80">
                            Terms of Service
                        </span>
                    </Badge>
                    <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05] animate-fade-up [animation-delay:80ms]">
                        The{" "}
                        <span className="italic font-serif font-medium text-gradient-primary">
                            fine print
                        </span>
                        , made readable.
                    </h1>
                    <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl mx-auto animate-fade-up [animation-delay:160ms]">
                        The rules of the road when you book, browse, or stay
                        with HotelBook.
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground/80 animate-fade-up [animation-delay:220ms]">
                        Last updated · January 2026
                    </p>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
                    {/* Sticky TOC */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24">
                            <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-3">
                                On this page
                            </div>
                            <ul className="space-y-1 text-sm">
                                {sections.map((s) => (
                                    <li key={s.id}>
                                        <a
                                            href={`#${s.id}`}
                                            className="block px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                                        >
                                            {s.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Body */}
                    <article className="space-y-10 animate-fade-up [animation-delay:200ms]">
                        <p className="text-muted-foreground leading-relaxed">
                            Welcome to HotelBook. These Terms of Service
                            ("Terms") govern your use of our website,
                            applications and booking services. Please read them
                            carefully — they are a binding agreement between
                            you and us.
                        </p>
                        {sections.map((s) => {
                            const Icon = s.icon;
                            return (
                                <section
                                    key={s.id}
                                    id={s.id}
                                    className="scroll-mt-24"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="h-9 w-9 rounded-xl bg-gradient-primary-soft flex items-center justify-center">
                                            <Icon className="h-4 w-4 text-primary" />
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                                            {s.title}
                                        </h2>
                                    </div>
                                    <div className="space-y-3 text-[15px] text-muted-foreground leading-relaxed pl-12">
                                        {s.body.map((p, i) => (
                                            <p key={i}>{p}</p>
                                        ))}
                                    </div>
                                </section>
                            );
                        })}

                        <section className="relative overflow-hidden rounded-3xl border border-foreground/10 mt-12">
                            <div className="absolute inset-0 bg-gradient-primary-soft" />
                            <div className="absolute inset-0 noise" />
                            <div className="relative px-6 md:px-8 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold tracking-tight">
                                        Questions about these terms?
                                    </h3>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Our legal team is happy to clarify
                                        anything.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <Button
                                        variant="gradient"
                                        shape="pill"
                                        asChild
                                    >
                                        <a href="mailto:legal@hotelbook.com">
                                            <Mail className="h-4 w-4" />{" "}
                                            legal@hotelbook.com
                                        </a>
                                    </Button>
                                    <Button
                                        variant="glass"
                                        shape="pill"
                                        asChild
                                    >
                                        <Link href="/privacy">
                                            <ShieldCheck className="h-4 w-4" />{" "}
                                            Privacy Policy
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </section>
                    </article>
                </div>
            </div>
        </WebLayout>
    );
}
