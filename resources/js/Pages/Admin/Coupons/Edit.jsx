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
import { ChevronLeft } from "lucide-react";

export default function Edit({ coupon }) {
    const { data, setData, put, processing, errors } = useForm({
        code: coupon.code || "",
        discount_percent: coupon.discount_percent ?? "",
        valid_from: coupon.valid_from ? coupon.valid_from.slice(0, 10) : "",
        valid_until: coupon.valid_until ? coupon.valid_until.slice(0, 10) : "",
        max_uses: coupon.max_uses ?? "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("admin.coupons.update", coupon.uuid));
    };

    return (
        <AdminLayout>
            <Head title={`Edit Coupon - ${coupon.code}`} />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={route("admin.coupons.index")}>
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Edit Coupon
                    </h2>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Coupon Details</CardTitle>
                            <CardDescription>
                                Update details for coupon{" "}
                                <strong>{coupon.code}</strong>.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="code">Code</Label>
                                <Input
                                    id="code"
                                    value={data.code}
                                    onChange={(e) =>
                                        setData(
                                            "code",
                                            e.target.value.toUpperCase(),
                                        )
                                    }
                                    placeholder="SUMMER2026"
                                />
                                {errors.code && (
                                    <p className="text-sm text-destructive">
                                        {errors.code}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="discount_percent">
                                    Discount Percent
                                </Label>
                                <Input
                                    id="discount_percent"
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={data.discount_percent}
                                    onChange={(e) =>
                                        setData(
                                            "discount_percent",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="10"
                                />
                                {errors.discount_percent && (
                                    <p className="text-sm text-destructive">
                                        {errors.discount_percent}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="valid_from">
                                        Valid From
                                    </Label>
                                    <Input
                                        id="valid_from"
                                        type="date"
                                        value={data.valid_from}
                                        onChange={(e) =>
                                            setData(
                                                "valid_from",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.valid_from && (
                                        <p className="text-sm text-destructive">
                                            {errors.valid_from}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="valid_until">
                                        Valid Until
                                    </Label>
                                    <Input
                                        id="valid_until"
                                        type="date"
                                        value={data.valid_until}
                                        onChange={(e) =>
                                            setData(
                                                "valid_until",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.valid_until && (
                                        <p className="text-sm text-destructive">
                                            {errors.valid_until}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="max_uses">Max Uses</Label>
                                <Input
                                    id="max_uses"
                                    type="number"
                                    min="1"
                                    value={data.max_uses}
                                    onChange={(e) =>
                                        setData("max_uses", e.target.value)
                                    }
                                    placeholder="100"
                                />
                                {errors.max_uses && (
                                    <p className="text-sm text-destructive">
                                        {errors.max_uses}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4 border-t px-6 py-4">
                            <Button variant="outline" asChild>
                                <Link href={route("admin.coupons.index")}>
                                    Cancel
                                </Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? "Saving..."
                                    : "Update Coupon"}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AdminLayout>
    );
}
