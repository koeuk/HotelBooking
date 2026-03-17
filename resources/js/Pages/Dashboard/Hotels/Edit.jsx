import DashboardLayout from "@/Layouts/DashboardLayout";
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
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";

export default function Edit({ hotel }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",
        name: hotel.name || "",
        description: hotel.description || "",
        address: hotel.address || "",
        city: hotel.city || "",
        country: hotel.country || "",
        latitude: hotel.latitude || "",
        longitude: hotel.longitude || "",
        rating: hotel.rating || 0,
        existing_images: hotel.images || [],
        new_images: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("dashboard.hotels.update", hotel.uuid), { forceFormData: true });
    };

    return (
        <DashboardLayout>
            <Head title={`Edit Hotel - ${hotel.name}`} />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={route("dashboard.hotels.index")}>
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h2 className="text-3xl font-bold tracking-tight">Edit Hotel</h2>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Hotel Details</CardTitle>
                            <CardDescription>
                                Update information for <strong>{hotel.name}</strong>.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Hotel Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    placeholder="e.g. Grand Plaza Hotel"
                                />
                                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    placeholder="Provide a detailed description of the hotel..."
                                    rows={5}
                                />
                                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData("address", e.target.value)}
                                        placeholder="123 Street Ave"
                                    />
                                    {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rating">Rating (0-5)</Label>
                                    <Input
                                        id="rating"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        value={data.rating}
                                        onChange={(e) => setData("rating", e.target.value)}
                                    />
                                    {errors.rating && <p className="text-sm text-destructive">{errors.rating}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        id="city"
                                        value={data.city}
                                        onChange={(e) => setData("city", e.target.value)}
                                        placeholder="City name"
                                    />
                                    {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Input
                                        id="country"
                                        value={data.country}
                                        onChange={(e) => setData("country", e.target.value)}
                                        placeholder="Country name"
                                    />
                                    {errors.country && <p className="text-sm text-destructive">{errors.country}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="latitude">Latitude</Label>
                                    <Input
                                        id="latitude"
                                        type="number"
                                        step="0.0000001"
                                        value={data.latitude}
                                        onChange={(e) => setData("latitude", e.target.value)}
                                        placeholder="e.g. 13.3633"
                                    />
                                    {errors.latitude && <p className="text-sm text-destructive">{errors.latitude}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="longitude">Longitude</Label>
                                    <Input
                                        id="longitude"
                                        type="number"
                                        step="0.0000001"
                                        value={data.longitude}
                                        onChange={(e) => setData("longitude", e.target.value)}
                                        placeholder="e.g. 103.8563"
                                    />
                                    {errors.longitude && <p className="text-sm text-destructive">{errors.longitude}</p>}
                                </div>
                            </div>

                            <ImageUploader
                                existingImages={data.existing_images}
                                onExistingChange={(imgs) => setData("existing_images", imgs)}
                                newFiles={data.new_images}
                                onFilesChange={(files) => setData("new_images", files)}
                                errors={errors.images || errors.new_images}
                            />
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4 border-t px-6 py-4">
                            <Button variant="outline" asChild>
                                <Link href={route("dashboard.hotels.index")}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? "Saving..." : "Update Hotel"}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </DashboardLayout>
    );
}
