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
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

export default function Edit({ payment }) {
    const booking = payment.booking;
    const user = booking?.user;
    const hotel = booking?.room?.hotel;

    const { data, setData, patch, processing, errors } = useForm({
        amount: payment.amount || "",
        method: payment.method || "card",
        status: payment.status || "pending",
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("admin.payments.update", payment.uuid), {
            onSuccess: () => toast.success("Payment updated successfully"),
            onError: () => toast.error("Failed to update payment"),
        });
    };

    return (
        <AdminLayout>
            <Head title={`Edit Payment - ${payment.transaction_id || `PAY-${payment.id}`}`} />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={route("admin.payments.index")}>
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Edit Payment
                    </h2>
                </div>

                <form onSubmit={submit}>
                    <div className="space-y-6">
                        {/* Read-only Booking Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Booking Information</CardTitle>
                                <CardDescription>
                                    Associated booking details (read-only).
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Booking ID
                                        </Label>
                                        <p className="font-semibold">
                                            #{booking?.id || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Guest
                                        </Label>
                                        <p className="font-semibold">
                                            {user?.name || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Hotel
                                        </Label>
                                        <p className="font-semibold">
                                            {hotel?.name || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Editable Payment Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Details</CardTitle>
                                <CardDescription>
                                    Update the payment information for
                                    transaction{" "}
                                    <strong>
                                        {payment.transaction_id ||
                                            `PAY-${payment.id}`}
                                    </strong>
                                    .
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="amount">
                                            Amount ($)
                                        </Label>
                                        <Input
                                            id="amount"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={data.amount}
                                            onChange={(e) =>
                                                setData(
                                                    "amount",
                                                    e.target.value,
                                                )
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
                                    <Link
                                        href={route("admin.payments.index")}
                                    >
                                        Cancel
                                    </Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? "Saving..."
                                        : "Update Payment"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
