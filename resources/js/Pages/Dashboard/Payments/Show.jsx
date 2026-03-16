import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
    ChevronLeft,
    CreditCard,
    DollarSign,
    Hotel,
    User,
    Calendar,
    Edit,
} from "lucide-react";

const getStatusBadge = (status) => {
    switch (status) {
        case "pending":
            return (
                <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800 border-yellow-200"
                >
                    Pending
                </Badge>
            );
        case "paid":
            return (
                <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200">
                    Paid
                </Badge>
            );
        case "failed":
            return <Badge variant="destructive">Failed</Badge>;
        case "refunded":
            return (
                <Badge
                    variant="outline"
                    className="bg-blue-100 text-blue-800 border-blue-200"
                >
                    Refunded
                </Badge>
            );
        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
};

export default function Show({ payment }) {
    const booking = payment.booking;
    const user = booking?.user;
    const room = booking?.room;
    const hotel = room?.hotel;
    const roomType = room?.room_type;

    return (
        <AdminLayout>
            <Head title={`Payment - ${payment.transaction_id || `PAY-${payment.id}`}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href={route("admin.payments.index")}>
                                <ChevronLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Payment Details
                        </h2>
                    </div>
                    <Button asChild>
                        <Link href={route("admin.payments.edit", payment.uuid)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit Payment
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        {/* Payment Details Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" /> Payment
                                    Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Transaction ID
                                        </Label>
                                        <p className="font-mono font-semibold">
                                            {payment.transaction_id ||
                                                `PAY-${payment.id}`}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Status
                                        </Label>
                                        <div className="mt-1">
                                            {getStatusBadge(payment.status)}
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-md">
                                            <DollarSign className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                                                Amount
                                            </Label>
                                            <p className="text-xl font-bold text-primary">
                                                ${payment.amount}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Payment Method
                                        </Label>
                                        <p className="font-semibold uppercase">
                                            {payment.method}
                                        </p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Paid At
                                        </Label>
                                        <p className="font-medium">
                                            {payment.paid_at
                                                ? new Date(
                                                      payment.paid_at,
                                                  ).toLocaleDateString(
                                                      undefined,
                                                      {
                                                          dateStyle: "long",
                                                      },
                                                  )
                                                : "Not yet paid"}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Created At
                                        </Label>
                                        <p className="font-medium">
                                            {new Date(
                                                payment.created_at,
                                            ).toLocaleDateString(undefined, {
                                                dateStyle: "long",
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Booking Info Card */}
                        {booking && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Hotel className="h-5 w-5" /> Booking
                                        Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-muted-foreground">
                                                Booking ID
                                            </Label>
                                            <Link
                                                href={route(
                                                    "admin.bookings.show",
                                                    booking.uuid,
                                                )}
                                                className="text-primary hover:underline font-semibold text-lg block"
                                            >
                                                #{booking.id}
                                            </Link>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground">
                                                Hotel
                                            </Label>
                                            <p className="font-semibold text-lg">
                                                {hotel?.name || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-muted-foreground">
                                                Room Type
                                            </Label>
                                            <p className="font-medium">
                                                {roomType?.name || "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground">
                                                Room Number
                                            </Label>
                                            <p className="font-medium">
                                                {room?.room_number || "N/A"}
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
                                                    {booking.check_in_date
                                                        ? new Date(
                                                              booking.check_in_date,
                                                          ).toLocaleDateString(
                                                              undefined,
                                                              {
                                                                  dateStyle:
                                                                      "long",
                                                              },
                                                          )
                                                        : "N/A"}
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
                                                    {booking.check_out_date
                                                        ? new Date(
                                                              booking.check_out_date,
                                                          ).toLocaleDateString(
                                                              undefined,
                                                              {
                                                                  dateStyle:
                                                                      "long",
                                                              },
                                                          )
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
                                        <span className="text-lg font-medium">
                                            Booking Total
                                        </span>
                                        <span className="text-2xl font-bold text-primary">
                                            ${booking.total_price}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Guest Info */}
                    {user && (
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5" /> Guest
                                        Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Name
                                        </Label>
                                        <p className="font-semibold text-lg">
                                            {user.name}
                                        </p>
                                    </div>
                                    <Separator />
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Email
                                        </Label>
                                        <p className="font-medium">
                                            {user.email}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
