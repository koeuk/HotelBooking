import WebLayout from "@/Layouts/WebLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, MapPin, BedDouble, Search, X } from "lucide-react";
import { useState } from "react";
import FavoriteButton from "@/components/FavoriteButton";
import DestinationFilter from "@/components/DestinationFilter";

export default function Hotels({ hotels, cities, filters }) {
    const [search, setSearch] = useState(filters?.search || "");

    const applyFilters = (newFilters) => {
        router.get("/explore", { ...filters, ...newFilters }, { preserveState: true });
    };

    return (
        <WebLayout>
            <Head title="Explore Hotels" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Explore Hotels</h1>
                    <p className="text-muted-foreground mt-1">
                        {hotels.total} hotels found
                        {filters?.city ? ` in ${filters.city}` : ""}
                        {filters?.search ? ` for "${filters.search}"` : ""}
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 mb-10 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
                    <div className="relative flex-1 min-w-[280px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by hotel name..."
                            className="pl-10 h-11 bg-background border-zinc-200/60 dark:border-zinc-800/60 shadow-none focus-visible:ring-primary/20 transition-all rounded-xl"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") applyFilters({ search, page: 1 });
                            }}
                        />
                    </div>

                    <div className="flex-1 min-w-[280px]">
                        <DestinationFilter
                            cities={cities}
                            currentCity={filters?.city}
                            onCitySelect={(city) => applyFilters({ city, page: 1 })}
                        />
                    </div>

                    {(filters?.search || filters?.city) && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-11 px-4 lg:px-6 hover:bg-zinc-200 items-center justify-center shrink-0 rounded-xl transition-all"
                            onClick={() => {
                                setSearch("");
                                router.get("/explore");
                            }}
                        >
                            <X className="h-4 w-4 mr-2" />
                            Clear Filters
                        </Button>
                    )}
                </div>

                {/* Grid */}
                {hotels.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hotels.data.map((hotel) => (
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
                                            {hotel.rating > 0 && (
                                                <Badge variant="secondary" className="font-bold shrink-0">
                                                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                                                    {Number(hotel.rating).toFixed(1)}
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
                    <div className="text-center py-20">
                        <BedDouble className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold">No hotels found</h3>
                        <p className="text-muted-foreground mt-1">Try adjusting your search or filters.</p>
                    </div>
                )}

                {/* Pagination */}
                {hotels.links?.length > 3 && (
                    <div className="flex items-center justify-center space-x-2 mt-8">
                        {hotels.links.map((link, i) => (
                            <Button
                                key={i}
                                variant={link.active ? "default" : "outline"}
                                size="sm"
                                asChild={!!link.url}
                                disabled={!link.url}
                                className={!link.url ? "opacity-50" : ""}
                            >
                                {link.url ? (
                                    <Link href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />
                                ) : (
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                )}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </WebLayout>
    );
}
