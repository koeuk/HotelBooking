import { jsxs, jsx } from "react/jsx-runtime";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";
import { B as Button } from "./button-Dm9784FB.js";
import { I as Input } from "./input-D6vmmPPF.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { Check } from "lucide-react";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/input";
function UpdatePasswordForm() {
  const passwordInput = useRef();
  const currentPasswordInput = useRef();
  const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors2) => {
        if (errors2.password) {
          reset("password", "password_confirmation");
          passwordInput.current?.focus();
        }
        if (errors2.current_password) {
          reset("current_password");
          currentPasswordInput.current?.focus();
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "current_password", children: "Current Password" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "current_password",
          ref: currentPasswordInput,
          type: "password",
          value: data.current_password,
          onChange: (e) => setData("current_password", e.target.value),
          autoComplete: "current-password"
        }
      ),
      errors.current_password && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.current_password })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "New Password" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "password",
          ref: passwordInput,
          type: "password",
          value: data.password,
          onChange: (e) => setData("password", e.target.value),
          autoComplete: "new-password"
        }
      ),
      errors.password && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.password })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "password_confirmation", children: "Confirm Password" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "password_confirmation",
          type: "password",
          value: data.password_confirmation,
          onChange: (e) => setData("password_confirmation", e.target.value),
          autoComplete: "new-password"
        }
      ),
      errors.password_confirmation && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.password_confirmation })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 pt-2", children: [
      /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, children: processing ? "Updating..." : "Update Password" }),
      recentlySuccessful && /* @__PURE__ */ jsxs("span", { className: "text-sm text-green-600 flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }),
        " Updated"
      ] })
    ] })
  ] });
}
export {
  UpdatePasswordForm as default
};
