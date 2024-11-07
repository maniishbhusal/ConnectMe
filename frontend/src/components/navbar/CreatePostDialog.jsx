import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Image, Link, FileText, Video, Plus } from "lucide-react";

const PostTypes = [
  {
    id: "text",
    icon: FileText,
    title: "Text Post",
    description: "Share your thoughts with text",
  },
  {
    id: "image",
    icon: Image,
    title: "Image Post",
    description: "Share photos or artwork",
  },
  {
    id: "link",
    icon: Link,
    title: "Link",
    description: "Share a link to any content",
  },
  {
    id: "video",
    icon: Video,
    title: "Video",
    description: "Share a video",
  },
];

const CreatePostDialog = () => {
  const [selectedType, setSelectedType] = React.useState("text");

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* Adjust button visibility to show on all screen sizes */}
        <Button className="flex gap-2 w-full md:w-auto">
          <Plus className="h-4 w-4" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>Create a Post</DialogTitle>
          <DialogDescription>
            Choose a post type and share with your community
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="text"
          value={selectedType}
          onValueChange={setSelectedType}
        >
          <TabsList className="grid grid-cols-4 gap-2 mt-4">
            {PostTypes.map((type) => (
              <TabsTrigger
                key={type.id}
                value={type.id}
                className="flex flex-col gap-1 items-center justify-center h-20 md:h-auto data-[state=active]:bg-primary/10"
              >
                <type.icon className="h-5 w-5 md:h-6 md:w-6" />
                <span className="text-xs md:text-sm">{type.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/api/placeholder/32/32" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Input placeholder="Title" className="font-medium w-full" />
            </div>

            <TabsContent value="text">
              <Textarea
                placeholder="What's on your mind?"
                className="min-h-[200px] md:min-h-[300px]"
              />
            </TabsContent>

            <TabsContent value="image">
              <div className="border-2 border-dashed rounded-lg p-6 md:p-8 text-center">
                <Image className="h-6 md:h-8 w-6 md:w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm md:text-base text-muted-foreground mb-2">
                  Drag and drop images or click to upload
                </p>
                <Button variant="secondary">Choose File</Button>
              </div>
            </TabsContent>

            <TabsContent value="link">
              <Input placeholder="Paste your link here" />
              <Textarea
                placeholder="Add a description (optional)"
                className="mt-4 min-h-[100px] md:min-h-[150px]"
              />
            </TabsContent>

            <TabsContent value="video">
              <div className="border-2 border-dashed rounded-lg p-6 md:p-8 text-center">
                <Video className="h-6 md:h-8 w-6 md:w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm md:text-base text-muted-foreground mb-2">
                  Upload a video or paste a video link
                </p>
                <Button variant="secondary">Choose File</Button>
              </div>
            </TabsContent>
          </div>

          <div className="flex justify-between mt-4">
            <Button variant="ghost">Save Draft</Button>
            <div className="space-x-2">
              <Button variant="outline">Preview</Button>
              <Button>Post</Button>
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
