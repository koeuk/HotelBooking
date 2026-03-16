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
            className={cn(
                "p-2 rounded-full transition-all",
                isFavorited
                    ? "bg-rose-500 text-white hover:bg-rose-600"
                    : "bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm",
                className,
            )}
        >
            <Heart className={cn("h-4 w-4", isFavorited && "fill-current")} />
        </button>
    );
}
