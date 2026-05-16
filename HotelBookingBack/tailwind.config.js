import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    darkMode: ["class"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Geist Variable", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                },
                destructive: {
                    DEFAULT: "var(--destructive)",
                    foreground: "var(--destructive-foreground)",
                },
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                popover: {
                    DEFAULT: "var(--popover)",
                    foreground: "var(--popover-foreground)",
                },
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
                "4xl": "2rem",
                "5xl": "2.5rem",
            },
            backdropBlur: {
                xs: "2px",
                glass: "16px",
                "glass-strong": "28px",
            },
            transitionTimingFunction: {
                spring: "var(--ease-spring)",
                "out-expo": "var(--ease-out-expo)",
            },
            transitionDuration: {
                400: "400ms",
            },
            boxShadow: {
                glow: "0 0 0 1px oklch(1 0 0 / 0.05), 0 8px 24px -8px oklch(0.55 0.18 265 / 0.35)",
                "glow-lg": "0 0 0 1px oklch(1 0 0 / 0.05), 0 20px 50px -12px oklch(0.55 0.18 265 / 0.45)",
                soft: "0 1px 2px oklch(0 0 0 / 0.04), 0 8px 24px -8px oklch(0 0 0 / 0.08)",
            },
            keyframes: {
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(8px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "scale-in": {
                    "0%": { opacity: "0", transform: "scale(0.96)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                shimmer: {
                    "100%": { transform: "translateX(100%)" },
                },
            },
            animation: {
                "fade-up": "fade-up 0.4s var(--ease-out-expo) both",
                "scale-in": "scale-in 0.25s var(--ease-out-expo) both",
                shimmer: "shimmer 2s linear infinite",
            },
        },
    },

    plugins: [forms, animate],
};
