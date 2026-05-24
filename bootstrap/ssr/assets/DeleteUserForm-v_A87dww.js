import { jsxs, jsx } from "react/jsx-runtime";
import { useForm } from "@inertiajs/react";
import { useState, useRef } from "react";
import { B as Button } from "./button-Dm9784FB.js";
import { I as Input } from "./input-D6vmmPPF.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-zbygvPRX.js";
import { AlertTriangle } from "lucide-react";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/input";
import "@base-ui/react/dialog";
function DeleteUserForm() {
  const [open, setOpen] = useState(false);
  const passwordInput = useRef();
  const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({
    password: ""
  });
  const deleteUser = (e) => {
    e.preventDefault();
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => setOpen(false),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset()
    });
  };
  const closeModal = () => {
    setOpen(false);
    clearErrors();
    reset();
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Once deleted, all your data will be permanently removed. This action cannot be undone." }) }),
    /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "destructive", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "mr-2 h-4 w-4" }),
        "Delete Account"
      ] }) }),
      /* @__PURE__ */ jsxs(DialogContent, { children: [
        /* @__PURE__ */ jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsx(DialogTitle, { children: "Are you absolutely sure?" }),
          /* @__PURE__ */ jsx(DialogDescription, { children: "This will permanently delete your account and all associated data. Enter your password to confirm." })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: deleteUser, children: [
          /* @__PURE__ */ jsx("div", { className: "space-y-4 py-4", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "delete-password", children: "Password" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "delete-password",
                type: "password",
                ref: passwordInput,
                value: data.password,
                onChange: (e) => setData("password", e.target.value),
                placeholder: "Enter your password"
              }
            ),
            errors.password && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.password })
          ] }) }),
          /* @__PURE__ */ jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: closeModal, children: "Cancel" }),
            /* @__PURE__ */ jsx(Button, { type: "submit", variant: "destructive", disabled: processing, children: processing ? "Deleting..." : "Delete Account" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  DeleteUserForm as default
};
