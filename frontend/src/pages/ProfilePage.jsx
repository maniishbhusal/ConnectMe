import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileAvatar } from "../components/userprofile/ProfileAvatar";
import { StatButton } from "../components/userprofile/StatButton";
import { ProfileEditForm } from "../components/userprofile/ProfileEditForm";
import { PostCard } from "../components/userprofile/PostCard";
import { MapPin, Link as LinkIcon, Calendar } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function ProfilePage() {
  
  const stats = [
    { label: "Posts", value: "2,345" },
    { label: "Followers", value: "12.5k" },
    { label: "Following", value: "1,789" },
  ];

  const posts = [
    {
      id: 1,
      content: "Just launched my new project! #coding #webdev",
      likes: 234,
      comments: 45,
      //   image: "https://play-lh.googleusercontent.com/MzBo2YvXgIxn-PS01V7e-go2MlDsPMOhcze_CcqgTP94b3jmo72ATgl_dwFM1ovv5A",
    },
    {
      id: 2,
      content: "Beautiful sunset at the beach 🌅",
      likes: 567,
      comments: 89,
      image:
        "https://media.sproutsocial.com/uploads/2022/05/How-to-post-on-instagram-from-pc.svg",
    },
    {
      id: 3,
      content: "Learning new technologies is always exciting!",
      likes: 123,
      comments: 34,
      image:
        "https://cdn.leonardo.ai/users/53102a56-7784-4f0b-be72-463f484795c2/generations/01aede48-c285-4192-9d69-2a70dcb37b91/variations/alchemyrefiner_alchemymagic_0_01aede48-c285-4192-9d69-2a70dcb37b91_0.jpg?w=512",
    },
  ];

  const handleProfileImageUpload = (imageUrl) => {
    // Handle the uploaded image here
    console.log("New profile image:", imageUrl);
    // You would typically upload this to your server
    // and update the user's profile
  };

  return (
    <div className="min-h-screen bg-background pt-8 px-4 sm:px-6">
      <div className="container max-w-4xl mx-auto flex flex-col items-center md:items-start md:flex-row md:gap-6">
        <ProfileAvatar
          src="/api/placeholder/128/128"
          alt="JD"
          isEditable={true}
          onUpload={handleProfileImageUpload}
        />
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold">John Doe</h1>
          <p className="text-muted-foreground">@johndoe</p>
          <p className="mt-2 text-base text-gray-700 max-w-lg">
            Full-stack developer passionate about creating beautiful user
            experiences.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground mt-4">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              San Francisco, CA
            </div>
            <div className="flex items-center">
              <LinkIcon className="h-4 w-4 mr-1" />
              <a href="#" className="text-primary hover:underline">
                github.com/johndoe
              </a>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Joined December 2023
            </div>
          </div>

          <div className="flex gap-4 mt-6 justify-center md:justify-start">
            {stats.map((stat) => (
              <StatButton key={stat.label} {...stat} />
            ))}
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <DialogDescription className="hidden">
                Edit User Profile Info
              </DialogDescription>
              <ProfileEditForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto mt-8">
        <Tabs defaultValue="posts">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="likes">Likes</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <div className="grid gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="media" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {posts.map(
                (post) =>
                  post.image && (
                    <img
                      key={post.id}
                      src={post.image}
                      alt="Media"
                      className="rounded-lg aspect-square object-cover hover:opacity-90 transition-opacity cursor-pointer"
                    />
                  )
              )}
            </div>
          </TabsContent>

          <TabsContent
            value="likes"
            className="text-center py-12 text-muted-foreground"
          >
            No liked posts yet
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
