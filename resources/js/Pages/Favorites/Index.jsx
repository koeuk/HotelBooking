import UserLayout from "@/Layouts/UserLayout";
import { Head, Link } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, MapPin, BedDouble, ArrowRight } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";

export default function Index({ hotels = [] }) {
    return (
        <UserLayout title="My Favorites">
            <Head title="My Favorites" />

            <div className="space-y-8">
                {/* Hero */}
                <div className="relative overflow-hidden rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500" />
                    <div className="absolute inset-0 bg-gradient-mesh opacity-30 mix-blend-overlay" />
                    <div className="absolute inset-0 noise opacity-30" />
                    <div className="relative p-8 text-white space-y-2">
                        <Badge
                            variant="outline"
                            className="glass border-white/20 text-white w-fit"
                        >
                            <Heart className="h-3 w-3 fill-current" />
                            {hotels.length}{" "}
                            {hotels.length === 1 ? "favorite" : "favorites"}
                        </Badge>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                            My favorites
                        </h1>
                        <p className="text-white/85 max-w-lg">
                            {hotels.length > 0
                                ? "Your saved hotels — ready to book."
                                : "Hotels you love will appear here."}
                        </p>
                    </div>
                </div>

                {/* Grid */}
                {hotels.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hotels.map((hotel, idx) => (
                            <Link
                                key={hotel.id}
                                href={`/explore/${hotel.uuid}`}
                                className="block group animate-fade-up"
                                style={{
                                    animationDelay: `${Math.min(idx * 40, 240)}ms`,
                                }}
                            >
                                <Card
                                    variant="elevated"
                                    interactive
                                    className="overflow-hidden h-full"
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
                                        {hotel.reviews_avg_rating && (
                                            <div className="absolute top-3 left-3 glass rounded-full px-2.5 py-1 text-xs font-semibold inline-flex items-center gap-1">
                                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                                {Number(
                                                    hotel.reviews_avg_rating,
                                                ).toFixed(1)}
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="min-w-0">
                                            <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                                                {hotel.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1 truncate">
                                                <MapPin className="h-3.5 w-3.5 shrink-0" />
                                                {hotel.city}, {hotel.country}
                                            </p>
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
                ) : (
                    <Card variant="soft" className="text-center py-16">
                        <CardContent>
                            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mb-4">
                                <Heart className="h-8 w-8 text-white fill-current" />
                            </div>
                            <p className="font-semibold text-lg">
                                No favorites yet
                            </p>
                            <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                                Browse hotels and tap the heart icon to save
                                your favorites for easy access later.
                            </p>
                            <Button
                                variant="gradient"
                                shape="pill"
                                size="lg"
                                className="mt-6"
                                asChild
                            >
                                <Link href="/explore">
                                    Browse hotels{" "}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </UserLayout>
    );
}
