import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className="space-y-7">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Set a new{" "}
                        <span className="text-gradient-primary">password</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Pick something strong and memorable.
                    </p>
                </div>

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
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-sm text-destructive">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="password"
                            className="text-xs uppercase tracking-wide text-muted-foreground"
                        >
                            New password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            variant="soft"
                            value={data.password}
                            autoComplete="new-password"
                            autoFocus
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        {errors.password && (
                            <p className="text-sm text-destructive">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="password_confirmation"
                            className="text-xs uppercase tracking-wide text-muted-foreground"
                        >
                            Confirm password
                        </Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            variant="soft"
                            value={data.password_confirmation}
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData(
                                    "password_confirmation",
                                    e.target.value,
                                )
                            }
                        />
                        {errors.password_confirmation && (
                            <p className="text-sm text-destructive">
                                {errors.password_confirmation}
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
                        {processing ? "Resetting…" : "Reset password"}
                    </Button>
                </form>
            </div>
        </GuestLayout>
    );
}
