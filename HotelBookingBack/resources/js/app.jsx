import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { ThemeProvider } from '@/components/ThemeProvider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(el,
                <ThemeProvider defaultTheme="light" storageKey="hotel-theme">
                    <App {...props} />
                </ThemeProvider>
            );
            return;
        }

        createRoot(el).render(
            <ThemeProvider defaultTheme="light" storageKey="hotel-theme">
                <App {...props} />
            </ThemeProvider>
        );
    },
    progress: {
        color: '#6366f1',
        showSpinner: false,
    },
});
