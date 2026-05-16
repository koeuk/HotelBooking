import { useState } from "react";
import WebLayout from "@/Layouts/WebLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Textarea } from "@/components/ui/textarea";
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
import { Label } from "@/components/ui/label";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter,
    DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
    ArrowLeft, Hotel, CalendarDays, CreditCard, Star, BedDouble,
    DollarSign, MessageSquare, MapPin, XCircle, Loader2,
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

export default function BookingShow({ booking, canReview }) {
    const [payOpen, setPayOpen] = useState(false);
    const [payMethod, setPayMethod] = useState("card");
    const [payProcessing, setPayProcessing] = useState(false);
    const [cancelProcessing, setCancelProcessing] = useState(false);

    const handlePay = () => {
        setPayProcessing(true);
        router.post(route("bookings.pay", booking.uuid), { method: payMethod }, {
            onFinish: () => { setPayProcessing(false); setPayOpen(false); },
        });
    };

    const handleCancel = () => {
        setCancelProcessing(true);
        router.post(route("bookings.cancel", booking.uuid), {}, {
            onFinish: () => setCancelProcessing(false),
        });
    };
    const hotel = booking.room?.hotel;
    const roomType = booking.room?.room_type;
    const payment = booking.payment;
    const review = booking.review;

    return (
        <WebLayout>
            <Head title={`Booking #${booking.id}`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
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
                                    <div className="p-4 rounded-2xl bg-muted/40">
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
                                        {review.comment && (
                                            <p className="text-sm">
                                                {review.comment}
                                            </p>
                                        )}
                                    </div>
                                ) : canReview ? (
                                    <ReviewForm bookingUuid={booking.uuid} />
                                ) : (
                                    <ReviewLockedState
                                        status={booking.status}
                                        checkOut={booking.check_out_date}
                                    />
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
                                    <div className="space-y-4">
                                        <div className="flex flex-col items-center justify-center py-4 text-center">
                                            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                                                <CreditCard className="h-6 w-6 text-muted-foreground" />
                                            </div>
                                            <p className="text-muted-foreground font-medium">No payment yet</p>
                                        </div>
                                        {booking.status !== "cancelled" && (
                                            <Dialog open={payOpen} onOpenChange={setPayOpen}>
                                                <DialogTrigger asChild>
                                                    <Button className="w-full h-12 rounded-xl text-base">
                                                        <CreditCard className="mr-2 h-4 w-4" /> Pay Now — ${booking.total_price}
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Complete Payment</DialogTitle>
                                                        <DialogDescription>
                                                            Pay <strong>${booking.total_price}</strong> for your booking at {hotel?.name}.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-4 py-4">
                                                        <div className="space-y-2">
                                                            <Label>Payment Method</Label>
                                                            <Select value={payMethod} onValueChange={setPayMethod}>
                                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="card">Credit Card</SelectItem>
                                                                    <SelectItem value="cash">Cash</SelectItem>
                                                                    <SelectItem value="paypal">PayPal</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="p-3 bg-muted rounded-lg flex justify-between items-center">
                                                            <span className="font-medium">Total</span>
                                                            <span className="text-lg font-bold text-primary">${booking.total_price}</span>
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button variant="outline" onClick={() => setPayOpen(false)}>Cancel</Button>
                                                        <Button onClick={handlePay} disabled={payProcessing}>
                                                            {payProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                            Confirm Payment
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Cancel Booking */}
                        {booking.status === "pending" && (
                            <Card className="border-none shadow-sm">
                                <CardContent className="p-4">
                                    <Button
                                        variant="outline"
                                        className="w-full text-destructive hover:text-destructive hover:bg-destructive/5"
                                        onClick={handleCancel}
                                        disabled={cancelProcessing}
                                    >
                                        {cancelProcessing ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            <XCircle className="mr-2 h-4 w-4" />
                                        )}
                                        Cancel Booking
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </WebLayout>
    );
}

function ReviewForm({ bookingUuid }) {
    const [hoverRating, setHoverRating] = useState(0);
    const { data, setData, post, processing, errors } = useForm({
        rating: 0,
        comment: "",
    });

    const submit = (e) => {
        e.preventDefault();
        if (data.rating < 1) return;
        post(route("bookings.review", bookingUuid), {
            preserveScroll: true,
        });
    };

    const display = hoverRating || data.rating;

    return (
        <form onSubmit={submit} className="space-y-4">
            <div>
                <p className="text-sm font-medium mb-2">How was your stay?</p>
                <div
                    className="flex items-center gap-1"
                    onMouseLeave={() => setHoverRating(0)}
                >
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setData("rating", star)}
                            onMouseEnter={() => setHoverRating(star)}
                            aria-label={`${star} star${star === 1 ? "" : "s"}`}
                            className="p-1 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-md"
                        >
                            <Star
                                className={`h-7 w-7 transition-colors ${
                                    star <= display
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-muted-foreground/40"
                                }`}
                            />
                        </button>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                        {display > 0
                            ? `${display}/5`
                            : "Tap to rate"}
                    </span>
                </div>
                {errors.rating && (
                    <p className="text-sm text-destructive mt-1">
                        {errors.rating}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="comment"
                    className="text-xs uppercase tracking-wide text-muted-foreground"
                >
                    Your feedback (optional)
                </Label>
                <Textarea
                    id="comment"
                    rows={4}
                    placeholder="Share what made your stay memorable…"
                    value={data.comment}
                    onChange={(e) => setData("comment", e.target.value)}
                    className="rounded-2xl bg-muted/60 border-input px-4 py-3 focus-visible:bg-background focus-visible:border-primary/40 focus-visible:ring-4 focus-visible:ring-primary/15 transition-all duration-300"
                    maxLength={1000}
                />
                {errors.comment && (
                    <p className="text-sm text-destructive">
                        {errors.comment}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                variant="gradient"
                size="lg"
                shape="pill"
                disabled={processing || data.rating < 1}
            >
                {processing ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Submitting…
                    </>
                ) : (
                    <>
                        <Star className="h-4 w-4 mr-2 fill-current" />
                        Submit review
                    </>
                )}
            </Button>
        </form>
    );
}

function ReviewLockedState({ status, checkOut }) {
    let message = "You haven't reviewed this stay yet.";
    if (status === "pending") {
        message = "Confirm your booking before leaving a review.";
    } else if (status === "cancelled") {
        message = "Cancelled bookings can't be reviewed.";
    } else if (
        ["confirmed", "completed"].includes(status) &&
        new Date() < new Date(checkOut)
    ) {
        const out = new Date(checkOut).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
        message = `You can review your stay after check-out on ${out}.`;
    }
    return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <MessageSquare className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">No review yet</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                {message}
            </p>
        </div>
    );
}
