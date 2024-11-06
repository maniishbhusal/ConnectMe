// PostCard.js
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export function PostCard({ post }) {
  return (
    <Card key={post.id}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src="/api/placeholder/40/40" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">John Doe</span>
              <span className="text-sm text-muted-foreground">@johndoe</span>
            </div>
            <div className="cursor-pointer">
              <p className="mt-2">{post.content}</p>
              {post.image && (
                <div className="mt-4 rounded-lg overflow-hidden w-full max-w-lg">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-full aspect-square object-cover"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
              <button className="hover:text-primary">{post.likes} likes</button>
              <button className="hover:text-primary">
                {post.comments} comments
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
