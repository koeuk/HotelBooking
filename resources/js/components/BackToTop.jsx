import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BackToTop({
    threshold = 400,
    className = "",
    scrollContainer,
}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const target = scrollContainer?.current ?? window;
        const getY = () =>
            target === window
                ? window.scrollY
                : scrollContainer.current.scrollTop;

        const onScroll = () => setVisible(getY() > threshold);

        target.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => target.removeEventListener("scroll", onScroll);
    }, [threshold, scrollContainer]);

    const scrollToTop = () => {
        const target = scrollContainer?.current ?? window;
        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        const opts = { top: 0, behavior: reduce ? "auto" : "smooth" };
        if (target === window) window.scrollTo(opts);
        else scrollContainer.current.scrollTo(opts);
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className={cn(
                "fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full bg-gradient-primary text-primary-foreground shadow-glow",
                "flex items-center justify-center transition-all duration-300 ease-out-expo",
                "hover:-translate-y-1 hover:shadow-glow-lg",
                "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/50",
                visible
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none",
                className,
            )}
        >
            <ArrowUp className="h-5 w-5" />
        </button>
    );
}
