import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { G as GuestLayout } from "./GuestLayout-DqWaCj33.js";
import { B as Button } from "./button-Dm9784FB.js";
import { I as Input } from "./input-D6vmmPPF.js";
import { L as Label } from "./label-BrVZIReJ.js";
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
import "@base-ui/react/separator";
function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("register"));
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Register" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-7", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-bold tracking-tight", children: [
          "Create your",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-gradient-primary", children: "account" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Join our community of travelers and start booking" })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(
            Label,
            {
              htmlFor: "name",
              className: "text-xs uppercase tracking-wide text-muted-foreground",
              children: "Full name"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              variant: "soft",
              value: data.name,
              onChange: (e) => setData("name", e.target.value),
              placeholder: "John Doe",
              required: true
            }
          ),
          errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(
            Label,
            {
              htmlFor: "email",
              className: "text-xs uppercase tracking-wide text-muted-foreground",
              children: "Email"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "email",
              variant: "soft",
              value: data.email,
              onChange: (e) => setData("email", e.target.value),
              placeholder: "name@example.com",
              required: true
            }
          ),
          errors.email && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(
              Label,
              {
                htmlFor: "password",
                className: "text-xs uppercase tracking-wide text-muted-foreground",
                children: "Password"
              }
            ),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "password",
                type: "password",
                variant: "soft",
                value: data.password,
                onChange: (e) => setData("password", e.target.value),
                required: true
              }
            ),
            errors.password && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.password })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(
              Label,
              {
                htmlFor: "password_confirmation",
                className: "text-xs uppercase tracking-wide text-muted-foreground",
                children: "Confirm"
              }
            ),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "password_confirmation",
                type: "password",
                variant: "soft",
                value: data.password_confirmation,
                onChange: (e) => setData(
                  "password_confirmation",
                  e.target.value
                ),
                required: true
              }
            )
          ] })
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
            children: processing ? "Creating account…" : "Sign up"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx(Separator, {}) }),
        /* @__PURE__ */ jsx("div", { className: "relative flex justify-center text-xs uppercase", children: /* @__PURE__ */ jsx("span", { className: "bg-background px-3 text-muted-foreground", children: "Or continue with" }) })
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
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("login"),
            className: "font-semibold text-primary hover:underline",
            children: "Log in"
          }
        )
      ] })
    ] })
  ] });
}
export {
  Register as default
};
