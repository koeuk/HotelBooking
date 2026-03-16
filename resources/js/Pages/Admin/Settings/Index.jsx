import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Settings,
    Send,
    User,
    Shield,
    Lock,
    AlertTriangle,
    Check,
    Phone,
    Calendar,
    Camera,
} from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "integrations", label: "Integrations", icon: Send },
    { id: "danger", label: "Danger Zone", icon: AlertTriangle, danger: true },
];

function ProfileSection({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const avatarInput = useRef();

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        router.post(route("profile.avatar"), { avatar: file }, { forceFormData: true });
    };

    return (
        <div className="space-y-6">
            <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <Avatar className="h-20 w-20 border-2 border-primary/20">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                                    {user.name?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <button
                                type="button"
                                onClick={() => avatarInput.current?.click()}
                                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                                <Camera className="h-6 w-6 text-white" />
                            </button>
                            <input
                                ref={avatarInput}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <Badge variant="secondary" className="text-xs">
                                    <Shield className="h-3 w-3 mr-1" /> {user.role}
                                </Badge>
                                {user.phone && (
                                    <Badge variant="outline" className="text-xs">
                                        <Phone className="h-3 w-3 mr-1" /> {user.phone}
                                    </Badge>
                                )}
                                <Badge variant="outline" className="text-xs">
                                    <Calendar className="h-3 w-3 mr-1" /> Joined{" "}
                                    {new Date(user.created_at).toLocaleDateString()}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your name and email address.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-4 max-w-lg">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                required
                            />
                            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                required
                            />
                            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                            <Button type="submit" disabled={processing}>
                                {processing ? "Saving..." : "Save Changes"}
                            </Button>
                            {recentlySuccessful && (
                                <span className="text-sm text-green-600 flex items-center gap-1">
                                    <Check className="h-4 w-4" /> Saved
                                </span>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

function SecuritySection() {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }
                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <Card className="border-none shadow-sm">
            <CardHeader>
                <CardTitle>Update Password</CardTitle>
                <CardDescription>Use a strong password to keep your account secure.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-4 max-w-lg">
                    <div className="space-y-2">
                        <Label htmlFor="current_password">Current Password</Label>
                        <Input
                            id="current_password"
                            ref={currentPasswordInput}
                            type="password"
                            value={data.current_password}
                            onChange={(e) => setData("current_password", e.target.value)}
                        />
                        {errors.current_password && (
                            <p className="text-sm text-destructive">{errors.current_password}</p>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                ref={passwordInput}
                                type="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                        <Button type="submit" disabled={processing}>
                            {processing ? "Updating..." : "Update Password"}
                        </Button>
                        {recentlySuccessful && (
                            <span className="text-sm text-green-600 flex items-center gap-1">
                                <Check className="h-4 w-4" /> Updated
                            </span>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

function IntegrationsSection({ settings }) {
    const { data, setData, post, processing } = useForm({
        telegram_bot_token: settings.telegram_bot_token || "",
        telegram_chat_id: settings.telegram_chat_id || "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.settings.update"));
    };

    return (
        <Card className="border-none shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5 text-blue-500" />
                    Telegram Integration
                </CardTitle>
                <CardDescription>Configure Telegram bot to receive booking notifications.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-4 max-w-lg">
                    <div className="space-y-2">
                        <Label htmlFor="telegram_bot_token">Bot Token</Label>
                        <Input
                            id="telegram_bot_token"
                            value={data.telegram_bot_token}
                            onChange={(e) => setData("telegram_bot_token", e.target.value)}
                            placeholder="e.g. 123456789:AABBccDDeeFFggHH..."
                        />
                        <p className="text-xs text-muted-foreground">Get this from @BotFather on Telegram.</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="telegram_chat_id">Chat / Group ID</Label>
                        <Input
                            id="telegram_chat_id"
                            value={data.telegram_chat_id}
                            onChange={(e) => setData("telegram_chat_id", e.target.value)}
                            placeholder="e.g. -1001234567890"
                        />
                        <p className="text-xs text-muted-foreground">
                            The Telegram chat or group ID where notifications will be sent.
                        </p>
                    </div>
                    <div className="pt-2">
                        <Button type="submit" disabled={processing}>
                            {processing ? "Saving..." : "Save Telegram Settings"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

function DangerSection() {
    const [open, setOpen] = useState(false);
    const passwordInput = useRef();
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({
        password: "",
    });

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => setOpen(false),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <Card className="border-none shadow-sm">
            <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                </CardTitle>
                <CardDescription>Permanently delete your account and all associated data.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground max-w-md">
                        Once deleted, all data will be permanently removed. This cannot be undone.
                    </p>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="destructive">
                                <AlertTriangle className="mr-2 h-4 w-4" />
                                Delete Account
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This will permanently delete your account. Enter your password to confirm.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={deleteUser}>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="delete-password">Password</Label>
                                        <Input
                                            id="delete-password"
                                            type="password"
                                            ref={passwordInput}
                                            value={data.password}
                                            onChange={(e) => setData("password", e.target.value)}
                                            placeholder="Enter your password"
                                        />
                                        {errors.password && (
                                            <p className="text-sm text-destructive">{errors.password}</p>
                                        )}
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => { setOpen(false); clearErrors(); reset(); }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="destructive" disabled={processing}>
                                        {processing ? "Deleting..." : "Delete Account"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardContent>
        </Card>
    );
}

export default function Index({ settings, mustVerifyEmail, status }) {
    const [activeSection, setActiveSection] = useState("profile");

    return (
        <AdminLayout>
            <Head title="Settings" />

            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Settings className="h-8 w-8" />
                        Settings
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Manage your account, security, and integrations.
                    </p>
                </div>

                <div className="flex gap-6">
                    {/* Settings Sidebar */}
                    <nav className="w-56 shrink-0 hidden md:block">
                        <div className="space-y-1 sticky top-28">
                            {sidebarItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all text-left",
                                        activeSection === item.id
                                            ? "bg-primary/10 text-primary"
                                            : item.danger
                                              ? "text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                                              : "text-muted-foreground hover:text-foreground hover:bg-accent",
                                    )}
                                >
                                    <item.icon className={cn(
                                        "h-4 w-4",
                                        activeSection === item.id
                                            ? "text-primary"
                                            : item.danger
                                              ? ""
                                              : "",
                                    )} />
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </nav>

                    {/* Mobile selector */}
                    <div className="md:hidden w-full">
                        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                            {sidebarItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={cn(
                                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap shrink-0 transition-all",
                                        activeSection === item.id
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-muted-foreground hover:bg-accent",
                                    )}
                                >
                                    <item.icon className="h-3.5 w-3.5" />
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {activeSection === "profile" && (
                            <ProfileSection mustVerifyEmail={mustVerifyEmail} status={status} />
                        )}
                        {activeSection === "security" && <SecuritySection />}
                        {activeSection === "integrations" && <IntegrationsSection settings={settings} />}
                        {activeSection === "danger" && <DangerSection />}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
