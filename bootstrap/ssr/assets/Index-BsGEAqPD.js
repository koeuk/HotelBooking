import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BbquYNfF.js";
import { B as Button } from "./button-Dm9784FB.js";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-zbygvPRX.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { Plus, Eye, Edit, Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import "./BackToTop-Cf3OnJBv.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
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
function Index({ hotels }) {
  const [hotelToDelete, setHotelToDelete] = useState(null);
  const { delete: destroy, processing } = useForm();
  const handleDelete = () => {
    destroy(route("dashboard.hotels.destroy", hotelToDelete.uuid), {
      onSuccess: () => {
        setHotelToDelete(null);
        toast.success("Hotel deleted successfully");
      },
      onError: () => toast.error("Failed to delete hotel")
    });
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Hotels Management" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Hotels" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Manage your properties and their details." })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: route("dashboard.hotels.create"), children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
          " Add Hotel"
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-card rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Name" }),
          /* @__PURE__ */ jsx(TableHead, { children: "City / Country" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Rating" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxs(TableBody, { children: [
          hotels.data.map((hotel) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: hotel.name }),
            /* @__PURE__ */ jsxs(TableCell, { children: [
              hotel.city,
              ", ",
              hotel.country
            ] }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(
              Badge,
              {
                variant: "secondary",
                className: "font-bold rounded-full",
                children: [
                  hotel.rating,
                  " ★"
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
                        "dashboard.hotels.show",
                        hotel.uuid
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
                        "dashboard.hotels.edit",
                        hotel.uuid
                      ),
                      children: /* @__PURE__ */ jsx(Edit, { className: "h-4 w-4" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "text-destructive hover:text-destructive",
                  onClick: () => setHotelToDelete(hotel),
                  children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }, hotel.id)),
          hotels.data.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
            TableCell,
            {
              colSpan: 4,
              className: "text-center py-8 text-muted-foreground",
              children: "No hotels found. Start by adding one."
            }
          ) })
        ] })
      ] }) }),
      hotels.links.length > 3 && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end space-x-2", children: hotels.links.map((link, i) => /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx(
      Dialog,
      {
        open: !!hotelToDelete,
        onOpenChange: (open) => {
          if (!open) setHotelToDelete(null);
        },
        children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-md", children: [
          /* @__PURE__ */ jsxs(DialogHeader, { className: "flex flex-col items-center text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "h-7 w-7 text-red-600 dark:text-red-400" }) }),
            /* @__PURE__ */ jsx(DialogTitle, { className: "text-center", children: "Delete Hotel" }),
            /* @__PURE__ */ jsx(DialogDescription, { className: "text-center", children: "This action cannot be undone. This will permanently delete this hotel and all associated rooms and bookings." })
          ] }),
          hotelToDelete && /* @__PURE__ */ jsxs("div", { className: "rounded-lg border bg-muted/50 p-4 space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Hotel" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: hotelToDelete.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "City" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: hotelToDelete.city })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Rating" }),
              /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
                hotelToDelete.rating,
                " ★"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Rooms" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: hotelToDelete.rooms_count ?? "N/A" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(DialogFooter, { className: "flex gap-2 sm:gap-0", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => setHotelToDelete(null),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "destructive",
                className: "flex-1",
                onClick: handleDelete,
                disabled: processing,
                children: processing ? "Deleting..." : "Delete Hotel"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  Index as default
};
