import { jsxs, jsx } from "react/jsx-runtime";
import { G as GuestLayout } from "./GuestLayout-DqWaCj33.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { B as Button } from "./button-Dm9784FB.js";
import { I as Input } from "./input-D6vmmPPF.js";
import { L as Label } from "./label-BrVZIReJ.js";
import "lucide-react";
import "./badge-qMfuib1i.js";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "class-variance-authority";
import "./ThemeToggle-DzFfzEoP.js";
import "react";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/input";
function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Forgot Password" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-7", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-bold tracking-tight", children: [
          "Reset your",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-gradient-primary", children: "password" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Enter your email and we'll send you a reset link." })
      ] }),
      status && /* @__PURE__ */ jsx("div", { className: "rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400 animate-scale-in", children: status }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
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
              placeholder: "you@example.com",
              autoFocus: true,
              onChange: (e) => setData("email", e.target.value)
            }
          ),
          errors.email && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.email })
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
            children: processing ? "Sending…" : "Send reset link"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
        "Remembered it?",
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
  ForgotPassword as default
};
