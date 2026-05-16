import DashboardLayout from "@/Layouts/DashboardLayout";
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
    Edit,
    Ticket,
    Calendar,
    Percent,
    Hash,
} from "lucide-react";

export default function Show({ coupon }) {
    const now = new Date();
    const validFrom = new Date(coupon.valid_from);
    const validUntil = new Date(coupon.valid_until);
    const isActive = now >= validFrom && now <= validUntil;
    const isExpired = now > validUntil;
    const isUpcoming = now < validFrom;

    const statusLabel = isActive
        ? "Active"
        : isExpired
          ? "Expired"
          : "Upcoming";
    const statusClass = isActive
        ? "bg-green-100 text-green-800"
        : isExpired
          ? "bg-red-100 text-red-800"
          : "bg-blue-100 text-blue-800";

    return (
        <DashboardLayout>
            <Head title={`Coupon - ${coupon.code}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href={route("dashboard.coupons.index")}>
                                <ChevronLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Coupon Details
                        </h2>
                        <Badge className={statusClass}>{statusLabel}</Badge>
                    </div>
                    <Button asChild>
                        <Link
                            href={route("dashboard.coupons.edit", coupon.uuid)}
                        >
                            <Edit className="mr-2 h-4 w-4" /> Edit Coupon
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Coupon Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Ticket className="h-5 w-5" /> Coupon
                                Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-muted-foreground">
                                    Code
                                </Label>
                                <p className="text-2xl font-mono font-bold mt-1">
                                    {coupon.code}
                                </p>
                            </div>
                            <Separator />
                            <div>
                                <Label className="text-muted-foreground">
                                    Discount
                                </Label>
                                <div className="flex items-center gap-2 mt-1">
                                    <Percent className="h-5 w-5 text-primary" />
                                    <span className="text-2xl font-bold text-primary">
                                        {coupon.discount_percent}%
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Usage & Validity */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" /> Validity &
                                Usage
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-muted-foreground">
                                        Valid From
                                    </Label>
                                    <p className="font-medium mt-1">
                                        {validFrom.toLocaleDateString(
                                            undefined,
                                            { dateStyle: "long" }
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">
                                        Valid Until
                                    </Label>
                                    <p className="font-medium mt-1">
                                        {validUntil.toLocaleDateString(
                                            undefined,
                                            { dateStyle: "long" }
                                        )}
                                    </p>
                                </div>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-muted-foreground">
                                        Max Uses
                                    </Label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Hash className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-lg font-semibold">
                                            {coupon.max_uses === 0
                                                ? "Unlimited"
                                                : coupon.max_uses}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">
                                        Times Used
                                    </Label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Hash className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-lg font-semibold">
                                            {coupon.used_count ?? 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {coupon.max_uses > 0 && (
                                <>
                                    <Separator />
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Usage Progress
                                        </Label>
                                        <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                                            <div
                                                className="bg-primary h-2.5 rounded-full"
                                                style={{
                                                    width: `${Math.min(
                                                        ((coupon.used_count ??
                                                            0) /
                                                            coupon.max_uses) *
                                                            100,
                                                        100
                                                    )}%`,
                                                }}
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {coupon.used_count ?? 0} of{" "}
                                            {coupon.max_uses} uses
                                        </p>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
