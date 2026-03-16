import { usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import WebLayout from "@/Layouts/WebLayout";

export default function AppLayout({ children }) {
    const { auth } = usePage().props;

    if (auth?.user?.role === "admin") {
        return <AdminLayout>{children}</AdminLayout>;
    }

    return <WebLayout>{children}</WebLayout>;
}
