import AppLayout from "@/Layouts/AppLayout";
import { Head, usePage, useForm } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { User, Shield, Mail, Phone, Calendar, Camera, Loader2 } from "lucide-react";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import DeleteUserForm from "./Partials/DeleteUserForm";
import { useRef } from "react";

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const fileInput = useRef();

    const { data, setData, post, processing } = useForm({
        avatar: null,
    });

    const handleAvatarSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("avatar", file);
            // Auto submit on select
            const formData = new FormData();
            formData.append("avatar", file);
            post(route("profile.avatar"), {
                preserveScroll: true,
                forceFormData: true,
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Profile" />

            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
                    <p className="text-muted-foreground">Manage your account information and security.</p>
                </div>

                {/* Profile Header Card */}
                <Card className="border-none shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-6">
                            <div className="relative group">
                                <Avatar className="h-24 w-24 border-2 border-primary/20 shadow-inner">
                                    <AvatarImage src={user.avatar} className="object-cover" />
                                    <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
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
                                    variant="secondary"
                                    size="icon"
                                    className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full border border-background shadow hover:scale-110 transition-transform"
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
                            <div className="flex-1">
                                <h3 className="text-xl font-bold">{user.name}</h3>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="secondary" className="text-xs">
                                        {user.role === "admin" ? (
                                            <><Shield className="h-3 w-3 mr-1" /> Dashboard</>
                                        ) : (
                                            <><User className="h-3 w-3 mr-1" /> User</>
                                        )}
                                    </Badge>
                                    {user.phone && (
                                        <Badge variant="outline" className="text-xs">
                                            <Phone className="h-3 w-3 mr-1" /> {user.phone}
                                        </Badge>
                                    )}
                                    <Badge variant="outline" className="text-xs">
                                        <Calendar className="h-3 w-3 mr-1" /> Joined {new Date(user.created_at).toLocaleDateString()}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Profile Info */}
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                Profile Information
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

                    {/* Password */}
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-primary" />
                                Update Password
                            </CardTitle>
                            <CardDescription>
                                Use a strong password to keep your account secure.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UpdatePasswordForm />
                        </CardContent>
                    </Card>
                </div>

                {/* Delete Account */}
                <Card className="border-none shadow-sm border-destructive/20">
                    <CardHeader>
                        <CardTitle className="text-destructive flex items-center gap-2">
                            Danger Zone
                        </CardTitle>
                        <CardDescription>
                            Permanently delete your account and all associated data.
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
