import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    ChevronLeft,
    Mail,
    Phone,
    Calendar,
    Hotel,
    DollarSign,
    CreditCard,
    Loader2,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Show({ booking }) {
    const [processing, setProcessing] = useState(false);
    const [paymentOpen, setPaymentOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [paymentProcessing, setPaymentProcessing] = useState(false);

    const updateStatus = (status) => {
        setProcessing(true);
        router.patch(route("admin.bookings.update", booking.uuid), { status }, {
            onSuccess: () => toast.success("Status updated"),
            onFinish: () => setProcessing(false),
        });
    };

    const handleRecordPayment = () => {
        setPaymentProcessing(true);
        router.post(
            route("admin.payments.store"),
            {
                booking_id: booking.id,
                amount: booking.total_price,
                method: paymentMethod,
                status: "paid",
            },
            {
                onSuccess: () => {
                    toast.success("Payment recorded successfully");
                    setPaymentOpen(false);
                },
                onError: () => toast.error("Failed to record payment"),
                onFinish: () => setPaymentProcessing(false),
            },
        );
    };

    return (
        <AdminLayout>
            <Head title={`Booking Details - #${booking.id}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href={route("admin.bookings.index")}>
                                <ChevronLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Booking Details
                        </h2>
                        <Badge variant="outline" className="text-lg">
                            #{booking.id}
                        </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground mr-2">
                            Update Status:
                        </span>
                        <Select
                            defaultValue={booking.status}
                            onValueChange={updateStatus}
                            disabled={processing}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">
                                    Confirmed
                                </SelectItem>
                                <SelectItem value="cancelled">
                                    Cancelled
                                </SelectItem>
                                <SelectItem value="completed">
                                    Completed
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Guest & Stay Details */}
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Hotel className="h-5 w-5" /> Stay
                                    Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Hotel
                                        </Label>
                                        <p className="font-semibold text-lg">
                                            {booking.room.hotel.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {booking.room.hotel.city},{" "}
                                            {booking.room.hotel.country}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Room Type
                                        </Label>
                                        <p className="font-semibold text-lg">
                                            {booking.room.room_type.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Room #: {booking.room.room_number}
                                        </p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-md">
                                            <Calendar className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                                                Check In
                                            </Label>
                                            <p className="font-medium">
                                                {new Date(
                                                    booking.check_in_date,
                                                ).toLocaleDateString(
                                                    undefined,
                                                    { dateStyle: "long" },
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-md">
                                            <Calendar className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                                                Check Out
                                            </Label>
                                            <p className="font-medium">
                                                {new Date(
                                                    booking.check_out_date,
                                                ).toLocaleDateString(
                                                    undefined,
                                                    { dateStyle: "long" },
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5" /> Payment
                                    Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
                                    <span className="text-lg font-medium">
                                        Total Amount
                                    </span>
                                    <span className="text-2xl font-bold text-primary">
                                        ${booking.total_price}
                                    </span>
                                </div>

                                {booking.payment ? (
                                    <div className="space-y-3 pt-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground italic">
                                                Transaction ID:
                                            </span>
                                            <span className="font-mono">
                                                {booking.payment
                                                    .transaction_id || "N/A"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground italic">
                                                Method:
                                            </span>
                                            <span className="uppercase">
                                                {booking.payment.method}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-muted-foreground italic">
                                                Payment Status:
                                            </span>
                                            <Badge
                                                className={
                                                    booking.payment.status ===
                                                    "paid"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }
                                            >
                                                {booking.payment.status.toUpperCase()}
                                            </Badge>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="text-center py-4 text-muted-foreground">
                                            No payment record associated with
                                            this booking.
                                        </div>
                                        {booking.status !== "cancelled" && (
                                            <Dialog
                                                open={paymentOpen}
                                                onOpenChange={setPaymentOpen}
                                            >
                                                <DialogTrigger asChild>
                                                    <Button className="w-full">
                                                        <CreditCard className="mr-2 h-4 w-4" />
                                                        Proceed to Payment
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Record Payment
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Record a payment of{" "}
                                                            <strong>
                                                                $
                                                                {
                                                                    booking.total_price
                                                                }
                                                            </strong>{" "}
                                                            for booking #
                                                            {booking.id}.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-4 py-4">
                                                        <div className="space-y-2">
                                                            <Label>
                                                                Payment Method
                                                            </Label>
                                                            <Select
                                                                value={
                                                                    paymentMethod
                                                                }
                                                                onValueChange={
                                                                    setPaymentMethod
                                                                }
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="card">
                                                                        Credit
                                                                        Card
                                                                    </SelectItem>
                                                                    <SelectItem value="cash">
                                                                        Cash
                                                                    </SelectItem>
                                                                    <SelectItem value="paypal">
                                                                        PayPal
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="flex justify-between items-center bg-muted p-3 rounded-lg">
                                                            <span className="font-medium">
                                                                Amount
                                                            </span>
                                                            <span className="text-lg font-bold text-primary">
                                                                $
                                                                {
                                                                    booking.total_price
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() =>
                                                                setPaymentOpen(
                                                                    false,
                                                                )
                                                            }
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            onClick={
                                                                handleRecordPayment
                                                            }
                                                            disabled={
                                                                paymentProcessing
                                                            }
                                                        >
                                                            {paymentProcessing && (
                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            )}
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
                    </div>

                    {/* Guest Info */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Guest Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col items-center gap-2 mb-4">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage
                                            src={booking.user.avatar}
                                        />
                                        <AvatarFallback className="text-2xl">
                                            {booking.user.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <h3 className="text-xl font-bold">
                                        {booking.user.name}
                                    </h3>
                                    <Badge variant="secondary">
                                        {booking.user.role}
                                    </Badge>
                                </div>
                                <Separator />
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span>{booking.user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span>
                                            {booking.user.phone ||
                                                "No phone provided"}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    asChild
                                >
                                    <Link
                                        href={route(
                                            "admin.users.edit",
                                            booking.user.uuid,
                                        )}
                                    >
                                        Edit User Profile
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
