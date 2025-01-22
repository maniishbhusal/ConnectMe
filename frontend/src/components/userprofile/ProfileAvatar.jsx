import React, { useState, useCallback, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Pencil, Upload, X, Image as ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";

export function ProfileAvatar({ src, alt, isEditable, onUpload }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Add window resize listener
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // 1024px is typical lg breakpoint
    };

    checkScreenSize(); // Check on initial render
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles?.length && isLargeScreen) {
        const file = acceptedFiles[0];
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
      }
    },
    [isLargeScreen]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif"],
    },
    maxFiles: 1,
    multiple: false,
    disabled: !isLargeScreen,
  });

  const handleSave = () => {
    if (preview) {
      onUpload?.(preview);
      setIsOpen(false);
      setPreview(null);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
    setPreview(null);
  };

  return (
    <>
      <div className="relative group">
        <Avatar className="h-32 w-32 border-4 border-background">
          <AvatarImage src={src} />
          <AvatarFallback>{alt}</AvatarFallback>
        </Avatar>
        {isEditable && (
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-0 right-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setIsOpen(true)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full"
                  onClick={() => setPreview(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
                  isDragActive && isLargeScreen
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25"
                } ${!isLargeScreen ? "pointer-events-none" : ""}`}
              >
                <input {...getInputProps()} />
               
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 rounded-full bg-primary/10">
                    <ImageIcon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      {isDragActive
                        ? "Drop your image here"
                        : "Drag and drop your image here"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or GIF
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.querySelector('input[type="file"]').click();
                    }}
                    className="mt-2"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!preview}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
