import WebLayout from "@/Layouts/WebLayout";
import { Head, Link } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, MapPin, BedDouble, ArrowRight } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";

export default function Index({ hotels = [] }) {
    return (
        <WebLayout>
            <Head title="My Favorites" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Favorites</h1>
                    <p className="text-muted-foreground mt-1">
                        {hotels.length > 0
                            ? `${hotels.length} saved hotel${hotels.length !== 1 ? "s" : ""}`
                            : "Hotels you love will appear here"}
                    </p>
                </div>

                {hotels.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hotels.map((hotel) => (
                            <Link key={hotel.id} href={`/explore/${hotel.uuid}`}>
                                <Card className="group overflow-hidden border-none shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                                    <div className="aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
                                        <FavoriteButton hotelId={hotel.id} hotelUuid={hotel.uuid} className="absolute top-3 right-3 z-10" />
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
                                            <span className="text-xs text-muted-foreground">{hotel.rooms_count} rooms</span>
                                            <span className="text-xs text-muted-foreground">{hotel.reviews_count} reviews</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <Card className="border-none shadow-sm">
                        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="h-16 w-16 rounded-full bg-rose-100 dark:bg-rose-900/20 flex items-center justify-center mb-4">
                                <Heart className="h-8 w-8 text-rose-400" />
                            </div>
                            <h3 className="text-lg font-semibold">No favorites yet</h3>
                            <p className="text-muted-foreground mt-1 max-w-sm">
                                Browse hotels and tap the heart icon to save your favorites for easy access later.
                            </p>
                            <Button className="mt-6 rounded-xl" asChild>
                                <Link href="/explore">
                                    Browse Hotels <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </WebLayout>
    );
}
