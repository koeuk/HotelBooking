import WebLayout from "@/Layouts/WebLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Contact() {
    const { auth, flash } = usePage().props;
    const [sent, setSent] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: auth?.user?.name || "",
        email: auth?.user?.email || "",
        subject: "",
        message: "",
    });

    useEffect(() => {
        if (flash?.success && !sent) setSent(true);
    }, [flash?.success]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("web.contact.send"), {
            preserveScroll: true,
            onSuccess: (page) => {
                if (page.props.flash?.error) return;
                setSent(true);
                reset("subject", "message");
            },
        });
    };

    const sendAnother = () => {
        setSent(false);
        reset("subject", "message");
    };

    return (
        <WebLayout>
            <Head title="Contact Us" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        Contact{" "}
                        <span className="text-gradient-primary">us</span>
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Have questions? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-4">
                        {[
                            {
                                icon: Mail,
                                title: "Email",
                                text: "support@hotelbook.com",
                            },
                            {
                                icon: Phone,
                                title: "Phone",
                                text: "+1 (555) 123-4567",
                            },
                            {
                                icon: MapPin,
                                title: "Address",
                                text: "123 Booking Street, Travel City",
                            },
                        ].map((item, i) => (
                            <Card key={i} variant="elevated">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="p-2.5 rounded-xl bg-gradient-primary text-primary-foreground shrink-0">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-sm">
                                            {item.title}
                                        </p>
                                        <p className="text-sm text-muted-foreground truncate">
                                            {item.text}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <Card variant="elevated" className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Send a message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {sent ? (
                                <div className="text-center py-10 animate-scale-in">
                                    <div className="inline-flex p-4 rounded-full bg-emerald-500/10 mb-4">
                                        <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold">
                                        Message sent!
                                    </h3>
                                    <p className="text-muted-foreground mt-1">
                                        We'll get back to you within 24 hours.
                                    </p>
                                    <Button
                                        variant="glass"
                                        shape="pill"
                                        className="mt-5"
                                        onClick={sendAnother}
                                    >
                                        Send another
                                    </Button>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="name"
                                                className="text-xs uppercase tracking-wide text-muted-foreground"
                                            >
                                                Name
                                            </Label>
                                            <Input
                                                id="name"
                                                variant="soft"
                                                placeholder="Your name"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            {errors.name && (
                                                <p className="text-sm text-destructive">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="email"
                                                className="text-xs uppercase tracking-wide text-muted-foreground"
                                            >
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                variant="soft"
                                                placeholder="your@email.com"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-destructive">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="subject"
                                            className="text-xs uppercase tracking-wide text-muted-foreground"
                                        >
                                            Subject
                                        </Label>
                                        <Input
                                            id="subject"
                                            variant="soft"
                                            placeholder="How can we help?"
                                            value={data.subject}
                                            onChange={(e) =>
                                                setData(
                                                    "subject",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        {errors.subject && (
                                            <p className="text-sm text-destructive">
                                                {errors.subject}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="message"
                                            className="text-xs uppercase tracking-wide text-muted-foreground"
                                        >
                                            Message
                                        </Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Your message…"
                                            rows={5}
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    "message",
                                                    e.target.value,
                                                )
                                            }
                                            className="rounded-2xl bg-muted/60 border-input px-4 py-3 focus-visible:bg-background focus-visible:border-primary/40 focus-visible:ring-4 focus-visible:ring-primary/15 transition-all duration-300"
                                            required
                                        />
                                        {errors.message && (
                                            <p className="text-sm text-destructive">
                                                {errors.message}
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        type="submit"
                                        variant="gradient"
                                        size="xl"
                                        shape="pill"
                                        className="w-full"
                                        disabled={processing}
                                    >
                                        <Send className="h-4 w-4 mr-2" />
                                        {processing
                                            ? "Sending…"
                                            : "Send message"}
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
