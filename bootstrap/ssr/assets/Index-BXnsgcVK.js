import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BbquYNfF.js";
import { B as Button } from "./button-Dm9784FB.js";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-zbygvPRX.js";
import "./badge-qMfuib1i.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DjoqtalQ.js";
import { A as Avatar, a as AvatarImage, b as AvatarFallback } from "./BackToTop-Cf3OnJBv.js";
import { Plus, ShieldCheck, User, Eye, Edit, Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import "@base-ui/react/scroll-area";
import "./ThemeToggle-DzFfzEoP.js";
import "@base-ui/react/dialog";
import "./separator-CBwNKPLd.js";
import "@base-ui/react/separator";
import "./input-D6vmmPPF.js";
import "@base-ui/react/input";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "@base-ui/react/select";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
function Index({ users, auth }) {
  const [userToDelete, setUserToDelete] = useState(null);
  const { delete: destroy, processing } = useForm();
  const handleDelete = () => {
    destroy(route("dashboard.users.destroy", userToDelete.uuid), {
      onSuccess: () => {
        setUserToDelete(null);
        toast.success("User deleted successfully");
      },
      onError: (err) => toast.error(err.msg || "Failed to delete user")
    });
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Users Management" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Users" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Manage user accounts and administrator roles." })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: route("dashboard.users.create"), children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
          " Add User"
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-card rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "User" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Email" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Phone" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Role" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: users.data.map((user) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8", children: [
              /* @__PURE__ */ jsx(
                AvatarImage,
                {
                  src: user.avatar,
                  alt: user.name
                }
              ),
              /* @__PURE__ */ jsx(AvatarFallback, { children: user.name.charAt(0) })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: user.name })
          ] }) }),
          /* @__PURE__ */ jsx(TableCell, { children: user.email }),
          /* @__PURE__ */ jsx(TableCell, { children: user.phone || "-" }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(
            Select,
            {
              defaultValue: user.role,
              onValueChange: (v) => {
                router.patch(
                  route(
                    "dashboard.users.update",
                    user.uuid
                  ),
                  {
                    name: user.name,
                    email: user.email,
                    role: v
                  },
                  {
                    preserveScroll: true
                  }
                );
              },
              disabled: user.id === auth.user.id,
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[110px] h-8 text-xs", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "admin", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsx(ShieldCheck, { className: "w-3 h-3" }),
                    " ",
                    "Dashboard"
                  ] }) }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "user", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsx(User, { className: "w-3 h-3" }),
                    " ",
                    "User"
                  ] }) })
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs(TableCell, { className: "text-right space-x-2", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                asChild: true,
                children: /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route(
                      "dashboard.users.show",
                      user.uuid
                    ),
                    children: /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" })
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                asChild: true,
                children: /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route(
                      "dashboard.users.edit",
                      user.uuid
                    ),
                    children: /* @__PURE__ */ jsx(Edit, { className: "h-4 w-4" })
                  }
                )
              }
            ),
            user.id !== auth.user.id && /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "text-destructive hover:text-destructive",
                onClick: () => setUserToDelete(user),
                children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] })
        ] }, user.id)) })
      ] }) }),
      users.links.length > 3 && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end space-x-2", children: users.links.map((link, i) => /* @__PURE__ */ jsx(
        Button,
        {
          variant: link.active ? "default" : "outline",
          size: "sm",
          asChild: !!link.url,
          disabled: !link.url,
          className: !link.url ? "opacity-50" : "",
          children: link.url ? /* @__PURE__ */ jsx(
            Link,
            {
              href: link.url,
              dangerouslySetInnerHTML: {
                __html: link.label
              }
            }
          ) : /* @__PURE__ */ jsx(
            "span",
            {
              dangerouslySetInnerHTML: {
                __html: link.label
              }
            }
          )
        },
        i
      )) })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: !!userToDelete, onOpenChange: (open) => !open && setUserToDelete(null), children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "text-center sm:text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "h-7 w-7 text-destructive" }) }),
        /* @__PURE__ */ jsx(DialogTitle, { className: "text-xl", children: "Delete User" }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "pt-2 text-center", children: "Are you sure? This action cannot be undone." })
      ] }),
      userToDelete && /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-muted/50 p-4 space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Name" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: userToDelete.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Email" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: userToDelete.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Role" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium capitalize", children: userToDelete.role })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Joined" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: userToDelete.created_at })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "gap-2 sm:gap-0", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", className: "flex-1", onClick: () => setUserToDelete(null), children: "Cancel" }),
        /* @__PURE__ */ jsx(Button, { variant: "destructive", className: "flex-1", onClick: handleDelete, disabled: processing, children: processing ? "Deleting..." : "Delete" })
      ] })
    ] }) })
  ] });
}
export {
  Index as default
};
