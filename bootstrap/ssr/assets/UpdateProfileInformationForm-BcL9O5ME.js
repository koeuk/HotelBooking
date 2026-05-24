import { jsxs, jsx } from "react/jsx-runtime";
import { usePage, useForm, Link } from "@inertiajs/react";
import { B as Button } from "./button-Dm9784FB.js";
import { I as Input } from "./input-D6vmmPPF.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { Check } from "lucide-react";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "react";
import "@base-ui/react/input";
function UpdateProfileInformationForm({ mustVerifyEmail, status }) {
  const user = usePage().props.auth.user;
  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email,
    phone: user.phone || ""
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("profile.update"));
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "name",
          value: data.name,
          onChange: (e) => setData("name", e.target.value),
          required: true,
          autoComplete: "name"
        }
      ),
      errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.name })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "email",
          type: "email",
          value: data.email,
          onChange: (e) => setData("email", e.target.value),
          required: true,
          autoComplete: "username"
        }
      ),
      errors.email && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.email })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "phone", children: "Phone Number" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "phone",
          type: "tel",
          value: data.phone,
          onChange: (e) => setData("phone", e.target.value),
          placeholder: "e.g., +855 000 000 000"
        }
      ),
      errors.phone && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.phone })
    ] }),
    mustVerifyEmail && user.email_verified_at === null && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Your email address is unverified.",
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("verification.send"),
            method: "post",
            as: "button",
            className: "text-primary underline hover:text-primary/80",
            children: "Click here to re-send the verification email."
          }
        )
      ] }),
      status === "verification-link-sent" && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm font-medium text-green-600", children: "A new verification link has been sent to your email address." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 pt-2", children: [
      /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, children: processing ? "Saving..." : "Save Changes" }),
      recentlySuccessful && /* @__PURE__ */ jsxs("span", { className: "text-sm text-green-600 flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }),
        " Saved"
      ] })
    ] })
  ] });
}
export {
  UpdateProfileInformationForm as default
};
