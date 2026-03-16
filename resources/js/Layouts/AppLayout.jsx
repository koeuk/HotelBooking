import { usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AppLayout({ children }) {
    const { auth } = usePage().props;

    if (auth?.user?.role === "admin") {
        return <AdminLayout>{children}</AdminLayout>;
    }

    return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
