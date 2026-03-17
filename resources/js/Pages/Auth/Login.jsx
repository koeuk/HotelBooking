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

            <div className="space-y-6 text-center">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-sm text-white/70">
                        Enter your credentials to access your account
                    </p>
                </div>

                {status && (
                    <div className="p-3 text-sm font-medium text-green-400 bg-green-900/30 rounded-full">
                        {status}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        asChild
                        className="w-full rounded-full h-12 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
                    >
                        <a href={route("auth.google")}>
                            <Chrome className="mr-2 h-4 w-4" />
                            Google
                        </a>
                    </Button>
                    <Button
                        variant="outline"
                        asChild
                        className="w-full rounded-full h-12 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
                    >
                        <a href={route("auth.facebook")}>
                            <Facebook className="mr-2 h-4 w-4" />
                            Facebook
                        </a>
                    </Button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <Separator className="bg-white/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="px-2 text-white/50 bg-white/10 backdrop-blur-sm rounded-full">
                            Or continue with email
                        </span>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <Input
                            id="login"
                            type="text"
                            value={data.login}
                            onChange={(e) => setData("login", e.target.value)}
                            placeholder="Email or username"
                            required
                            autoComplete="username"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full h-12 px-5"
                        />
                        {errors.login && (
                            <p className="text-sm text-red-400 mt-1">
                                {errors.login}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="Password"
                            required
                            autoComplete="current-password"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full h-12 px-5"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-400 mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between px-1">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={data.remember}
                                onCheckedChange={(checked) =>
                                    setData("remember", checked)
                                }
                                className="border-white/30 data-[state=checked]:bg-primary"
                            />
                            <Label
                                htmlFor="remember"
                                className="text-sm font-normal text-white/70"
                            >
                                Remember me
                            </Label>
                        </div>
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm text-white/70 hover:text-white hover:underline"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full rounded-full h-12 text-base"
                        disabled={processing}
                    >
                        {processing ? "Logging in..." : "Log in"}
                    </Button>
                </form>

                <p className="text-sm text-white/60">
                    Don't have an account?{" "}
                    <Link
                        href={route("register")}
                        className="font-semibold text-white hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
