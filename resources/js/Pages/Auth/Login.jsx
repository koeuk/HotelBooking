import { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Chrome, Facebook } from "lucide-react";

export default function Login({ status, canResetPassword }) {
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
        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="space-y-7">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Welcome{" "}
                        <span className="text-gradient-primary">back</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Enter your credentials to access your account
                    </p>
                </div>

                {status && (
                    <div className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400 animate-scale-in">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label
                            htmlFor="login"
                            className="text-xs uppercase tracking-wide text-muted-foreground"
                        >
                            Email or username
                        </Label>
                        <Input
                            id="login"
                            type="text"
                            variant="soft"
                            value={data.login}
                            onChange={(e) => setData("login", e.target.value)}
                            placeholder="you@example.com"
                            required
                            autoComplete="username"
                        />
                        {errors.login && (
                            <p className="text-sm text-destructive">
                                {errors.login}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label
                                htmlFor="password"
                                className="text-xs uppercase tracking-wide text-muted-foreground"
                            >
                                Password
                            </Label>
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            variant="soft"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="Enter your password"
                            required
                            autoComplete="current-password"
                        />
                        {errors.password && (
                            <p className="text-sm text-destructive">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            checked={data.remember}
                            onCheckedChange={(checked) =>
                                setData("remember", checked)
                            }
                        />
                        <Label
                            htmlFor="remember"
                            className="text-sm font-normal text-muted-foreground"
                        >
                            Remember me
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        variant="gradient"
                        size="xl"
                        shape="pill"
                        className="w-full"
                        disabled={processing}
                    >
                        {processing ? "Logging in…" : "Log in"}
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="px-3 bg-background text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button
                        variant="glass"
                        shape="pill"
                        size="lg"
                        asChild
                    >
                        <a href={route("auth.google")}>
                            <Chrome className="mr-2 h-4 w-4 text-rose-500" />
                            Google
                        </a>
                    </Button>
                    <Button
                        variant="glass"
                        shape="pill"
                        size="lg"
                        asChild
                    >
                        <a href={route("auth.facebook")}>
                            <Facebook className="mr-2 h-4 w-4 text-sky-500" />
                            Facebook
                        </a>
                    </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                        href={route("register")}
                        className="font-semibold text-primary hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
