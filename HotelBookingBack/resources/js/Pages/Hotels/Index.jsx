import { useState } from "react";
import WebLayout from "@/Layouts/WebLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Hotel,
    Search,
    Star,
    MapPin,
    BedDouble,
    X,
    Sparkles,
} from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";

export default function HotelsIndex({ hotels, cities, filters }) {
    const [search, setSearch] = useState(filters?.search || "");
    const hotelData = hotels.data || [];

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("hotels.index"),
            { search, city: filters?.city },
            { preserveState: true },
        );
    };

    const handleCityFilter = (city) => {
        router.get(
            route("hotels.index"),
            { search: filters?.search, city: city === "all" ? "" : city },
            { preserveState: true },
        );
    };

    const clearFilters = () => {
        setSearch("");
        router.get(route("hotels.index"));
    };

    const hasFilters = filters?.search || filters?.city;

    return (
        <WebLayout>
            <Head title="Explore Hotels" />

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-mesh" />
                <div className="absolute inset-0 noise" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 space-y-5">
                    <Badge
                        variant="outline"
                        className="glass border-foreground/10 w-fit"
                    >
                        <Sparkles className="h-3 w-3" />
                        {hotels.total ?? hotelData.length} stays available
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-up">
                        Explore{" "}
                        <span className="text-gradient-primary">hotels</span>
                    </h1>
                    <p className="text-muted-foreground max-w-xl animate-fade-up [animation-delay:80ms]">
                        Discover the perfect place for your next trip — filtered
                        by city, search, and rating.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Search & Filters */}
                <div className="glass rounded-3xl p-3 sm:p-4 -mt-2 shadow-soft animate-fade-up [animation-delay:120ms]">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <form
                            onSubmit={handleSearch}
                            className="flex-1 flex gap-2"
                        >
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    variant="soft"
                                    placeholder="Search by hotel, city, or country…"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-11"
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="gradient"
                                shape="pill"
                                size="lg"
                            >
                                Search
                            </Button>
                        </form>
                        <Select
                            value={filters?.city || "all"}
                            onValueChange={handleCityFilter}
                        >
                            <SelectTrigger className="w-full sm:w-48 h-11 rounded-2xl bg-muted/60 border-transparent">
                                <SelectValue placeholder="All cities" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All cities</SelectItem>
                                {cities?.map((city) => (
                                    <SelectItem key={city} value={city}>
                                        {city}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {hasFilters && (
                            <Button
                                variant="ghost"
                                size="icon-lg"
                                shape="pill"
                                onClick={clearFilters}
                                aria-label="Clear filters"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Grid */}
                {hotelData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hotelData.map((hotel, idx) => (
                            <Link
                                key={hotel.id}
                                href={route("hotels.show", hotel.id)}
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
                                    <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                                        <FavoriteButton
                                            hotelId={hotel.id}
                                            hotelUuid={hotel.uuid}
                                            className="absolute top-3 right-3 z-10"
                                        />
                                        {hotel.images?.length > 0 ? (
                                            <img
                                                src={hotel.images[0]}
                                                alt={hotel.name}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Hotel className="h-12 w-12 text-muted-foreground" />
                                            </div>
                                        )}
                                        {hotel.rating > 0 && (
                                            <div className="absolute top-3 left-3 glass rounded-full px-2.5 py-1 text-xs font-semibold inline-flex items-center gap-1">
                                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                                {hotel.rating}
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-5">
                                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">
                                            {hotel.name}
                                        </h3>
                                        <p className="flex items-center gap-1 mt-1.5 text-sm text-muted-foreground truncate">
                                            <MapPin className="h-3.5 w-3.5 shrink-0" />
                                            <span className="truncate">
                                                {hotel.city}, {hotel.country}
                                            </span>
                                        </p>
                                        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/60 text-xs text-muted-foreground">
                                            <BedDouble className="h-3.5 w-3.5" />
                                            <span>
                                                {hotel.rooms_count} rooms
                                                available
                                            </span>
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
                                <Hotel className="h-8 w-8 text-primary" />
                            </div>
                            <p className="font-semibold text-lg">
                                No hotels found
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Try adjusting your search or filter criteria.
                            </p>
                            {hasFilters && (
                                <Button
                                    variant="gradient"
                                    shape="pill"
                                    className="mt-5"
                                    onClick={clearFilters}
                                >
                                    Clear filters
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {hotels.links && hotels.last_page > 1 && (
                    <div className="flex items-center justify-center gap-1">
                        {hotels.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || "#"}
                                className={`min-w-9 h-9 inline-flex items-center justify-center px-3 text-sm rounded-full transition-all ${
                                    link.active
                                        ? "bg-gradient-primary text-primary-foreground shadow-glow"
                                        : link.url
                                          ? "hover:bg-muted"
                                          : "text-muted-foreground cursor-not-allowed"
                                }`}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                                preserveScroll
                            />
                        ))}
                    </div>
                )}
            </div>
        </WebLayout>
    );
}
