import { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck } from "lucide-react";

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("dashboard.login"));
    };

    return (
        <GuestLayout>
            <Head title="Dashboard Login" />

            <div className="space-y-6">
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className="bg-amber-500 p-2.5 rounded-xl">
                        <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Admin Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Management access only
                    </p>
                </div>

                {status && (
                    <div className="p-3 text-sm font-medium text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30 rounded-lg">
                        {status}
                    </div>
                )}

                <Separator />

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="login">Username or Email</Label>
                        <Input
                            id="login"
                            type="text"
                            value={data.login}
                            onChange={(e) => setData("login", e.target.value)}
                            placeholder="Enter credentials"
                            required
                            autoComplete="username"
                            className="h-11"
                        />
                        {errors.login && (
                            <p className="text-sm text-destructive">{errors.login}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            placeholder="Enter your password"
                            required
                            autoComplete="current-password"
                            className="h-11"
                        />
                        {errors.password && (
                            <p className="text-sm text-destructive">{errors.password}</p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            checked={data.remember}
                            onCheckedChange={(checked) => setData("remember", checked)}
                        />
                        <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                            Secure Session
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-11 text-base bg-amber-600 hover:bg-amber-700 text-white font-semibold"
                        disabled={processing}
                    >
                        {processing ? "Authenticating..." : "Login to Dashboard"}
                    </Button>
                </form>

                <div className="text-center pt-2">
                    <Link
                        href={route("login")}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        Return to Public Login
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}
