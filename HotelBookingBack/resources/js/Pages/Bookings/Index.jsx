import UserLayout from "@/Layouts/UserLayout";
import { Head, Link } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    CalendarCheck,
    Hotel,
    ArrowRight,
    CalendarDays,
    Sparkles,
} from "lucide-react";

const statusStyles = {
    pending:
        "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    confirmed:
        "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    cancelled:
        "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
    completed:
        "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20",
};

function StatusBadge({ status }) {
    return (
        <Badge
            variant="outline"
            className={statusStyles[status] || ""}
        >
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
        </Badge>
    );
}

function PaymentBadge({ payment }) {
    if (!payment)
        return (
            <Badge
                variant="outline"
                className="text-muted-foreground"
            >
                Unpaid
            </Badge>
        );
    if (payment.status === "paid")
        return (
            <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                Paid
            </Badge>
        );
    return (
        <Badge
            variant="outline"
            className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
        >
            {payment.status}
        </Badge>
    );
}

export default function BookingsIndex({ bookings }) {
    const bookingData = bookings.data || [];

    return (
        <UserLayout title="My Bookings">
            <Head title="My Bookings" />

            <div className="space-y-8">
                {/* Hero */}
                <div className="relative overflow-hidden rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-primary" />
                    <div className="absolute inset-0 bg-gradient-mesh opacity-30 mix-blend-overlay" />
                    <div className="absolute inset-0 noise opacity-30" />
                    <div className="relative p-8 text-primary-foreground space-y-2">
                        <Badge
                            variant="outline"
                            className="glass border-white/20 text-white w-fit"
                        >
                            <Sparkles className="h-3 w-3" />
                            {bookings.total ?? bookingData.length}{" "}
                            {(bookings.total ?? bookingData.length) === 1
                                ? "booking"
                                : "bookings"}
                        </Badge>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                            My bookings
                        </h1>
                        <p className="text-primary-foreground/85 max-w-lg">
                            View and manage all your hotel reservations in one
                            place.
                        </p>
                    </div>
                </div>

                {/* List */}
                {bookingData.length > 0 ? (
                    <div className="space-y-3">
                        {bookingData.map((booking, idx) => (
                            <Link
                                key={booking.id}
                                href={route("bookings.show", booking.uuid)}
                                className="block animate-fade-up"
                                style={{
                                    animationDelay: `${Math.min(idx * 40, 240)}ms`,
                                }}
                            >
                                <Card
                                    variant="elevated"
                                    interactive
                                    className="overflow-hidden"
                                >
                                    <CardContent className="p-5">
                                        <div className="flex items-center gap-4">
                                            <div className="hidden sm:flex h-14 w-14 rounded-2xl bg-gradient-primary-soft items-center justify-center shrink-0">
                                                <Hotel className="h-6 w-6 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className="font-semibold truncate">
                                                        {booking.room?.hotel
                                                            ?.name || "Hotel"}
                                                    </p>
                                                    <StatusBadge
                                                        status={booking.status}
                                                    />
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-0.5">
                                                    {booking.room?.room_type
                                                        ?.name || "Room"}{" "}
                                                    · Room #
                                                    {booking.room?.room_number}
                                                </p>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1.5">
                                                    <CalendarDays className="h-3.5 w-3.5" />
                                                    {new Date(
                                                        booking.check_in_date,
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            month: "short",
                                                            day: "numeric",
                                                        },
                                                    )}{" "}
                                                    →{" "}
                                                    {new Date(
                                                        booking.check_out_date,
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        },
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0 flex flex-col items-end gap-1">
                                                <p className="font-bold text-lg text-gradient-primary">
                                                    ${booking.total_price}
                                                </p>
                                                <PaymentBadge
                                                    payment={booking.payment}
                                                />
                                            </div>
                                            <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 hidden sm:block transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <Card variant="soft" className="text-center py-16">
                        <CardContent>
                            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-primary-soft flex items-center justify-center mb-4">
                                <CalendarCheck className="h-8 w-8 text-primary" />
                            </div>
                            <p className="font-semibold text-lg">
                                No bookings yet
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Your reservations will appear here once you
                                book a hotel.
                            </p>
                            <Button
                                variant="gradient"
                                shape="pill"
                                size="lg"
                                className="mt-6"
                                asChild
                            >
                                <Link href={route("hotels.index")}>
                                    Browse hotels
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {bookings.links && bookings.last_page > 1 && (
                    <div className="flex items-center justify-center gap-1">
                        {bookings.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || "#"}
                                className={`min-w-9 h-9 inline-flex items-center justify-center px-3 text-sm rounded-full transition-all ${
                                    link.active
                                        ? "bg-gradient-primary text-primary-foreground shadow-glow"
                                        : link.url
                                          ? "hover:bg-muted"
                                          : "text-muted-foreground cursor-not-allowed"
                                }`}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                                preserveScroll
                            />
                        ))}
                    </div>
                )}
            </div>
        </UserLayout>
    );
}
