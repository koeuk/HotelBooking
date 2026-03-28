import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/dialog";
import { Eye, CreditCard, DollarSign, Plus, Edit, Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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

export default function Index({ payments }) {
    const [paymentToDelete, setPaymentToDelete] = useState(null);
    const { delete: destroy, processing } = useForm();

    const updateStatus = (id, status) => {
        router.patch(route("dashboard.payments.update", id), { status }, {
            onSuccess: () => toast.success("Payment status updated"),
        });
    };

    const handleDelete = () => {
        destroy(route("dashboard.payments.destroy", paymentToDelete.uuid), {
            onSuccess: () => {
                setPaymentToDelete(null);
                toast.success("Payment deleted successfully");
            },
            onError: () => toast.error("Failed to delete payment"),
        });
    };

    return (
        <DashboardLayout>
            <Head title="Payments Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Payments
                        </h2>
                        <p className="text-muted-foreground">
                            Monitor transaction history and payment statuses.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route("dashboard.payments.create")}>
                            <Plus className="mr-2 h-4 w-4" /> Add Payment
                        </Link>
                    </Button>
                </div>

                <div className="bg-card rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead>Booking</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.data.map((payment) => (
                                <TableRow key={payment.id}>
                                    <TableCell className="font-mono text-xs">
                                        {payment.transaction_id ||
                                            `PAY-${payment.id}`}
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            href={route(
                                                "dashboard.bookings.show",
                                                payment.booking.uuid,
                                            )}
                                            className="text-primary hover:underline"
                                        >
                                            #{payment.booking_id}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {payment.booking.user.name}
                                    </TableCell>
                                    <TableCell className="font-semibold">
                                        ${payment.amount}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className="uppercase text-[10px]"
                                        >
                                            {payment.method}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            defaultValue={payment.status}
                                            onValueChange={(v) =>
                                                updateStatus(payment.uuid, v)
                                            }
                                            disabled={false}
                                        >
                                            <SelectTrigger className="w-[120px] h-8 text-xs">
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
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                        >
                                            <Link
                                                href={route(
                                                    "dashboard.payments.show",
                                                    payment.uuid,
                                                )}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            asChild
                                        >
                                            <Link
                                                href={route(
                                                    "dashboard.payments.edit",
                                                    payment.uuid,
                                                )}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() =>
                                                setPaymentToDelete(payment)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {payments.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center py-8 text-muted-foreground"
                                    >
                                        No payments found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {payments.links.length > 3 && (
                    <div className="flex items-center justify-end space-x-2">
                        {payments.links.map((link, i) => (
                            <Button
                                key={i}
                                variant={link.active ? "default" : "outline"}
                                size="sm"
                                asChild={!!link.url}
                                disabled={!link.url}
                                className={!link.url ? "opacity-50" : ""}
                            >
                                {link.url ? (
                                    <Link
                                        href={link.url}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ) : (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                )}
                            </Button>
                        ))}
                    </div>
                )}
            </div>

            <Dialog open={!!paymentToDelete} onOpenChange={(open) => !open && setPaymentToDelete(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="text-center sm:text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                            <AlertTriangle className="h-7 w-7 text-destructive" />
                        </div>
                        <DialogTitle className="text-xl">Delete Payment</DialogTitle>
                        <DialogDescription className="pt-2 text-center">
                            Are you sure? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    {paymentToDelete && (
                        <div className="rounded-xl bg-muted/50 p-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">User</span>
                                <span className="font-medium">{paymentToDelete.booking.user.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Booking</span>
                                <span className="font-medium">#{paymentToDelete.booking_id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Amount</span>
                                <span className="font-medium">${paymentToDelete.amount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Method</span>
                                <span className="font-medium uppercase">{paymentToDelete.method}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Status</span>
                                <span className="font-medium capitalize">{paymentToDelete.status}</span>
                            </div>
                        </div>
                    )}
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" className="flex-1" onClick={() => setPaymentToDelete(null)}>Cancel</Button>
                        <Button variant="destructive" className="flex-1" onClick={handleDelete} disabled={processing}>
                            {processing ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}
