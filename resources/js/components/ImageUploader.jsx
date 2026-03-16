import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Upload, X, ImageIcon } from "lucide-react";

export default function ImageUploader({ existingImages = [], onExistingChange, onFilesChange, newFiles = [], errors }) {
    const fileInputRef = useRef(null);

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

    const addImageUrl = () => {
        const url = prompt("Enter image URL");
        if (url) {
            onExistingChange([...existingImages, url]);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label>Images</Label>
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addImageUrl}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        URL
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {existingImages.map((url, index) => (
                    <div key={`existing-${index}`} className="relative group aspect-video">
                        <img
                            src={url}
                            alt={`Image ${index + 1}`}
                            className="w-full h-full object-cover rounded-md border"
                        />
                        <button
                            type="button"
                            onClick={() => removeExisting(index)}
                            className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}

                {newFiles.map((file, index) => (
                    <div key={`new-${index}`} className="relative group aspect-video">
                        <img
                            src={URL.createObjectURL(file)}
                            alt={`New ${index + 1}`}
                            className="w-full h-full object-cover rounded-md border ring-2 ring-primary/20"
                        />
                        <div className="absolute top-1 left-1 bg-primary text-primary-foreground px-1.5 py-0.5 rounded text-[10px] font-medium">
                            New
                        </div>
                        <button
                            type="button"
                            onClick={() => removeNewFile(index)}
                            className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}

                {existingImages.length === 0 && newFiles.length === 0 && (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-video rounded-md border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
                    >
                        <ImageIcon className="h-8 w-8" />
                        <span className="text-xs">Click to upload</span>
                    </button>
                )}
            </div>

            {errors && (
                <p className="text-sm text-destructive">{errors}</p>
            )}
        </div>
    );
}
