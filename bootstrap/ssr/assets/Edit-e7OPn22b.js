import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { B as Button } from "./button-Dm9784FB.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardDescription, c as CardContent, e as CardFooter } from "./card-BY9Lq84_.js";
import { I as Input } from "./input-D6vmmPPF.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DjoqtalQ.js";
import { ChevronLeft } from "lucide-react";
import { useMemo } from "react";
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
function Edit({ room, hotels, roomTypes }) {
  const { data, setData, patch, processing, errors } = useForm({
    hotel_id: room.hotel_id.toString(),
    room_type_id: room.room_type_id.toString(),
    room_number: room.room_number || "",
    floor: room.floor || "",
    status: room.status || "available"
  });
  const filteredRoomTypes = useMemo(() => {
    if (!data.hotel_id) return [];
    return roomTypes.filter(
      (type) => type.hotel_id.toString() === data.hotel_id
    );
  }, [data.hotel_id, roomTypes]);
  const submit = (e) => {
    e.preventDefault();
    patch(route("dashboard.rooms.update", room.uuid));
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit Room ${room.room_number}` }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.rooms.index"), children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Edit Room" })
      ] }),
      /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Room Details" }),
          /* @__PURE__ */ jsxs(CardDescription, { children: [
            "Update information for room",
            " ",
            /* @__PURE__ */ jsx("strong", { children: room.room_number }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "hotel_id", children: "Hotel" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "hotel_id",
                  value: data.hotel_id,
                  onChange: (e) => {
                    setData((d) => ({
                      ...d,
                      hotel_id: e.target.value,
                      room_type_id: ""
                    }));
                  },
                  className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Select a hotel" }),
                    hotels.map((hotel) => /* @__PURE__ */ jsx(
                      "option",
                      {
                        value: hotel.id.toString(),
                        children: hotel.name
                      },
                      hotel.id
                    ))
                  ]
                }
              ),
              errors.hotel_id && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.hotel_id })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "room_type_id", children: "Room Type" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "room_type_id",
                  disabled: !data.hotel_id,
                  value: data.room_type_id,
                  onChange: (e) => setData("room_type_id", e.target.value),
                  className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: data.hotel_id ? "Select a type" : "Select hotel first" }),
                    filteredRoomTypes.map((type) => /* @__PURE__ */ jsx(
                      "option",
                      {
                        value: type.id.toString(),
                        children: type.name
                      },
                      type.id
                    ))
                  ]
                }
              ),
              errors.room_type_id && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.room_type_id })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "room_number", children: "Room Number" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "room_number",
                  value: data.room_number,
                  onChange: (e) => setData(
                    "room_number",
                    e.target.value
                  ),
                  placeholder: "e.g. 101, A-12"
                }
              ),
              errors.room_number && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.room_number })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "floor", children: "Floor" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "floor",
                  type: "number",
                  value: data.floor,
                  onChange: (e) => setData("floor", e.target.value),
                  placeholder: "e.g. 1, 2"
                }
              ),
              errors.floor && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.floor })
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
                    /* @__PURE__ */ jsx(SelectItem, { value: "available", children: "Available" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "booked", children: "Booked" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "maintenance", children: "Maintenance" })
                  ] })
                ]
              }
            ),
            errors.status && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.status })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(CardFooter, { className: "flex justify-end gap-4 border-t px-6 py-4", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.rooms.index"), children: "Cancel" }) }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, children: processing ? "Saving..." : "Update Room" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Edit as default
};
