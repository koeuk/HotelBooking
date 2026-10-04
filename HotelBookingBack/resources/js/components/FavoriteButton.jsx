import { router, usePage } from "@inertiajs/react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FavoriteButton({ hotelId, hotelUuid, className = "" }) {
    const { auth } = usePage().props;
    const favoriteIds = auth?.favoriteIds || [];
    const isFavorited = favoriteIds.includes(hotelId);

    const toggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!auth?.user) {
            window.location.href = route("login");
            return;
        }
        router.post(route("favorites.toggle", hotelUuid || hotelId), {}, { preserveScroll: true });
    };

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={isFavorited}
            className={cn(
                "p-2 rounded-full transition-all duration-300 ease-out-expo hover:scale-110 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/50",
                isFavorited
                    ? "bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-glow"
                    : "glass text-white hover:bg-black/40",
                className,
            )}
        >
            <Heart
                className={cn(
                    "h-4 w-4 transition-transform",
                    isFavorited && "fill-current scale-110",
                )}
            />
        </button>
    );
}
