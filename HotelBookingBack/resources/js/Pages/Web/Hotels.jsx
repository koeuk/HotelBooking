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
    TrendingUp,
    Compass,
    ArrowRight,
} from "lucide-react";
import { useState } from "react";
import FavoriteButton from "@/components/FavoriteButton";
import DestinationFilter from "@/components/DestinationFilter";
import { cn } from "@/lib/utils";

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

            {/* Hero with integrated search */}
            <section className="relative overflow-hidden isolate">
                {/* Layered backdrop */}
                <div className="absolute inset-0 bg-gradient-mesh" />
                <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--foreground)_4%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--foreground)_4%,transparent)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent_78%)]"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute -top-40 -right-24 h-[520px] w-[520px] rounded-full bg-gradient-primary opacity-25 blur-3xl"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-48 -left-20 h-[460px] w-[460px] rounded-full bg-primary/30 blur-3xl"
                />
                <div className="absolute inset-0 noise" />

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-14 md:pb-20">
                    {/* Eyebrow */}
                    <div className="flex justify-center animate-fade-up">
                        <Badge
                            variant="outline"
                            className="glass border-foreground/10 pl-1.5 pr-3 py-1 text-[11px]"
                        >
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-primary">
                                <Sparkles className="h-2.5 w-2.5 text-white" />
                            </span>
                            <span className="uppercase tracking-[0.18em] font-semibold text-foreground/80">
                                {hotels.total} handpicked stays
                                {filters?.city ? ` · ${filters.city}` : ""}
                            </span>
                        </Badge>
                    </div>

                    {/* Headline */}
                    <h1 className="mt-6 text-center text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.02] animate-fade-up [animation-delay:80ms]">
                        Discover{" "}
                        <span className="italic font-serif font-medium text-gradient-primary">
                            extraordinary
                        </span>
                        <br className="hidden sm:block" />
                        <span className="sm:hidden"> </span>
                        places to stay
                    </h1>

                    <p className="mt-5 text-center text-base md:text-lg text-muted-foreground max-w-xl mx-auto animate-fade-up [animation-delay:160ms]">
                        Search our curated collection by name, city, or
                        destination — your next escape starts here.
                    </p>

                    {/* Command bar */}
                    <div className="mt-10 md:mt-12 animate-fade-up [animation-delay:240ms]">
                        <div className="relative">
                            {/* Subtle halo behind the bar */}
                            <div
                                aria-hidden
                                className="absolute -inset-x-8 -inset-y-4 bg-gradient-primary opacity-[0.08] blur-2xl rounded-[3rem]"
                            />
                            <div className="relative glass-strong rounded-[28px] p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] ring-1 ring-foreground/5">
                                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] md:divide-x divide-border/60">
                                    {/* Hotel name segment */}
                                    <div className="group px-4 pt-2 pb-1.5 md:pr-5 transition-colors rounded-t-[22px] md:rounded-l-[22px] md:rounded-tr-none hover:bg-foreground/[0.02]">
                                        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                                            <Search className="h-3 w-3" />
                                            Hotel
                                        </div>
                                        <Input
                                            variant="soft"
                                            placeholder="Search by name…"
                                            className="mt-0.5 h-9 bg-transparent border-0 rounded-none px-0 text-[15px] font-medium placeholder:text-muted-foreground/70 focus-visible:bg-transparent focus-visible:border-0 focus-visible:ring-0"
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter")
                                                    applyFilters({
                                                        search,
                                                        page: 1,
                                                    });
                                            }}
                                        />
                                    </div>

                                    {/* Destination segment */}
                                    <div className="group px-4 pt-2 pb-1.5 md:px-5 transition-colors hover:bg-foreground/[0.02]">
                                        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                                            <Compass className="h-3 w-3" />
                                            Destination
                                        </div>
                                        <div className="mt-0.5">
                                            <DestinationFilter
                                                cities={cities}
                                                currentCity={filters?.city}
                                                onCitySelect={(city) =>
                                                    applyFilters({
                                                        city,
                                                        page: 1,
                                                    })
                                                }
                                                triggerClassName="h-9 px-0 bg-transparent border-0 rounded-none text-[15px] font-medium hover:bg-transparent dark:hover:bg-transparent group-hover:border-0"
                                                placeholder="Anywhere you dream of"
                                                icon={MapPin}
                                            />
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <div className="flex items-center justify-center p-1.5 md:p-2">
                                        <Button
                                            variant="gradient"
                                            shape="pill"
                                            size="lg"
                                            className="w-full md:w-auto md:px-6 group/btn"
                                            onClick={() =>
                                                applyFilters({
                                                    search,
                                                    page: 1,
                                                })
                                            }
                                        >
                                            <Search className="h-4 w-4" />
                                            Search
                                            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trending chips */}
                    {cities?.length > 0 && (
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 animate-fade-up [animation-delay:320ms]">
                            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] font-semibold text-muted-foreground/90">
                                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                                Trending
                            </span>
                            {cities.slice(0, 5).map((city) => {
                                const active = filters?.city === city;
                                return (
                                    <button
                                        key={city}
                                        onClick={() =>
                                            applyFilters({
                                                city: active ? null : city,
                                                page: 1,
                                            })
                                        }
                                        className={cn(
                                            "inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ease-out-expo hover:-translate-y-0.5",
                                            active
                                                ? "bg-foreground text-background border-foreground shadow-md"
                                                : "bg-background/70 backdrop-blur border-foreground/10 text-foreground/75 hover:border-foreground/25 hover:bg-background hover:text-foreground",
                                        )}
                                    >
                                        {city}
                                    </button>
                                );
                            })}
                            {hasFilters && (
                                <button
                                    onClick={() => {
                                        setSearch("");
                                        router.get("/explore");
                                    }}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X className="h-3 w-3" />
                                    Clear all
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 space-y-8">
                {/* Results meta */}
                <div className="flex items-center justify-between gap-3 animate-fade-up">
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-lg font-semibold tracking-tight">
                            {filters?.city
                                ? `Stays in ${filters.city}`
                                : filters?.search
                                  ? `Results for "${filters.search}"`
                                  : "All stays"}
                        </h2>
                        <span className="text-sm text-muted-foreground">
                            {hotels.total}{" "}
                            {hotels.total === 1 ? "hotel" : "hotels"}
                        </span>
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
