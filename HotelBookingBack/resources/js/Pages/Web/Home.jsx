import WebLayout from "@/Layouts/WebLayout";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Star,
    MapPin,
    BedDouble,
    ArrowRight,
    Search,
    Shield,
    Clock,
    Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import FavoriteButton from "@/components/FavoriteButton";

export default function Home({
    featuredHotels,
    totalHotels,
    totalReviews,
    amenities,
    latestReviews,
}) {
    const [search, setSearch] = useState("");
    const goSearch = () => {
        window.location.href = search
            ? `/explore?search=${encodeURIComponent(search)}`
            : "/explore";
    };

    return (
        <WebLayout>
            <Head title="Book Your Perfect Stay" />

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-mesh" />
                <div className="absolute inset-0 noise" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <Badge
                            variant="outline"
                            className="glass border-foreground/10 mx-auto animate-fade-up"
                        >
                            <Sparkles className="h-3 w-3" />
                            Hand-picked stays for 2026
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] animate-fade-up [animation-delay:80ms]">
                            Find your{" "}
                            <span className="text-gradient-primary">
                                perfect stay
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto animate-fade-up [animation-delay:160ms]">
                            Discover boutique hotels, beachside resorts, and
                            urban escapes — booked in seconds.
                        </p>

                        {/* Search */}
                        <div className="mt-4 flex flex-col sm:flex-row gap-2 max-w-xl mx-auto animate-fade-up [animation-delay:220ms]">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    variant="soft"
                                    placeholder="Search hotels, cities, countries…"
                                    className="pl-12 h-14 text-base"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") goSearch();
                                    }}
                                />
                            </div>
                            <Button
                                variant="gradient"
                                size="xl"
                                shape="pill"
                                onClick={goSearch}
                            >
                                Search
                            </Button>
                        </div>

                        {/* Trust badges */}
                        <div className="pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground animate-fade-up [animation-delay:300ms]">
                            <span className="inline-flex items-center gap-1.5">
                                <Shield className="h-4 w-4 text-emerald-500" />
                                Best Price Guarantee
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Clock className="h-4 w-4 text-sky-500" />
                                Free Cancellation
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Star className="h-4 w-4 text-amber-500" />
                                {totalReviews}+ Reviews
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Hotels */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Top rated stays
                        </h2>
                        <p className="text-muted-foreground mt-1">
                            Discover our highest-rated properties
                        </p>
                    </div>
                    <Button variant="ghost" shape="pill" asChild>
                        <Link href="/explore">
                            View all <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredHotels.map((hotel) => (
                        <Link key={hotel.id} href={`/explore/${hotel.uuid}`}>
                            <Card
                                variant="elevated"
                                interactive
                                className="group overflow-hidden cursor-pointer"
                            >
                                <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                                    <FavoriteButton
                                        hotelId={hotel.id}
                                        hotelUuid={hotel.uuid}
                                        className="absolute top-3 right-3 z-10"
                                    />
                                    {hotel.images?.[0] ? (
                                        <img
                                            src={hotel.images[0]}
                                            alt={hotel.name}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <BedDouble className="h-12 w-12 text-muted-foreground" />
                                        </div>
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                                                {hotel.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1 truncate">
                                                <MapPin className="h-3.5 w-3.5 shrink-0" />
                                                {hotel.city}, {hotel.country}
                                            </p>
                                        </div>
                                        {hotel.reviews_avg_rating && (
                                            <Badge className="bg-gradient-primary text-primary-foreground font-bold shrink-0">
                                                <Star className="h-3 w-3 fill-current" />
                                                {Number(
                                                    hotel.reviews_avg_rating,
                                                ).toFixed(1)}
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/60 text-xs text-muted-foreground">
                                        <span>{hotel.rooms_count} rooms</span>
                                        <span>{hotel.reviews_count} reviews</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Latest Reviews */}
            {latestReviews.length > 0 && (
                <section className="bg-muted/30 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold tracking-tight mb-8">
                            What guests are saying
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {latestReviews.map((review) => (
                                <Card
                                    key={review.id}
                                    variant="glass"
                                    className="hover-lift"
                                >
                                    <CardContent className="p-5">
                                        <div className="flex gap-0.5 mb-3">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star
                                                    key={s}
                                                    className={`h-4 w-4 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-3">
                                            "
                                            {review.comment ||
                                                "Great experience!"}
                                            "
                                        </p>
                                        <div className="mt-4 pt-3 border-t border-border/60">
                                            <p className="text-sm font-medium">
                                                {review.user?.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {review.hotel?.name}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 md:p-14 text-center text-primary-foreground">
                    <div className="absolute inset-0 noise opacity-20" />
                    <div className="relative">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Ready to book your stay?
                        </h2>
                        <p className="mt-3 text-primary-foreground/85 max-w-xl mx-auto">
                            Join thousands of travelers who trust HotelBook for
                            their accommodation needs.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            <Button
                                size="xl"
                                shape="pill"
                                variant="secondary"
                                asChild
                            >
                                <Link href="/explore">Browse hotels</Link>
                            </Button>
                            <Button
                                size="xl"
                                shape="pill"
                                variant="glass"
                                className="text-primary-foreground border-white/20"
                                asChild
                            >
                                <Link href={route("register")}>
                                    Create account
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </WebLayout>
    );
}
