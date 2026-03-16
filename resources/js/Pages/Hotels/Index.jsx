import { useState } from "react";
import WebLayout from "@/Layouts/WebLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    Building2,
    X,
} from "lucide-react";

export default function HotelsIndex({ hotels, cities, filters }) {
    const [search, setSearch] = useState(filters?.search || "");
    const hotelData = hotels.data || [];

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("hotels.index"), { search, city: filters?.city }, { preserveState: true });
    };

    const handleCityFilter = (city) => {
        router.get(
            route("hotels.index"),
            { search: filters?.search, city: city === "all" ? "" : city },
            { preserveState: true }
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 p-8 text-white shadow-lg">
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-xl" />
                    <div className="absolute right-8 bottom-4 opacity-10">
                        <Building2 className="h-32 w-32" />
                    </div>
                    <div className="relative">
                        <h1 className="text-3xl font-bold tracking-tight">Explore Hotels</h1>
                        <p className="mt-2 text-white/80 max-w-lg">
                            Discover amazing hotels and find the perfect stay for your next trip.
                        </p>
                    </div>
                </div>

                {/* Search & Filters */}
                <Card className="border-none shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search by hotel name, city, or country..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <Button type="submit">Search</Button>
                            </form>
                            <Select
                                value={filters?.city || "all"}
                                onValueChange={handleCityFilter}
                            >
                                <SelectTrigger className="w-full sm:w-48">
                                    <SelectValue placeholder="All Cities" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Cities</SelectItem>
                                    {cities?.map((city) => (
                                        <SelectItem key={city} value={city}>
                                            {city}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {hasFilters && (
                                <Button variant="ghost" size="icon" onClick={clearFilters}>
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Hotels Grid */}
                {hotelData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hotelData.map((hotel) => (
                            <Link
                                key={hotel.id}
                                href={route("hotels.show", hotel.id)}
                                className="block group"
                            >
                                <Card className="border-none shadow-sm hover:shadow-md transition-all overflow-hidden h-full">
                                    {/* Image placeholder */}
                                    <div className="h-48 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center relative overflow-hidden">
                                        {hotel.images && hotel.images.length > 0 ? (
                                            <img
                                                src={hotel.images[0]}
                                                alt={hotel.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <Hotel className="h-12 w-12 text-zinc-400" />
                                        )}
                                        {hotel.rating && (
                                            <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm text-amber-700 px-2.5 py-1 rounded-full text-sm font-semibold shadow">
                                                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                                {hotel.rating}
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-5">
                                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">
                                            {hotel.name}
                                        </h3>
                                        <div className="flex items-center gap-1 mt-1.5 text-sm text-muted-foreground">
                                            <MapPin className="h-3.5 w-3.5 shrink-0" />
                                            <span className="truncate">{hotel.city}, {hotel.country}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                                            <BedDouble className="h-3.5 w-3.5" />
                                            <span>{hotel.rooms_count} rooms available</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <Card className="border-none shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                    <Hotel className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <p className="text-muted-foreground font-medium text-lg">No hotels found</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Try adjusting your search or filter criteria.
                                </p>
                                {hasFilters && (
                                    <Button variant="outline" className="mt-4" onClick={clearFilters}>
                                        Clear Filters
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {hotels.links && hotels.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {hotels.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || "#"}
                                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                    link.active
                                        ? "bg-primary text-primary-foreground"
                                        : link.url
                                        ? "hover:bg-muted"
                                        : "text-muted-foreground cursor-not-allowed"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                preserveScroll
                            />
                        ))}
                    </div>
                )}
            </div>
        </WebLayout>
    );
}
