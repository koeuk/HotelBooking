import WebLayout from "@/Layouts/WebLayout";
import { Head, Link } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Hotel, Shield, Heart, Users, Globe, Award, Clock, Star,
    MapPin, CheckCircle, ArrowRight, Zap, Headphones, CreditCard,
} from "lucide-react";

const stats = [
    { value: "500+", label: "Hotels Worldwide" },
    { value: "50K+", label: "Happy Guests" },
    { value: "120+", label: "Cities Covered" },
    { value: "4.8", label: "Average Rating" },
];

const features = [
    { icon: Hotel, title: "Quality Hotels", desc: "Every property is handpicked and vetted for quality, comfort, and cleanliness." },
    { icon: Shield, title: "Secure Booking", desc: "Your personal data and payment information are always protected with encryption." },
    { icon: Heart, title: "Best Price Guarantee", desc: "We guarantee the lowest prices. Found it cheaper? We'll match it." },
    { icon: Users, title: "24/7 Support", desc: "Our dedicated support team is available around the clock to assist you." },
    { icon: Zap, title: "Instant Confirmation", desc: "Get immediate booking confirmation with real-time availability updates." },
    { icon: CreditCard, title: "Flexible Payment", desc: "Pay with credit card, PayPal, or cash. Multiple currencies supported." },
    { icon: MapPin, title: "Location Maps", desc: "Interactive maps help you find the perfect hotel in your desired location." },
    { icon: Headphones, title: "Concierge Service", desc: "Need restaurant reservations or local tips? Our concierge team helps." },
];

const partners = [
    { name: "Marriott", category: "Luxury Hotels" },
    { name: "Hilton", category: "Global Chain" },
    { name: "Booking.com", category: "Platform Partner" },
    { name: "Airbnb", category: "Alternative Stays" },
    { name: "Expedia", category: "Travel Partner" },
    { name: "TripAdvisor", category: "Review Partner" },
];

const team = [
    { name: "Sarah Chen", role: "CEO & Founder", desc: "15+ years in hospitality technology" },
    { name: "Marcus Johnson", role: "CTO", desc: "Former lead engineer at Booking.com" },
    { name: "Elena Rodriguez", role: "Head of Operations", desc: "Manages global hotel partnerships" },
    { name: "David Kim", role: "Head of Design", desc: "Crafting beautiful travel experiences" },
];

const timeline = [
    { year: "2020", title: "Founded", desc: "HotelBook was born with a simple idea: make hotel booking effortless." },
    { year: "2021", title: "1,000 Hotels", desc: "Reached our first milestone of 1,000 partner hotels across 30 cities." },
    { year: "2023", title: "Global Expansion", desc: "Expanded to 120+ cities with AI-powered recommendations." },
    { year: "2026", title: "Today", desc: "Serving 50,000+ travelers with the best hotel deals worldwide." },
];

