import { usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import WebLayout from "@/Layouts/WebLayout";

export default function AppLayout({ children }) {
    const { auth } = usePage().props;

    if (auth?.user?.role === "admin") {
        return <DashboardLayout>{children}</DashboardLayout>;
    }

    return <WebLayout>{children}</WebLayout>;
}
