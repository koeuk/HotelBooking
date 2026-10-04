import { useEffect, useRef } from "react";

export default function HotelMap({ latitude, longitude, name, className = "h-[300px] w-full rounded-lg" }) {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        if (!latitude || !longitude || !mapRef.current) return;
        if (typeof window === "undefined") return;

        // Dynamically import leaflet to avoid SSR issues
        import("leaflet").then((L) => {
            // Import CSS
            if (!document.querySelector('link[href*="leaflet.css"]')) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                document.head.appendChild(link);
            }

            // Clean up previous instance
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
            }

            const map = L.map(mapRef.current).setView([latitude, longitude], 15);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map);

            // Custom marker icon
            const icon = L.divIcon({
                html: `<div style="background:#6366f1;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 7v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7"/>
                        <path d="M21 7L12 2L3 7"/>
                        <path d="M9 22V12h6v10"/>
                    </svg>
                </div>`,
                className: "",
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32],
            });

            L.marker([latitude, longitude], { icon })
                .addTo(map)
                .bindPopup(`<strong>${name || "Hotel"}</strong>`)
                .openPopup();

            mapInstanceRef.current = map;

            // Fix map size after render
            setTimeout(() => map.invalidateSize(), 100);
        });

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [latitude, longitude, name]);

    if (!latitude || !longitude) {
        return (
            <div className={`${className} bg-muted flex items-center justify-center text-muted-foreground text-sm`}>
                No location set
            </div>
        );
    }

    return <div ref={mapRef} className={className} />;
}
