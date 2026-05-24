import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { G as GuestLayout } from "./GuestLayout-DqWaCj33.js";
import { B as Button } from "./button-Dm9784FB.js";
import { I as Input } from "./input-D6vmmPPF.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { C as Checkbox } from "./checkbox-D2ooOnDw.js";
import { S as Separator } from "./separator-CBwNKPLd.js";
import { Chrome, Facebook } from "lucide-react";
import "./badge-qMfuib1i.js";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "class-variance-authority";
import "./ThemeToggle-DzFfzEoP.js";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/input";
import "@radix-ui/react-checkbox";
import "@base-ui/react/separator";
function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    login: "",
    password: "",
    remember: false
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
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-7", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-bold tracking-tight", children: [
          "Welcome",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-gradient-primary", children: "back" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Enter your credentials to access your account" })
      ] }),
      status && /* @__PURE__ */ jsx("div", { className: "rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400 animate-scale-in", children: status }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(
            Label,
            {
              htmlFor: "login",
              className: "text-xs uppercase tracking-wide text-muted-foreground",
              children: "Email or username"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "login",
              type: "text",
              variant: "soft",
              value: data.login,
              onChange: (e) => setData("login", e.target.value),
              placeholder: "you@example.com",
              required: true,
              autoComplete: "username"
            }
          ),
          errors.login && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.login })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx(
              Label,
              {
                htmlFor: "password",
                className: "text-xs uppercase tracking-wide text-muted-foreground",
                children: "Password"
              }
            ),
            canResetPassword && /* @__PURE__ */ jsx(
              Link,
              {
                href: route("password.request"),
                className: "text-sm text-primary hover:underline",
                children: "Forgot password?"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              type: "password",
              variant: "soft",
              value: data.password,
              onChange: (e) => setData("password", e.target.value),
              placeholder: "Enter your password",
              required: true,
              autoComplete: "current-password"
            }
          ),
          errors.password && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.password })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(
            Checkbox,
            {
              id: "remember",
              checked: data.remember,
              onCheckedChange: (checked) => setData("remember", checked)
            }
          ),
          /* @__PURE__ */ jsx(
            Label,
            {
              htmlFor: "remember",
              className: "text-sm font-normal text-muted-foreground",
              children: "Remember me"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            variant: "gradient",
            size: "xl",
            shape: "pill",
            className: "w-full",
            disabled: processing,
            children: processing ? "Logging in…" : "Log in"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx(Separator, {}) }),
        /* @__PURE__ */ jsx("div", { className: "relative flex justify-center text-xs uppercase", children: /* @__PURE__ */ jsx("span", { className: "px-3 bg-background text-muted-foreground", children: "Or continue with" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "glass",
            shape: "pill",
            size: "lg",
            asChild: true,
            children: /* @__PURE__ */ jsxs("a", { href: route("auth.google"), children: [
              /* @__PURE__ */ jsx(Chrome, { className: "mr-2 h-4 w-4 text-rose-500" }),
              "Google"
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "glass",
            shape: "pill",
            size: "lg",
            asChild: true,
            children: /* @__PURE__ */ jsxs("a", { href: route("auth.facebook"), children: [
              /* @__PURE__ */ jsx(Facebook, { className: "mr-2 h-4 w-4 text-sky-500" }),
              "Facebook"
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("register"),
            className: "font-semibold text-primary hover:underline",
            children: "Sign up"
          }
        )
      ] })
    ] })
  ] });
}
export {
  Login as default
};
