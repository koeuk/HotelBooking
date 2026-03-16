import WebLayout from "@/Layouts/WebLayout";
import { Head } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Hotel, Shield, Heart, Users } from "lucide-react";

export default function About() {
    return (
        <WebLayout>
            <Head title="About Us" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight">About HotelBook</h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        We're on a mission to make hotel booking simple, transparent, and delightful for travelers worldwide.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {[
                        { icon: Hotel, title: "Quality Hotels", desc: "Handpicked properties vetted for quality and comfort." },
                        { icon: Shield, title: "Secure Booking", desc: "Your data and payments are always protected." },
                        { icon: Heart, title: "Best Prices", desc: "We guarantee the best rates for every stay." },
                        { icon: Users, title: "24/7 Support", desc: "Our team is here to help anytime you need." },
                    ].map((item, i) => (
                        <Card key={i} className="border-none shadow-sm text-center">
                            <CardContent className="pt-8 pb-6">
                                <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                                    <item.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                    <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground space-y-4">
                        <p>
                            Founded with a passion for travel, HotelBook connects travelers with exceptional accommodations around the world. We believe that finding the perfect place to stay should be easy and enjoyable.
                        </p>
                        <p>
                            Our platform features carefully selected hotels, transparent pricing, and genuine guest reviews to help you make the best choice for your next trip.
                        </p>
                        <p>
                            Whether you're planning a business trip, a family vacation, or a solo adventure, HotelBook is here to help you find your ideal stay.
                        </p>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
}
