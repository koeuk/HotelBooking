import { jsxs, jsx } from "react/jsx-runtime";
import { useRef } from "react";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { B as Button } from "./button-Dm9784FB.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardDescription, c as CardContent, e as CardFooter } from "./card-BY9Lq84_.js";
import { I as Input } from "./input-D6vmmPPF.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DjoqtalQ.js";
import { A as Avatar, a as AvatarImage, b as AvatarFallback } from "./BackToTop-Cf3OnJBv.js";
import { ChevronLeft, Camera } from "lucide-react";
import "@base-ui/react/scroll-area";
import "./badge-qMfuib1i.js";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "class-variance-authority";
import "./ThemeToggle-DzFfzEoP.js";
import "@base-ui/react/dialog";
import "./separator-CBwNKPLd.js";
import "@base-ui/react/separator";
import "sonner";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/input";
import "@base-ui/react/select";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
function Create() {
  const avatarInput = useRef();
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    phone: "",
    role: "user",
    password: "",
    password_confirmation: "",
    avatar: null
  });
  const avatarPreview = data.avatar ? URL.createObjectURL(data.avatar) : null;
  const submit = (e) => {
    e.preventDefault();
    post(route("dashboard.users.store"), { forceFormData: true });
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Add User" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.users.index"), children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Add User" })
      ] }),
      /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "User Details" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Create a new account and assign a role." })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsxs(Avatar, { className: "h-20 w-20 border-2 border-primary/20", children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: avatarPreview }),
                /* @__PURE__ */ jsx(AvatarFallback, { className: "text-2xl font-bold bg-primary/10 text-primary", children: data.name?.charAt(0) || "?" })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => avatarInput.current?.click(),
                  className: "absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer",
                  children: /* @__PURE__ */ jsx(Camera, { className: "h-6 w-6 text-white" })
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  ref: avatarInput,
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: (e) => setData("avatar", e.target.files?.[0] || null)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Profile Photo" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Click to upload (max 2MB)" })
            ] })
          ] }),
          errors.avatar && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.avatar }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Full Name" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "name",
                value: data.name,
                onChange: (e) => setData("name", e.target.value),
                placeholder: "John Doe"
              }
            ),
            errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email Address" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "email",
                type: "email",
                value: data.email,
                onChange: (e) => setData("email", e.target.value),
                placeholder: "john@example.com"
              }
            ),
            errors.email && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "phone", children: "Phone Number" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "phone",
                  value: data.phone,
                  onChange: (e) => setData("phone", e.target.value),
                  placeholder: "+1 234 567 890"
                }
              ),
              errors.phone && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.phone })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "role", children: "Role" }),
              /* @__PURE__ */ jsxs(Select, { value: data.role, onValueChange: (v) => setData("role", v), children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select role" }) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "user", children: "User" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "admin", children: "Dashboard" })
                ] })
              ] }),
              errors.role && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.role })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "password",
                  type: "password",
                  value: data.password,
                  onChange: (e) => setData("password", e.target.value)
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
                  onChange: (e) => setData("password_confirmation", e.target.value)
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(CardFooter, { className: "flex justify-end gap-4 border-t px-6 py-4", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.users.index"), children: "Cancel" }) }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, children: processing ? "Creating..." : "Create User" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Create as default
};
