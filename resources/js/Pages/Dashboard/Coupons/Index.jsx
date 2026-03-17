import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Index({ coupons }) {
    const [couponToDelete, setCouponToDelete] = useState(null);
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route("dashboard.coupons.destroy", couponToDelete.uuid), {
            onSuccess: () => {
                setCouponToDelete(null);
                toast.success("Coupon deleted successfully");
            },
            onError: (err) =>
                toast.error(err.msg || "Failed to delete coupon"),
        });
    };

    const isActive = (coupon) => {
        return new Date(coupon.valid_until) >= new Date();
    };

    return (
        <DashboardLayout>
            <Head title="Coupons Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Coupons
                        </h2>
                        <p className="text-muted-foreground">
                            Manage discount coupons and promotional codes.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route("dashboard.coupons.create")}>
                            <Plus className="mr-2 h-4 w-4" /> New Coupon
                        </Link>
                    </Button>
                </div>

                <div className="bg-card rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Discount %</TableHead>
                                <TableHead>Valid From</TableHead>
                                <TableHead>Valid Until</TableHead>
                                <TableHead>Max Uses</TableHead>
                                <TableHead>Used</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {coupons.data.map((coupon) => (
                                <TableRow key={coupon.id}>
                                    <TableCell className="font-medium">
                                        {coupon.code}
                                    </TableCell>
                                    <TableCell>
                                        {coupon.discount_percent}%
                                    </TableCell>
                                    <TableCell>{coupon.valid_from}</TableCell>
                                    <TableCell>{coupon.valid_until}</TableCell>
                                    <TableCell>{coupon.max_uses}</TableCell>
                                    <TableCell>{coupon.used_count}</TableCell>
                                    <TableCell>
                                        {isActive(coupon) ? (
                                            <Badge className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20">
                                                Active
                                            </Badge>
                                        ) : (
                                            <Badge variant="destructive">
                                                Expired
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                        >
                                            <Link
                                                href={route(
                                                    "dashboard.coupons.show",
                                                    coupon.uuid,
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
                                                    "dashboard.coupons.edit",
                                                    coupon.uuid,
                                                )}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                        </Button>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() =>
                                                        setCouponToDelete(
                                                            coupon,
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Are you absolutely
                                                        sure?
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        This action cannot be
                                                        undone. This will
                                                        permanently delete the
                                                        coupon
                                                        <strong>
                                                            {" "}
                                                            {coupon.code}
                                                        </strong>
                                                        .
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() =>
                                                            setCouponToDelete(
                                                                null,
                                                            )
                                                        }
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        onClick={handleDelete}
                                                        disabled={processing}
                                                    >
                                                        {processing
                                                            ? "Deleting..."
                                                            : "Delete Coupon"}
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {coupons.links.length > 3 && (
                    <div className="flex items-center justify-end space-x-2">
                        {coupons.links.map((link, i) => (
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
        </DashboardLayout>
    );
}
