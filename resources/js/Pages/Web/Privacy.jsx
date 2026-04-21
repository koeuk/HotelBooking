import WebLayout from "@/Layouts/WebLayout";
import { Head, Link } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ShieldCheck,
    Database,
    Cookie,
    Share2,
    Lock,
    UserCog,
    Mail,
    FileText,
} from "lucide-react";

const sections = [
    {
        id: "collection",
        icon: Database,
        title: "Information we collect",
        body: [
            "We collect information you provide directly — your name, email, phone number, payment details, and any preferences you share during booking.",
            "We also collect technical data automatically, such as your device type, browser, IP address and interactions with our platform, to keep the service secure and improve it over time.",
        ],
    },
    {
        id: "use",
        icon: UserCog,
        title: "How we use your data",
        body: [
            "Your information is used to process bookings, send confirmations and receipts, personalize recommendations, prevent fraud, and comply with legal obligations.",
            "We do not sell your personal data. Marketing emails are only sent when you opt in, and you can unsubscribe at any time from the footer of any email.",
        ],
    },
    {
        id: "cookies",
        icon: Cookie,
        title: "Cookies & similar tech",
        body: [
            "We use essential cookies to keep you signed in and remember your preferences, and analytics cookies to understand how the site is used.",
            "You can manage cookies in your browser settings. Disabling essential cookies may prevent parts of the site from working correctly.",
        ],
    },
    {
        id: "sharing",
        icon: Share2,
        title: "Who we share with",
        body: [
            "We share the minimum information required with the hotels you book, payment processors, and infrastructure partners (hosting, email, analytics).",
            "All partners are bound by confidentiality agreements and are only allowed to use your data for the specific service we contract them for.",
        ],
    },
    {
        id: "security",
        icon: Lock,
        title: "Security",
        body: [
            "All traffic is encrypted with TLS. Payment information is handled by PCI-DSS compliant processors and never stored raw on our servers.",
            "Access to personal data inside the company is limited to staff who need it to perform their role, and is logged and reviewed regularly.",
        ],
    },
    {
        id: "rights",
        icon: ShieldCheck,
        title: "Your rights",
        body: [
            "Depending on where you live, you may have the right to access, correct, export or delete your personal data, and to object to or restrict certain processing.",
            "To exercise any of these rights, contact us at privacy@hotelbook.com. We'll reply within 30 days.",
        ],
    },
];

export default function Privacy() {
    return (
        <WebLayout>
            <Head title="Privacy Policy" />

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
                            <ShieldCheck className="h-2.5 w-2.5 text-white" />
                        </span>
                        <span className="uppercase tracking-[0.18em] font-semibold text-foreground/80">
                            Privacy Policy
                        </span>
                    </Badge>
                    <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05] animate-fade-up [animation-delay:80ms]">
                        Your{" "}
                        <span className="italic font-serif font-medium text-gradient-primary">
                            privacy
                        </span>
                        , in plain language.
                    </h1>
                    <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl mx-auto animate-fade-up [animation-delay:160ms]">
                        What we collect, why we collect it, and the control you
                        have over it.
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
                            HotelBook ("we", "our", "us") respects your
                            privacy. This policy explains how we handle the
                            personal information you share when you use our
                            website, book a stay, or contact our support team.
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
                                        Questions about your data?
                                    </h3>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Write to our privacy team and we'll
                                        reply within 30 days.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <Button
                                        variant="gradient"
                                        shape="pill"
                                        asChild
                                    >
                                        <a href="mailto:privacy@hotelbook.com">
                                            <Mail className="h-4 w-4" />{" "}
                                            privacy@hotelbook.com
                                        </a>
                                    </Button>
                                    <Button
                                        variant="glass"
                                        shape="pill"
                                        asChild
                                    >
                                        <Link href="/terms">
                                            <FileText className="h-4 w-4" />{" "}
                                            Terms of Service
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
