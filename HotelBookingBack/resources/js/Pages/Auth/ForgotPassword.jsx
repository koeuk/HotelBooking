import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="space-y-7">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Reset your{" "}
                        <span className="text-gradient-primary">password</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Enter your email and we'll send you a reset link.
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
                            htmlFor="email"
                            className="text-xs uppercase tracking-wide text-muted-foreground"
                        >
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            variant="soft"
                            value={data.email}
                            placeholder="you@example.com"
                            autoFocus
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-sm text-destructive">
                                {errors.email}
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
                        {processing ? "Sending…" : "Send reset link"}
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Remembered it?{" "}
                    <Link
                        href={route("login")}
                        className="font-semibold text-primary hover:underline"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
