import WebLayout from "@/Layouts/WebLayout";
import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <WebLayout>
            <Head title="Contact Us" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight">Contact Us</h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Have questions? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        {[
                            { icon: Mail, title: "Email", text: "support@hotelbook.com" },
                            { icon: Phone, title: "Phone", text: "+1 (555) 123-4567" },
                            { icon: MapPin, title: "Address", text: "123 Booking Street, Travel City" },
                        ].map((item, i) => (
                            <Card key={i} className="border-none shadow-sm">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="p-2.5 rounded-xl bg-primary/10">
                                        <item.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{item.title}</p>
                                        <p className="text-sm text-muted-foreground">{item.text}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <Card className="lg:col-span-2 border-none shadow-sm">
                        <CardHeader>
                            <CardTitle>Send a Message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {sent ? (
                                <div className="text-center py-8">
                                    <div className="inline-flex p-3 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
                                        <Send className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold">Message Sent!</h3>
                                    <p className="text-muted-foreground mt-1">We'll get back to you within 24 hours.</p>
                                    <Button className="mt-4" variant="outline" onClick={() => setSent(false)}>
                                        Send Another
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input id="name" placeholder="Your name" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" placeholder="your@email.com" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input id="subject" placeholder="How can we help?" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea id="message" placeholder="Your message..." rows={5} required />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        <Send className="h-4 w-4 mr-2" /> Send Message
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </WebLayout>
    );
}
