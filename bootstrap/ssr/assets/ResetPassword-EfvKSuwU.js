import { jsxs, jsx } from "react/jsx-runtime";
import { G as GuestLayout } from "./GuestLayout-DqWaCj33.js";
import { useForm, Head } from "@inertiajs/react";
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
function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token,
    email,
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.store"), {
      onFinish: () => reset("password", "password_confirmation")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Reset Password" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-7", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-bold tracking-tight", children: [
          "Set a new",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-gradient-primary", children: "password" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Pick something strong and memorable." })
      ] }),
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
              autoComplete: "username",
              onChange: (e) => setData("email", e.target.value)
            }
          ),
          errors.email && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(
            Label,
            {
              htmlFor: "password",
              className: "text-xs uppercase tracking-wide text-muted-foreground",
              children: "New password"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              type: "password",
              variant: "soft",
              value: data.password,
              autoComplete: "new-password",
              autoFocus: true,
              onChange: (e) => setData("password", e.target.value)
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
              children: "Confirm password"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password_confirmation",
              type: "password",
              variant: "soft",
              value: data.password_confirmation,
              autoComplete: "new-password",
              onChange: (e) => setData(
                "password_confirmation",
                e.target.value
              )
            }
          ),
          errors.password_confirmation && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.password_confirmation })
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
            children: processing ? "Resetting…" : "Reset password"
          }
        )
      ] })
    ] })
  ] });
}
export {
  ResetPassword as default
};
