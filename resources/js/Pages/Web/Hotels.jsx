import WebLayout from "@/Layouts/WebLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Star,
    MapPin,
    BedDouble,
    Search,
    X,
    Loader2,
    Sparkles,
} from "lucide-react";
import { useState } from "react";
import FavoriteButton from "@/components/FavoriteButton";
import DestinationFilter from "@/components/DestinationFilter";

export default function Hotels({ hotels, cities, filters }) {
    const [search, setSearch] = useState(filters?.search || "");
    const [loadingMore, setLoadingMore] = useState(false);

    const applyFilters = (newFilters) => {
        router.get(
            "/explore",
            { ...filters, ...newFilters },
            { preserveState: true },
        );
    };

    const hasFilters = filters?.search || filters?.city;

    return (
        <WebLayout>
            <Head title="Explore Hotels" />

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-mesh" />
                <div className="absolute inset-0 noise" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 space-y-4">
                    <Badge
                        variant="outline"
                        className="glass border-foreground/10 w-fit"
                    >
                        <Sparkles className="h-3 w-3" />
                        {hotels.total} hotels
                        {filters?.city ? ` in ${filters.city}` : ""}
                        {filters?.search ? ` for "${filters.search}"` : ""}
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-up">
                        Explore{" "}
                        <span className="text-gradient-primary">hotels</span>
                    </h1>
                    <p className="text-muted-foreground max-w-xl animate-fade-up [animation-delay:80ms]">
                        Find the perfect place for your next trip — search by
                        name, city, or destination.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Filters */}
                <div className="glass rounded-3xl p-3 sm:p-4 -mt-2 shadow-soft animate-fade-up [animation-delay:120ms]">
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="relative flex-1 min-w-[260px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                variant="soft"
                                placeholder="Search by hotel name…"
                                className="pl-11"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter")
                                        applyFilters({ search, page: 1 });
                                }}
                            />
                        </div>

                        <div className="flex-1 min-w-[260px]">
                            <DestinationFilter
                                cities={cities}
                                currentCity={filters?.city}
                                onCitySelect={(city) =>
                                    applyFilters({ city, page: 1 })
                                }
                            />
                        </div>

                        <Button
                            variant="gradient"
                            shape="pill"
                            size="lg"
                            onClick={() => applyFilters({ search, page: 1 })}
                        >
                            Search
                        </Button>

                        {hasFilters && (
                            <Button
                                variant="ghost"
                                shape="pill"
                                size="lg"
                                onClick={() => {
                                    setSearch("");
                                    router.get("/explore");
                                }}
                            >
                                <X className="h-4 w-4" />
                                Clear
                            </Button>
                        )}
                    </div>
                </div>

                {/* Grid */}
                {hotels.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hotels.data.map((hotel, idx) => (
                            <Link
                                key={hotel.id}
                                href={`/explore/${hotel.uuid}`}
                                className="block group animate-fade-up"
                                style={{
                                    animationDelay: `${Math.min(idx * 40, 320)}ms`,
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
                                        {hotel.rating > 0 && (
                                            <div className="absolute top-3 left-3 glass rounded-full px-2.5 py-1 text-xs font-semibold inline-flex items-center gap-1">
                                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                                {Number(hotel.rating).toFixed(
                                                    1,
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                                                    {hotel.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1 truncate">
                                                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                                                    {hotel.city},{" "}
                                                    {hotel.country}
                                                </p>
                                            </div>
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
                            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-primary-soft flex items-center justify-center mb-4">
                                <BedDouble className="h-8 w-8 text-primary" />
                            </div>
                            <p className="font-semibold text-lg">
                                No hotels found
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Try adjusting your search or filters.
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* See More */}
                {hotels.total > hotels.data.length && (
                    <div className="flex justify-center">
                        <Button
                            variant="glass"
                            size="xl"
                            shape="pill"
                            disabled={loadingMore}
                            onClick={() => {
                                setLoadingMore(true);
                                router.get(
                                    "/explore",
                                    { ...filters, all: 1 },
                                    {
                                        preserveState: true,
                                        onFinish: () =>
                                            setLoadingMore(false),
                                    },
                                );
                            }}
                        >
                            {loadingMore ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Loading…
                                </>
                            ) : (
                                `See more (${hotels.total - hotels.data.length} more)`
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </WebLayout>
    );
}
