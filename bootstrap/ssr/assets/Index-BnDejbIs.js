import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BbquYNfF.js";
import { B as Button } from "./button-Dm9784FB.js";
import "./badge-qMfuib1i.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DjoqtalQ.js";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-zbygvPRX.js";
import { Plus, Eye, Edit, Trash2, CalendarCheck, AlertTriangle } from "lucide-react";
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
import "@base-ui/react/select";
function Index({ bookings }) {
  const { delete: destroy, processing } = useForm();
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const updateStatus = (id, status) => {
    router.patch(
      route("dashboard.bookings.update", id),
      { status },
      {
        onSuccess: () => toast.success("Status updated"),
        onError: () => toast.error("Update failed")
      }
    );
  };
  const handleDelete = () => {
    destroy(route("dashboard.bookings.destroy", bookingToDelete.uuid), {
      onSuccess: () => {
        setBookingToDelete(null);
        toast.success("Booking deleted");
      },
      onError: () => toast.error("Failed to delete booking")
    });
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Bookings Management" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Bookings" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Monitor and manage all hotel stay reservations." })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: route("dashboard.bookings.create"), children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
          " New Booking"
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-card rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "User" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Hotel / Room" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Dates" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Total" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxs(TableBody, { children: [
          bookings.data.map((booking) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxs(TableCell, { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: booking.user.name }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: booking.user.email })
            ] }),
            /* @__PURE__ */ jsxs(TableCell, { children: [
              /* @__PURE__ */ jsx("div", { children: booking.room.hotel.name }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
                booking.room.room_type.name,
                " (Room ",
                booking.room.room_number,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
              new Date(booking.check_in_date).toLocaleDateString(),
              " -",
              " ",
              new Date(booking.check_out_date).toLocaleDateString()
            ] }) }),
            /* @__PURE__ */ jsxs(TableCell, { className: "font-medium", children: [
              "$",
              booking.total_price
            ] }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(
              Select,
              {
                defaultValue: booking.status,
                onValueChange: (v) => updateStatus(booking.uuid, v),
                disabled: processing,
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[130px] h-8 text-xs", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "pending", children: "Pending" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "confirmed", children: "Confirmed" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "cancelled", children: "Cancelled" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "completed", children: "Completed" })
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1", children: [
              /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.bookings.show", booking.uuid), children: /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.bookings.edit", booking.uuid), children: /* @__PURE__ */ jsx(Edit, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 text-destructive hover:text-destructive",
                  onClick: () => setBookingToDelete(booking),
                  children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] }) })
          ] }, booking.id)),
          bookings.data.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsxs(TableCell, { colSpan: 6, className: "text-center py-12", children: [
            /* @__PURE__ */ jsx(CalendarCheck, { className: "h-10 w-10 text-muted-foreground/30 mx-auto mb-3" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "No bookings found." })
          ] }) })
        ] })
      ] }) }),
      bookings.links.length > 3 && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end space-x-2", children: bookings.links.map((link, i) => /* @__PURE__ */ jsx(
        Button,
        {
          variant: link.active ? "default" : "outline",
          size: "sm",
          asChild: !!link.url,
          disabled: !link.url,
          className: !link.url ? "opacity-50" : "",
          children: link.url ? /* @__PURE__ */ jsx(Link, { href: link.url, dangerouslySetInnerHTML: { __html: link.label } }) : /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: link.label } })
        },
        i
      )) })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: !!bookingToDelete, onOpenChange: (open) => !open && setBookingToDelete(null), children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "text-center sm:text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "h-7 w-7 text-destructive" }) }),
        /* @__PURE__ */ jsx(DialogTitle, { className: "text-xl", children: "Delete Booking" }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "pt-2 text-center", children: "Are you sure you want to delete this booking? This action cannot be undone." })
      ] }),
      bookingToDelete && /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-muted/50 p-4 space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Guest" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: bookingToDelete.user.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Hotel" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: bookingToDelete.room.hotel.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Room" }),
          /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
            bookingToDelete.room.room_type.name,
            " (#",
            bookingToDelete.room.room_number,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Total" }),
          /* @__PURE__ */ jsxs("span", { className: "font-bold text-primary", children: [
            "$",
            bookingToDelete.total_price
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "gap-2 sm:gap-0", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", className: "flex-1", onClick: () => setBookingToDelete(null), children: "Cancel" }),
        /* @__PURE__ */ jsx(Button, { variant: "destructive", className: "flex-1", onClick: handleDelete, disabled: processing, children: processing ? "Deleting..." : "Delete Booking" })
      ] })
    ] }) })
  ] });
}
export {
  Index as default
};
