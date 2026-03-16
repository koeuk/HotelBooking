import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";

export default function Create({ bookings }) {
    const { data, setData, post, processing, errors } = useForm({
        booking_id: "",
        amount: "",
        method: "card",
        status: "pending",
    });

    const selectedBooking = bookings.find(
        (b) => String(b.id) === String(data.booking_id),
    );

    const handleBookingChange = (value) => {
        setData((prev) => {
            const booking = bookings.find((b) => String(b.id) === String(value));
            return {
                ...prev,
                booking_id: value,
                amount: booking ? booking.total_price : prev.amount,
            };
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.payments.store"));
    };

    return (
        <AdminLayout>
            <Head title="Add Payment" />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={route("admin.payments.index")}>
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Add Payment
                    </h2>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Details</CardTitle>
                            <CardDescription>
                                Record a new payment for an existing booking.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="booking_id">Booking</Label>
                                <select
                                    id="booking_id"
                                    value={data.booking_id}
                                    onChange={(e) =>
                                        handleBookingChange(e.target.value)
                                    }
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                >
                                    <option value="">Select a booking</option>
                                    {bookings.map((booking) => (
                                        <option
                                            key={booking.id}
                                            value={String(booking.id)}
                                        >
                                            #{booking.id} - {booking.user.name} - {booking.room?.hotel?.name || "N/A"}
                                        </option>
                                    ))}
                                </select>
                                {errors.booking_id && (
                                    <p className="text-sm text-destructive">
                                        {errors.booking_id}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="amount">Amount ($)</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.amount}
                                        onChange={(e) =>
                                            setData("amount", e.target.value)
                                        }
                                        placeholder="0.00"
                                    />
                                    {errors.amount && (
                                        <p className="text-sm text-destructive">
                                            {errors.amount}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="method">
                                        Payment Method
                                    </Label>
                                    <Select
                                        value={data.method}
                                        onValueChange={(v) =>
                                            setData("method", v)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="card">
                                                Credit Card
                                            </SelectItem>
                                            <SelectItem value="cash">
                                                Cash
                                            </SelectItem>
                                            <SelectItem value="paypal">
                                                PayPal
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.method && (
                                        <p className="text-sm text-destructive">
                                            {errors.method}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(v) =>
                                        setData("status", v)
                                    }
                                >
                                    <SelectTrigger className="w-full md:w-1/2">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">
                                            Pending
                                        </SelectItem>
                                        <SelectItem value="paid">
                                            Paid
                                        </SelectItem>
                                        <SelectItem value="failed">
                                            Failed
                                        </SelectItem>
                                        <SelectItem value="refunded">
                                            Refunded
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-sm text-destructive">
                                        {errors.status}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4 border-t px-6 py-4">
                            <Button variant="outline" asChild>
                                <Link href={route("admin.payments.index")}>
                                    Cancel
                                </Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? "Saving..."
                                    : "Create Payment"}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AdminLayout>
    );
}
