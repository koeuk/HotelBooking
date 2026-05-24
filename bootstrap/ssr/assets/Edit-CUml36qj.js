import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { B as Button } from "./button-Dm9784FB.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BY9Lq84_.js";
import { I as Input } from "./input-D6vmmPPF.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DjoqtalQ.js";
import { ChevronLeft } from "lucide-react";
import "react";
import "./BackToTop-Cf3OnJBv.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "sonner";
import "@base-ui/react/scroll-area";
import "./badge-qMfuib1i.js";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "class-variance-authority";
import "./ThemeToggle-DzFfzEoP.js";
import "@base-ui/react/dialog";
import "./separator-CBwNKPLd.js";
import "@base-ui/react/separator";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/input";
import "@base-ui/react/select";
function Edit({ booking, users, rooms }) {
  const { data, setData, patch, processing, errors } = useForm({
    user_id: String(booking.user_id || ""),
    room_id: String(booking.room_id || ""),
    check_in_date: booking.check_in_date || "",
    check_out_date: booking.check_out_date || "",
    status: booking.status || "pending"
  });
  const selectedRoom = rooms.find((r) => r.id === Number(data.room_id));
  const nights = data.check_in_date && data.check_out_date ? Math.max(
    0,
    Math.ceil(
      (new Date(data.check_out_date) - new Date(data.check_in_date)) / (1e3 * 60 * 60 * 24)
    )
  ) : 0;
  const totalPrice = selectedRoom && nights > 0 ? nights * selectedRoom.room_type.price_per_night : 0;
  const submit = (e) => {
    e.preventDefault();
    patch(route("dashboard.bookings.update", booking.uuid));
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Edit Booking" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.bookings.index"), children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Edit Booking" }),
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium", children: [
          "#",
          booking.uuid?.slice(0, 8)
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Booking Details" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "user_id", children: "user" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "user_id",
                value: data.user_id,
                onChange: (e) => setData("user_id", e.target.value),
                className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select a user" }),
                  users.map((user) => /* @__PURE__ */ jsxs(
                    "option",
                    {
                      value: String(user.id),
                      children: [
                        user.name,
                        " (",
                        user.email,
                        ")"
                      ]
                    },
                    user.id
                  ))
                ]
              }
            ),
            errors.user_id && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.user_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "room_id", children: "Room" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "room_id",
                value: data.room_id,
                onChange: (e) => setData("room_id", e.target.value),
                className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select a room" }),
                  rooms.map((room) => /* @__PURE__ */ jsxs(
                    "option",
                    {
                      value: String(room.id),
                      children: [
                        room.hotel.name,
                        " -",
                        " ",
                        room.room_type.name,
                        " (#",
                        room.room_number,
                        ") - $",
                        room.room_type.price_per_night,
                        "/night"
                      ]
                    },
                    room.id
                  ))
                ]
              }
            ),
            errors.room_id && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.room_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "check_in_date", children: "Check-in Date" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "check_in_date",
                  type: "date",
                  value: data.check_in_date,
                  onChange: (e) => setData(
                    "check_in_date",
                    e.target.value
                  )
                }
              ),
              errors.check_in_date && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.check_in_date })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "check_out_date", children: "Check-out Date" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "check_out_date",
                  type: "date",
                  value: data.check_out_date,
                  onChange: (e) => setData(
                    "check_out_date",
                    e.target.value
                  )
                }
              ),
              errors.check_out_date && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.check_out_date })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "status", children: "Status" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: data.status,
                onValueChange: (v) => setData("status", v),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select status" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "pending", children: "Pending" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "confirmed", children: "Confirmed" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "cancelled", children: "Cancelled" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "completed", children: "Completed" })
                  ] })
                ]
              }
            ),
            errors.status && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.status })
          ] }),
          totalPrice > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-muted p-4 rounded-lg", children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
              nights,
              " night",
              nights > 1 ? "s" : "",
              " x $",
              selectedRoom?.room_type.price_per_night
            ] }) }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-primary", children: [
              "$",
              totalPrice.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 justify-end", children: [
            /* @__PURE__ */ jsx(Button, { variant: "outline", type: "button", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.bookings.index"), children: "Cancel" }) }),
            /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, children: "Update Booking" })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Edit as default
};
