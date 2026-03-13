import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
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
import { Settings, Send } from "lucide-react";
import { toast } from "sonner";

export default function Index({ settings }) {
    const { data, setData, post, processing } = useForm({
        telegram_bot_token: settings.telegram_bot_token || "",
        telegram_chat_id: settings.telegram_chat_id || "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.settings.update"), {
            onSuccess: () => toast.success("Settings updated successfully."),
        });
    };

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
                        Manage your application settings and integrations.
                    </p>
                </div>

                <form onSubmit={submit}>
                    <Card className="border-none shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Send className="h-5 w-5 text-blue-500" />
                                Telegram Integration
                            </CardTitle>
                            <CardDescription>
                                Configure Telegram bot to receive booking notifications.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="telegram_bot_token">Bot Token</Label>
                                <Input
                                    id="telegram_bot_token"
                                    type="text"
                                    value={data.telegram_bot_token}
                                    onChange={(e) => setData("telegram_bot_token", e.target.value)}
                                    placeholder="e.g. 123456789:AABBccDDeeFFggHH..."
                                />
                                <p className="text-xs text-muted-foreground">
                                    Get this from @BotFather on Telegram.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="telegram_chat_id">Chat / Group ID</Label>
                                <Input
                                    id="telegram_chat_id"
                                    type="text"
                                    value={data.telegram_chat_id}
                                    onChange={(e) => setData("telegram_chat_id", e.target.value)}
                                    placeholder="e.g. -1001234567890"
                                />
                                <p className="text-xs text-muted-foreground">
                                    The Telegram chat or group ID where notifications will be sent.
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={processing}>
                                {processing ? "Saving..." : "Save Settings"}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AdminLayout>
    );
}
