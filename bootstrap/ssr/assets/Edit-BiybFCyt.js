import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { usePage, Head, router } from "@inertiajs/react";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { U as UserLayout } from "./UserLayout-Cqdl8mOt.js";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle, d as CardDescription } from "./card-BY9Lq84_.js";
import { A as Avatar, a as AvatarImage, b as AvatarFallback } from "./BackToTop-Cf3OnJBv.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import "clsx";
import { B as Button } from "./button-Dm9784FB.js";
import { Loader2, Camera, Shield, User, Phone, Calendar } from "lucide-react";
import UpdateProfileInformationForm from "./UpdateProfileInformationForm-BcL9O5ME.js";
import UpdatePasswordForm from "./UpdatePasswordForm-DYlQwPg8.js";
import DeleteUserForm from "./DeleteUserForm-v_A87dww.js";
import { useRef, useState } from "react";
import "@base-ui/react/scroll-area";
import "./ThemeToggle-DzFfzEoP.js";
import "@base-ui/react/dialog";
import "./separator-CBwNKPLd.js";
import "@base-ui/react/separator";
import "sonner";
import "./input-D6vmmPPF.js";
import "@base-ui/react/input";
import "class-variance-authority";
import "./WebLayout-Dc8gJj4l.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "tailwind-merge";
import "./label-BrVZIReJ.js";
import "./dialog-zbygvPRX.js";
function AppLayout({ children }) {
  const { auth } = usePage().props;
  if (auth?.user?.role === "admin") {
    return /* @__PURE__ */ jsx(DashboardLayout, { children });
  }
  return /* @__PURE__ */ jsx(UserLayout, { children });
}
function Edit({ mustVerifyEmail, status }) {
  const { auth } = usePage().props;
  const user = auth.user;
  const fileInput = useRef();
  const [processing, setProcessing] = useState(false);
  const handleAvatarSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      router.post(route("profile.avatar"), formData, {
        preserveScroll: true,
        forceFormData: true,
        onStart: () => setProcessing(true),
        onFinish: () => setProcessing(false)
      });
    }
  };
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Profile" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold tracking-tight", children: [
          "Profile",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-gradient-primary", children: "settings" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1", children: "Manage your account information and security." })
      ] }),
      /* @__PURE__ */ jsx(Card, { variant: "glass", className: "animate-fade-up", children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 flex-wrap", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsxs(Avatar, { className: "h-24 w-24 ring-2 ring-primary/30 shadow-glow", children: [
            /* @__PURE__ */ jsx(
              AvatarImage,
              {
                src: user.avatar,
                className: "object-cover"
              }
            ),
            /* @__PURE__ */ jsx(AvatarFallback, { className: "text-3xl font-bold bg-gradient-primary text-primary-foreground", children: user.name?.charAt(0) })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              ref: fileInput,
              className: "hidden",
              accept: "image/*",
              onChange: handleAvatarSelect
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "gradient",
              size: "icon-sm",
              shape: "pill",
              className: "absolute -bottom-1 -right-1 shadow-glow",
              onClick: () => fileInput.current.click(),
              disabled: processing,
              children: processing ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Camera, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold", children: user.name }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: user.email }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-3 flex-wrap", children: [
            /* @__PURE__ */ jsx(Badge, { className: "bg-gradient-primary text-primary-foreground", children: user.role === "admin" ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Shield, { className: "h-3 w-3 mr-1" }),
              " ",
              "Admin"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(User, { className: "h-3 w-3 mr-1" }),
              " ",
              "Member"
            ] }) }),
            user.phone && /* @__PURE__ */ jsxs(
              Badge,
              {
                variant: "outline",
                className: "text-xs",
                children: [
                  /* @__PURE__ */ jsx(Phone, { className: "h-3 w-3 mr-1" }),
                  " ",
                  user.phone
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Badge,
              {
                variant: "outline",
                className: "text-xs",
                children: [
                  /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3 mr-1" }),
                  " ",
                  "Joined",
                  " ",
                  new Date(
                    user.created_at
                  ).toLocaleDateString()
                ]
              }
            )
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs(Card, { variant: "elevated", className: "animate-fade-up", children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(User, { className: "h-5 w-5 text-primary" }),
              "Profile information"
            ] }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Update your name and email address." })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(
            UpdateProfileInformationForm,
            {
              mustVerifyEmail,
              status
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { variant: "elevated", className: "animate-fade-up", children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Shield, { className: "h-5 w-5 text-primary" }),
              "Update password"
            ] }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Use a strong password to keep your account secure." })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(UpdatePasswordForm, {}) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        Card,
        {
          variant: "outline",
          className: "border-destructive/30 animate-fade-up",
          children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-destructive", children: "Danger zone" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Permanently delete your account and all associated data." })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(DeleteUserForm, {}) })
          ]
        }
      )
    ] })
  ] });
}
export {
  Edit as default
};
