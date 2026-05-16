import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ImageUploader({ existingImages = [], onExistingChange, onFilesChange, newFiles = [], errors }) {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [previews, setPreviews] = useState([]);

    // Update previews when newFiles changes
    useEffect(() => {
        const newPreviews = newFiles.map(file => ({
            file,
            url: URL.createObjectURL(file)
        }));
        setPreviews(newPreviews);

        // Cleanup URLs when component unmounts or newFiles changes
        return () => {
            newPreviews.forEach(p => URL.revokeObjectURL(p.url));
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
        const validFiles = files.filter(file => file.type.startsWith("image/"));
        onFilesChange([...newFiles, ...validFiles]);
    };

    const addImageUrl = () => {
        const url = prompt("Enter image URL");
        if (url) {
            onExistingChange([...existingImages, url]);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <Label className="text-base font-bold">Gallery Images</Label>
                    <p className="text-xs text-muted-foreground mt-0.5">Upload multiple photos or provide URLs.</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-xl h-9"
                        onClick={addImageUrl}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add URL
                    </Button>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                />
            </div>

            <div 
                className={cn(
                    "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 border-2 border-dashed rounded-2xl transition-all duration-200",
                    isDragging 
                        ? "border-primary bg-primary/5 scale-[0.99]" 
                        : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* Existing Images */}
                {existingImages.map((url, index) => (
                    <div key={`existing-${index}`} className="relative group aspect-video animate-in zoom-in-95 duration-200">
                        <img
                            src={url}
                            alt={`Image ${index + 1}`}
                            className="w-full h-full object-cover rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                            <button
                                type="button"
                                onClick={() => removeExisting(index)}
                                className="bg-destructive text-destructive-foreground p-2 rounded-full transform scale-75 group-hover:scale-100 transition-transform"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {/* New Files */}
                {previews.map((preview, index) => (
                    <div key={`new-${index}`} className="relative group aspect-video animate-in zoom-in-95 duration-200">
                        <img
                            src={preview.url}
                            alt={`New ${index + 1}`}
                            className="w-full h-full object-cover rounded-xl border-2 border-primary shadow-sm"
                        />
                        <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">
                            New
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                            <button
                                type="button"
                                onClick={() => removeNewFile(index)}
                                className="bg-destructive text-destructive-foreground p-2 rounded-full transform scale-75 group-hover:scale-100 transition-transform"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Upload Placeholder */}
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                        "aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all duration-300 group",
                        isDragging 
                            ? "border-transparent" 
                            : "border-zinc-300 dark:border-zinc-700 hover:border-primary/50 hover:bg-white dark:hover:bg-zinc-800"
                    )}
                >
                    <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Upload className="h-5 w-5" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium">Click or drag here</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">PNG, JPG up to 2MB</p>
                    </div>
                </button>
            </div>

            {errors && (
                <div className="flex items-center gap-2 text-sm text-destructive font-medium animate-in fade-in slide-in-from-left-2 transition-all">
                    <X className="h-4 w-4" />
                    {errors}
                </div>
            )}
        </div>
    );
}
