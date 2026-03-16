import WebLayout from "@/Layouts/WebLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    CalendarCheck,
    Hotel,
    ArrowRight,
    CalendarDays,
    CreditCard,
    Luggage,
} from "lucide-react";

const getStatusBadge = (status) => {
    const styles = {
        pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
        confirmed: "bg-green-100 text-green-800 border-green-200",
        cancelled: "bg-red-100 text-red-800 border-red-200",
        completed: "bg-blue-100 text-blue-800 border-blue-200",
    };
    return (
        <Badge variant="outline" className={styles[status] || ""}>
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
        </Badge>
    );
};

const getPaymentBadge = (payment) => {
    if (!payment) return <Badge variant="outline" className="text-muted-foreground">Unpaid</Badge>;
    if (payment.status === "paid") return <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>;
    return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">{payment.status}</Badge>;
};

export default function BookingsIndex({ bookings }) {
    const bookingData = bookings.data || [];

    return (
        <WebLayout>
            <Head title="My Bookings" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600 via-amber-500 to-orange-600 p-8 text-white shadow-lg">
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-xl" />
                    <div className="absolute right-8 bottom-4 opacity-10">
                        <Luggage className="h-32 w-32" />
                    </div>
                    <div className="relative">
                        <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
                        <p className="mt-2 text-white/80 max-w-lg">
                            View and manage all your hotel reservations in one place.
                        </p>
                    </div>
                </div>

                {/* Bookings List */}
                {bookingData.length > 0 ? (
                    <div className="space-y-4">
                        {bookingData.map((booking) => (
                            <Link
                                key={booking.id}
                                href={route("bookings.show", booking.id)}
                                className="block"
                            >
                                <Card className="border-none shadow-sm hover:shadow-md transition-all">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="hidden sm:flex h-14 w-14 rounded-xl bg-primary/10 items-center justify-center shrink-0">
                                                <Hotel className="h-6 w-6 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className="font-semibold truncate">
                                                        {booking.room?.hotel?.name || "Hotel"}
                                                    </p>
                                                    {getStatusBadge(booking.status)}
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-0.5">
                                                    {booking.room?.room_type?.name || "Room"} &middot; Room #{booking.room?.room_number}
                                                </p>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                                    <CalendarDays className="h-3.5 w-3.5" />
                                                    {new Date(booking.check_in_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                    {" "}&rarr;{" "}
                                                    {new Date(booking.check_out_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0 flex flex-col items-end gap-1">
                                                <p className="font-bold text-lg">${booking.total_price}</p>
                                                {getPaymentBadge(booking.payment)}
                                            </div>
                                            <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 hidden sm:block" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <Card className="border-none shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                    <CalendarCheck className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <p className="text-muted-foreground font-medium text-lg">No bookings yet</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Your reservations will appear here once you book a hotel.
                                </p>
                                <Button variant="outline" className="mt-6" asChild>
                                    <Link href={route("hotels.index")}>
                                        Browse Hotels
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {bookings.links && bookings.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {bookings.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || "#"}
                                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                    link.active
                                        ? "bg-primary text-primary-foreground"
                                        : link.url
                                        ? "hover:bg-muted"
                                        : "text-muted-foreground cursor-not-allowed"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                preserveScroll
                            />
                        ))}
                    </div>
                )}
            </div>
        </WebLayout>
    );
}
