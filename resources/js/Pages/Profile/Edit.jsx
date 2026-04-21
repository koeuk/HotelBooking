import AppLayout from "@/Layouts/AppLayout";
import { Head, usePage, router } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { User, Shield, Mail, Phone, Calendar, Camera, Loader2 } from "lucide-react";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import DeleteUserForm from "./Partials/DeleteUserForm";
import { useRef, useState } from "react";

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const fileInput = useRef();
    const [processing, setProcessing] = useState(false);

    const handleAvatarSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("avatar", file);
            router.post(route("profile.avatar"), formData, {
                preserveScroll: true,
                forceFormData: true,
                onStart: () => setProcessing(true),
                onFinish: () => setProcessing(false),
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Profile" />

            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Profile{" "}
                        <span className="text-gradient-primary">settings</span>
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Manage your account information and security.
                    </p>
                </div>

                {/* Profile Header */}
                <Card variant="glass" className="animate-fade-up">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-6 flex-wrap">
                            <div className="relative group">
                                <Avatar className="h-24 w-24 ring-2 ring-primary/30 shadow-glow">
                                    <AvatarImage
                                        src={user.avatar}
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="text-3xl font-bold bg-gradient-primary text-primary-foreground">
                                        {user.name?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>

                                <input
                                    type="file"
                                    ref={fileInput}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleAvatarSelect}
                                />

                                <Button
                                    type="button"
                                    variant="gradient"
                                    size="icon-sm"
                                    shape="pill"
                                    className="absolute -bottom-1 -right-1 shadow-glow"
                                    onClick={() => fileInput.current.click()}
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Camera className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-2xl font-bold">
                                    {user.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {user.email}
                                </p>
                                <div className="flex items-center gap-2 mt-3 flex-wrap">
                                    <Badge className="bg-gradient-primary text-primary-foreground">
                                        {user.role === "admin" ? (
                                            <>
                                                <Shield className="h-3 w-3 mr-1" />{" "}
                                                Admin
                                            </>
                                        ) : (
                                            <>
                                                <User className="h-3 w-3 mr-1" />{" "}
                                                Member
                                            </>
                                        )}
                                    </Badge>
                                    {user.phone && (
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            <Phone className="h-3 w-3 mr-1" />{" "}
                                            {user.phone}
                                        </Badge>
                                    )}
                                    <Badge
                                        variant="outline"
                                        className="text-xs"
                                    >
                                        <Calendar className="h-3 w-3 mr-1" />{" "}
                                        Joined{" "}
                                        {new Date(
                                            user.created_at,
                                        ).toLocaleDateString()}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card variant="elevated" className="animate-fade-up">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                Profile information
                            </CardTitle>
                            <CardDescription>
                                Update your name and email address.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />
                        </CardContent>
                    </Card>

                    <Card variant="elevated" className="animate-fade-up">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-primary" />
                                Update password
                            </CardTitle>
                            <CardDescription>
                                Use a strong password to keep your account
                                secure.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UpdatePasswordForm />
                        </CardContent>
                    </Card>
                </div>

                <Card
                    variant="outline"
                    className="border-destructive/30 animate-fade-up"
                >
                    <CardHeader>
                        <CardTitle className="text-destructive">
                            Danger zone
                        </CardTitle>
                        <CardDescription>
                            Permanently delete your account and all associated
                            data.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DeleteUserForm />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
