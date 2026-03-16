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
import {
    ChevronLeft,
    Edit,
    Hotel,
    MapPin,
    Sparkles,
} from "lucide-react";

export default function Show({ amenity }) {
    return (
        <AdminLayout>
            <Head title={`Amenity - ${amenity.name}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href={route("admin.amenities.index")}>
                                <ChevronLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Amenity Details
                        </h2>
                    </div>
                    <Button asChild>
                        <Link
                            href={route(
                                "admin.amenities.edit",
                                amenity.uuid
                            )}
                        >
                            <Edit className="mr-2 h-4 w-4" /> Edit Amenity
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Amenity Info Card */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center gap-3">
                                <div className="bg-primary/10 p-4 rounded-full">
                                    <Sparkles className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">
                                    {amenity.name}
                                </h3>
                                {amenity.icon && (
                                    <Badge variant="outline">
                                        Icon: {amenity.icon}
                                    </Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Associated Hotels Card */}
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Hotel className="h-5 w-5" /> Associated
                                    Hotels
                                    <Badge variant="outline" className="ml-2">
                                        {amenity.hotels?.length || 0}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {amenity.hotels &&
                                amenity.hotels.length > 0 ? (
                                    <div className="space-y-3">
                                        {amenity.hotels.map((hotel) => (
                                            <div
                                                key={hotel.id}
                                                className="flex items-center justify-between p-4 border rounded-lg"
                                            >
                                                <div className="space-y-1">
                                                    <p className="font-semibold">
                                                        {hotel.name}
                                                    </p>
                                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                        <MapPin className="h-3 w-3" />
                                                        <span>
                                                            {hotel.city},{" "}
                                                            {hotel.country}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={route(
                                                            "admin.hotels.show",
                                                            hotel.uuid
                                                        )}
                                                    >
                                                        View
                                                    </Link>
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-center py-8">
                                        No hotels are using this amenity yet.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
