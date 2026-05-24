import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { G as GuestLayout } from "./GuestLayout-DqWaCj33.js";
import { B as Button } from "./button-Dm9784FB.js";
import { I as Input } from "./input-D6vmmPPF.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { C as Checkbox } from "./checkbox-D2ooOnDw.js";
import { S as Separator } from "./separator-CBwNKPLd.js";
import { ShieldCheck } from "lucide-react";
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
function Login({ status }) {
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
    post(route("dashboard.login"));
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard Login" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-amber-500 p-2.5 rounded-xl", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-6 h-6 text-white" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Admin Dashboard" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Management access only" })
      ] }),
      status && /* @__PURE__ */ jsx("div", { className: "p-3 text-sm font-medium text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30 rounded-lg", children: status }),
      /* @__PURE__ */ jsx(Separator, {}),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "login", children: "Username or Email" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "login",
              type: "text",
              value: data.login,
              onChange: (e) => setData("login", e.target.value),
              placeholder: "Enter credentials",
              required: true,
              autoComplete: "username",
              className: "h-11"
            }
          ),
          errors.login && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.login })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              type: "password",
              value: data.password,
              onChange: (e) => setData("password", e.target.value),
              placeholder: "Enter your password",
              required: true,
              autoComplete: "current-password",
              className: "h-11"
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
          /* @__PURE__ */ jsx(Label, { htmlFor: "remember", className: "text-sm font-normal text-muted-foreground", children: "Secure Session" })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            className: "w-full h-11 text-base bg-amber-600 hover:bg-amber-700 text-white font-semibold",
            disabled: processing,
            children: processing ? "Authenticating..." : "Login to Dashboard"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-center pt-2", children: /* @__PURE__ */ jsx(
        Link,
        {
          href: route("login"),
          className: "text-sm text-muted-foreground hover:text-primary transition-colors",
          children: "Return to Public Login"
        }
      ) })
    ] })
  ] });
}
export {
  Login as default
};
