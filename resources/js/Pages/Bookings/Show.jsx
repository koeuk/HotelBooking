import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    Hotel,
    CalendarDays,
    CreditCard,
    Star,
    BedDouble,
    DollarSign,
    MessageSquare,
    MapPin,
} from "lucide-react";
import HotelMap from "@/components/HotelMap";

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

export default function BookingShow({ booking }) {
    const hotel = booking.room?.hotel;
    const roomType = booking.room?.room_type;
    const payment = booking.payment;
    const review = booking.review;

    return (
        <AuthenticatedLayout>
            <Head title={`Booking #${booking.id}`} />

            <div className="space-y-6">
                {/* Back Button */}
                <Button variant="ghost" size="sm" asChild>
                    <Link href={route("bookings.index")}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to My Bookings
                    </Link>
                </Button>

                {/* Header */}
                <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Booking #{booking.id}
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            {hotel?.name || "Hotel"}
                        </p>
                    </div>
                    {getStatusBadge(booking.status)}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Hotel & Room Info */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Hotel className="h-5 w-5 text-primary" />
                                    Hotel & Room Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-muted/50">
                                        <p className="text-sm font-medium text-muted-foreground">Hotel</p>
                                        <p className="font-semibold mt-1">{hotel?.name || "N/A"}</p>
                                        {hotel?.city && (
                                            <p className="text-sm text-muted-foreground">
                                                {hotel.city}, {hotel.country}
                                            </p>
                                        )}
                                    </div>
                                    <div className="p-4 rounded-xl bg-muted/50">
                                        <p className="text-sm font-medium text-muted-foreground">Room</p>
                                        <p className="font-semibold mt-1 flex items-center gap-2">
                                            <BedDouble className="h-4 w-4" />
                                            {roomType?.name || "N/A"}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Room #{booking.room?.room_number}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Hotel Location Map */}
                        {hotel?.latitude && hotel?.longitude && (
                            <Card className="border-none shadow-sm overflow-hidden">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <MapPin className="h-5 w-5 text-primary" />
                                        Hotel Location
                                    </CardTitle>
                                    <CardDescription>
                                        {hotel.address && `${hotel.address}, `}{hotel.city}, {hotel.country}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <HotelMap
                                        latitude={hotel.latitude}
                                        longitude={hotel.longitude}
                                        name={hotel.name}
                                        className="h-[250px] w-full"
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Dates & Price */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <CalendarDays className="h-5 w-5 text-primary" />
                                    Stay Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="p-4 rounded-xl bg-muted/50">
                                        <p className="text-sm font-medium text-muted-foreground">Check-in</p>
                                        <p className="font-semibold mt-1">
                                            {new Date(booking.check_in_date).toLocaleDateString("en-US", {
                                                weekday: "short",
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-muted/50">
                                        <p className="text-sm font-medium text-muted-foreground">Check-out</p>
                                        <p className="font-semibold mt-1">
                                            {new Date(booking.check_out_date).toLocaleDateString("en-US", {
                                                weekday: "short",
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-primary/5">
                                        <p className="text-sm font-medium text-muted-foreground">Total Price</p>
                                        <p className="font-bold text-2xl mt-1 text-primary flex items-center gap-1">
                                            <DollarSign className="h-5 w-5" />
                                            {booking.total_price}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Review */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <MessageSquare className="h-5 w-5 text-primary" />
                                    Review
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {review ? (
                                    <div className="p-4 rounded-xl bg-muted/50">
                                        <div className="flex items-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${
                                                        i < review.rating
                                                            ? "fill-amber-400 text-amber-400"
                                                            : "text-zinc-300"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-sm">{review.comment}</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                                            <MessageSquare className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <p className="text-muted-foreground font-medium">No review yet</p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            You haven't reviewed this stay yet.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar - Payment Info */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <CreditCard className="h-5 w-5 text-primary" />
                                    Payment Info
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {payment ? (
                                    <div className="space-y-4">
                                        <div className="p-4 rounded-xl bg-muted/50 space-y-3">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Status</p>
                                                <div className="mt-1">
                                                    <Badge
                                                        className={
                                                            payment.status === "paid"
                                                                ? "bg-green-100 text-green-800 border-green-200"
                                                                : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                                        }
                                                    >
                                                        {payment.status?.charAt(0).toUpperCase() + payment.status?.slice(1)}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <Separator />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Method</p>
                                                <p className="font-semibold mt-1 capitalize">{payment.payment_method || "N/A"}</p>
                                            </div>
                                            {payment.transaction_id && (
                                                <>
                                                    <Separator />
                                                    <div>
                                                        <p className="text-sm font-medium text-muted-foreground">Transaction ID</p>
                                                        <p className="font-mono text-sm mt-1 break-all">{payment.transaction_id}</p>
                                                    </div>
                                                </>
                                            )}
                                            <Separator />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Amount</p>
                                                <p className="font-bold text-lg mt-1">${payment.amount}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                                            <CreditCard className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <p className="text-muted-foreground font-medium">No payment recorded</p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Payment details will appear here once processed.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
