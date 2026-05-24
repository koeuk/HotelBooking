import { jsxs, jsx } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import { B as Button, c as cn } from "./button-Dm9784FB.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { Plus, X, Upload } from "lucide-react";
function ImageUploader({ existingImages = [], onExistingChange, onFilesChange, newFiles = [], errors }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState([]);
  useEffect(() => {
    const newPreviews = newFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setPreviews(newPreviews);
    return () => {
      newPreviews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [newFiles]);
  const removeExisting = (index) => {
    onExistingChange(existingImages.filter((_, i) => i !== index));
  };
  const removeNewFile = (index) => {
    onFilesChange(newFiles.filter((_, i) => i !== index));
  };
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    onFilesChange([...newFiles, ...files]);
    e.target.value = "";
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files || []);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));
    onFilesChange([...newFiles, ...validFiles]);
  };
  const addImageUrl = () => {
    const url = prompt("Enter image URL");
    if (url) {
      onExistingChange([...existingImages, url]);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { className: "text-base font-bold", children: "Gallery Images" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Upload multiple photos or provide URLs." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "rounded-xl h-9",
          onClick: addImageUrl,
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "Add URL"
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          ref: fileInputRef,
          type: "file",
          accept: "image/*",
          multiple: true,
          className: "hidden",
          onChange: handleFileSelect
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 border-2 border-dashed rounded-2xl transition-all duration-200",
          isDragging ? "border-primary bg-primary/5 scale-[0.99]" : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30"
        ),
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        children: [
          existingImages.map((url, index) => /* @__PURE__ */ jsxs("div", { className: "relative group aspect-video animate-in zoom-in-95 duration-200", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: url,
                alt: `Image ${index + 1}`,
                className: "w-full h-full object-cover rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => removeExisting(index),
                className: "bg-destructive text-destructive-foreground p-2 rounded-full transform scale-75 group-hover:scale-100 transition-transform",
                children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
              }
            ) })
          ] }, `existing-${index}`)),
          previews.map((preview, index) => /* @__PURE__ */ jsxs("div", { className: "relative group aspect-video animate-in zoom-in-95 duration-200", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: preview.url,
                alt: `New ${index + 1}`,
                className: "w-full h-full object-cover rounded-xl border-2 border-primary shadow-sm"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm", children: "New" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => removeNewFile(index),
                className: "bg-destructive text-destructive-foreground p-2 rounded-full transform scale-75 group-hover:scale-100 transition-transform",
                children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
              }
            ) })
          ] }, `new-${index}`)),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => fileInputRef.current?.click(),
              className: cn(
                "aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all duration-300 group",
                isDragging ? "border-transparent" : "border-zinc-300 dark:border-zinc-700 hover:border-primary/50 hover:bg-white dark:hover:bg-zinc-800"
              ),
              children: [
                /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors", children: /* @__PURE__ */ jsx(Upload, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Click or drag here" }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: "PNG, JPG up to 2MB" })
                ] })
              ]
            }
          )
        ]
      }
    ),
    errors && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-destructive font-medium animate-in fade-in slide-in-from-left-2 transition-all", children: [
      /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
      errors
    ] })
  ] });
}
export {
  ImageUploader as I
};
