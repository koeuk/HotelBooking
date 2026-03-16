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

export default function Home({ featuredHotels, totalHotels, totalReviews, amenities, latestReviews }) {
    const [search, setSearch] = useState("");

    return (
        <WebLayout>
            <Head title="Book Your Perfect Stay" />

            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 dark:from-primary/10 dark:via-zinc-950 dark:to-primary/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                    <div className="max-w-3xl">
                        <Badge variant="secondary" className="mb-4 text-xs">
                            <Sparkles className="h-3 w-3 mr-1" /> {totalHotels}+ Hotels Available
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                            Find Your Perfect{" "}
                            <span className="text-primary">Hotel Stay</span>
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-xl">
                            Discover amazing hotels at the best prices. Book with confidence and enjoy unforgettable experiences.
                        </p>

                        {/* Search Bar */}
                        <div className="mt-8 flex gap-2 max-w-lg">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    placeholder="Search hotels, cities..."
                                    className="pl-10 h-12 rounded-xl"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && search) {
                                            window.location.href = `/explore?search=${encodeURIComponent(search)}`;
                                        }
                                    }}
                                />
                            </div>
                            <Button
                                className="h-12 px-6 rounded-xl"
                                onClick={() => {
                                    window.location.href = search
                                        ? `/explore?search=${encodeURIComponent(search)}`
                                        : "/explore";
                                }}
                            >
                                Search
                            </Button>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Shield className="h-4 w-4 text-green-500" />
                                Best Price Guarantee
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4 text-blue-500" />
                                Free Cancellation
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Star className="h-4 w-4 text-yellow-500" />
                                {totalReviews}+ Reviews
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Hotels */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Top Rated Hotels</h2>
                        <p className="text-muted-foreground mt-1">Discover our highest-rated properties</p>
                    </div>
                    <Button variant="ghost" asChild>
                        <Link href="/explore">
                            View All <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredHotels.map((hotel) => (
                        <Link key={hotel.id} href={`/explore/${hotel.uuid}`}>
                            <Card className="group overflow-hidden border-none shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                                <div className="aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                                    {hotel.images?.[0] ? (
                                        <img
                                            src={hotel.images[0]}
                                            alt={hotel.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <BedDouble className="h-12 w-12 text-zinc-400" />
                                        </div>
                                    )}
                                </div>
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                                                {hotel.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                                <MapPin className="h-3.5 w-3.5" />
                                                {hotel.city}, {hotel.country}
                                            </p>
                                        </div>
                                        {hotel.reviews_avg_rating && (
                                            <Badge variant="secondary" className="font-bold shrink-0">
                                                <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                                                {Number(hotel.reviews_avg_rating).toFixed(1)}
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                                        <span className="text-xs text-muted-foreground">
                                            {hotel.rooms_count} rooms
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {hotel.reviews_count} reviews
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Latest Reviews */}
            {latestReviews.length > 0 && (
                <section className="bg-zinc-50 dark:bg-zinc-900/50 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold tracking-tight mb-8">What Guests Say</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {latestReviews.map((review) => (
                                <Card key={review.id} className="border-none shadow-sm">
                                    <CardContent className="p-5">
                                        <div className="flex gap-0.5 mb-3">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star
                                                    key={s}
                                                    className={`h-4 w-4 ${s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"}`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-3">
                                            "{review.comment || 'Great experience!'}"
                                        </p>
                                        <div className="mt-4 pt-3 border-t">
                                            <p className="text-sm font-medium">{review.user?.name}</p>
                                            <p className="text-xs text-muted-foreground">{review.hotel?.name}</p>
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
                <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-2xl md:text-3xl font-bold">Ready to Book Your Stay?</h2>
                    <p className="mt-2 text-white/80 max-w-xl mx-auto">
                        Join thousands of travelers who trust HotelBook for their accommodation needs.
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
