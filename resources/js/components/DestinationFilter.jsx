import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, X, Map } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function DestinationFilter({ cities, currentCity, onCitySelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    // Filter cities based on search
    const filteredCities = cities.filter(city =>
        city.toLowerCase().includes(search.toLowerCase())
    );

    // Mock "Popular" cities for the UI demo (first 3 or 4)
    const popularCities = cities.slice(0, 4);

    const handleSelect = (city) => {
        onCitySelect(city);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className="relative group cursor-pointer flex-1 min-w-[200px] max-w-sm">
                    <div className={cn(
                        "flex items-center gap-2 h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900 group-hover:border-primary/50",
                        currentCity && "border-primary/50 bg-primary/5"
                    )}>
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <span className={cn(
                            "flex-1 text-left line-clamp-1",
                            !currentCity && "text-muted-foreground"
                        )}>
                            {currentCity || "Where are you going?"}
                        </span>
                        {currentCity && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onCitySelect(null);
                                }}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        )}
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden gap-0">
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Find destinations..."
                            className="pl-10 h-11 bg-zinc-50 dark:bg-zinc-900 border-none ring-0 focus-visible:ring-1 focus-visible:ring-primary/20"
                            autoFocus
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="p-6 space-y-8 max-h-[60vh] overflow-y-auto">
                    {/* Popular Destinations */}
                    {!search && popularCities.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-sm font-semibold text-foreground/70 uppercase tracking-wider">
                                <Map className="h-4 w-4 text-primary" />
                                Popular destinations
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {popularCities.map((city) => (
                                    <button
                                        key={city}
                                        onClick={() => handleSelect(city)}
                                        className={cn(
                                            "inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all hover:border-primary/30 hover:bg-primary/5",
                                            currentCity === city
                                                ? "border-primary bg-primary text-primary-foreground"
                                                : "bg-background text-zinc-600 border-zinc-200 dark:border-zinc-800 dark:text-zinc-400"
                                        )}
                                    >
                                        {city}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* All Destinations */}
                    <div className="space-y-4 pb-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground/70 uppercase tracking-wider">
                            <MapPin className="h-4 w-4 text-primary" />
                            {search ? "Search results" : "All destinations"}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {filteredCities.length > 0 ? (
                                filteredCities.map((city) => (
                                    <button
                                        key={city}
                                        onClick={() => handleSelect(city)}
                                        className={cn(
                                            "flex items-center gap-3 p-3 rounded-lg border text-left transition-all group",
                                            currentCity === city
                                                ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                                                : "border-zinc-100 bg-zinc-50/50 hover:bg-zinc-100/80 hover:border-primary/20 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
                                        )}
                                    >
                                        <div className={cn(
                                            "p-2 rounded-md transition-colors",
                                            currentCity === city ? "bg-primary text-primary-foreground" : "bg-white dark:bg-zinc-800 text-muted-foreground group-hover:text-primary"
                                        )}>
                                            <MapPin className="h-4 w-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm">
                                                {city}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                Explore rooms in {city}
                                            </span>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="col-span-full py-10 text-center space-y-2">
                                    <p className="text-sm font-medium">No destinations found for "{search}"</p>
                                    <p className="text-xs text-muted-foreground">Try searching for another city.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
