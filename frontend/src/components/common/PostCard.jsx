import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { TrendingUp, MessageSquare, BookMarked } from "lucide-react";

export function PostCard({ post, isUserProfile }) {
  return (
    <Card key={post?.id} className="hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-center flex-wrap gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={
                post?.authorAvatar ||
                "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
              }
            />
            <AvatarFallback>{post?.author?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div className="space-x-2 flex-wrap">
              <span className="text-sm font-medium">
                c/{post?.community || "general"}
              </span>
            <span className="text-sm text-muted-foreground">
              • Posted by u/{post?.author || "unknown"}
            </span>
            <span className="text-sm text-muted-foreground">
              {post?.timePosted || "some time"} ago
            </span>
          </div>
        </div>
        <h3 className="text-xl font-semibold pt-2">
          {post?.title || "Untitled Post"}
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {post?.content || "No content available."}
        </p>
        {post?.image && (
          <div className="mt-4 rounded-lg overflow-hidden w-full max-w-lg">
            <img
              src={post.image}
              alt="Post"
              className="w-full h-full aspect-square object-cover"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button variant="ghost" size="sm">
          <TrendingUp className="mr-2 h-4 w-4" />
          {post?.upvotes || 0}
        </Button>
        <Button variant="ghost" size="sm">
          <MessageSquare className="mr-2 h-4 w-4" />
          {post?.comments || 0} Comments
        </Button>
        <Button variant="ghost" size="sm">
          <BookMarked className="mr-2 h-4 w-4" />
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