export default function About() {
    return (
        <WebLayout>
            <Head title="About Us" />

            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 dark:from-primary/10 dark:via-zinc-950 dark:to-primary/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <Badge variant="secondary" className="mb-4">
                        <Award className="h-3 w-3 mr-1" /> Trusted by 50,000+ travelers
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        About <span className="text-primary">HotelBook</span>
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        We're on a mission to make hotel booking simple, transparent, and delightful for travelers worldwide.
                        Every journey deserves the perfect place to stay.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <Card key={i} className="border-none shadow-sm text-center">
                            <CardContent className="pt-6 pb-4">
                                <p className="text-3xl font-extrabold text-primary">{stat.value}</p>
                                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">Why Choose HotelBook?</h2>
                    <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
                        We go beyond just booking. Here's what makes us different.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((item, i) => (
                        <Card key={i} className="border-none shadow-sm group hover:shadow-md transition-all">
                            <CardContent className="pt-8 pb-6 text-center">
                                <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                                    <item.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Our Story */}
            <section className="bg-zinc-50 dark:bg-zinc-900/50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
                            <div className="mt-6 space-y-4 text-muted-foreground">
                                <p>
                                    Founded with a passion for travel, HotelBook was created to solve a simple problem:
                                    finding and booking the perfect hotel shouldn't be complicated or stressful.
                                </p>
                                <p>
                                    We started as a small team of travel enthusiasts who were frustrated with the existing
                                    booking experience. Hidden fees, confusing interfaces, and unreliable reviews made
                                    planning trips a headache. We knew there had to be a better way.
                                </p>
                                <p>
                                    Today, HotelBook connects travelers with exceptional accommodations in over 120 cities
                                    worldwide. Our platform features transparent pricing, verified guest reviews, and
                                    real-time availability — everything you need to make the best choice for your next trip.
                                </p>
                                <p>
                                    Whether you're planning a business trip, a family vacation, or a solo adventure,
                                    HotelBook is here to help you find your ideal stay at the best possible price.
                                </p>
                            </div>
                            <Button className="mt-6 rounded-xl" asChild>
                                <Link href="/explore">
                                    Explore Hotels <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                        {/* Timeline */}
                        <div className="space-y-6">
                            {timeline.map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="text-xs font-bold text-primary">{item.year}</span>
                                        </div>
                                        {i < timeline.length - 1 && (
                                            <div className="w-px h-full bg-primary/20 mt-2" />
                                        )}
                                    </div>
                                    <div className="pb-6">
                                        <h4 className="font-semibold">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">Meet Our Team</h2>
                    <p className="mt-2 text-muted-foreground">The people behind your perfect stay.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((person, i) => (
                        <Card key={i} className="border-none shadow-sm text-center group hover:shadow-md transition-all">
                            <CardContent className="pt-8 pb-6">
                                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-primary">
                                        {person.name.split(" ").map((n) => n[0]).join("")}
                                    </span>
                                </div>
                                <h3 className="font-semibold">{person.name}</h3>
                                <p className="text-sm text-primary font-medium">{person.role}</p>
                                <p className="text-xs text-muted-foreground mt-2">{person.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Partners */}
            <section className="bg-zinc-50 dark:bg-zinc-900/50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight">Our Partners</h2>
                        <p className="mt-2 text-muted-foreground">Trusted by leading brands in the travel industry.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {partners.map((partner, i) => (
                            <Card key={i} className="border-none shadow-sm group hover:shadow-md transition-all">
                                <CardContent className="py-6 text-center">
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                                        <Globe className="h-6 w-6 text-primary" />
                                    </div>
                                    <h4 className="font-semibold text-sm">{partner.name}</h4>
                                    <p className="text-[10px] text-muted-foreground mt-1">{partner.category}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">Our Values</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: CheckCircle,
                            title: "Transparency",
                            desc: "No hidden fees, no surprises. What you see is what you pay. We believe in honest pricing and clear communication with every booking.",
                        },
                        {
                            icon: Star,
                            title: "Excellence",
                            desc: "We hold our partner hotels to the highest standards. Every property is verified, reviewed, and continuously monitored for quality.",
                        },
                        {
                            icon: Heart,
                            title: "Customer First",
                            desc: "Your satisfaction is our priority. From browsing to checkout to check-in, we design every step around your needs and comfort.",
                        },
                    ].map((value, i) => (
                        <div key={i} className="text-center">
                            <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4">
                                <value.icon className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold">{value.title}</h3>
                            <p className="text-muted-foreground mt-3 leading-relaxed">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-2xl md:text-3xl font-bold">Ready to Start Your Journey?</h2>
                    <p className="mt-2 text-white/80 max-w-xl mx-auto">
                        Join thousands of travelers who trust HotelBook for unforgettable stays worldwide.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-3">
                        <Button size="lg" variant="secondary" className="rounded-xl" asChild>
                            <Link href="/explore">Browse Hotels</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-xl text-white border-white/30 hover:bg-white/10 hover:text-white" asChild>
                            <Link href={route("register")}>Create Account</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </WebLayout>
    );
}
