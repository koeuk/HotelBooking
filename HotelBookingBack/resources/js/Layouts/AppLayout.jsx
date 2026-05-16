import { usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import UserLayout from "@/Layouts/UserLayout";

export default function AppLayout({ children }) {
    const { auth } = usePage().props;

    if (auth?.user?.role === "admin") {
        return <DashboardLayout>{children}</DashboardLayout>;
    }

    return <UserLayout>{children}</UserLayout>;
}
