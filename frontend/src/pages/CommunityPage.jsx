import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Calendar,
  MessageSquare,
  TrendingUp,
  Bell,
  BellOff,
  Share2,
  MoreVertical,
  Pin,
  BookmarkPlus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostCard } from "../components/common/PostCard";
import CreatePostDialog from "../components/navbar/CreatePostDialog";

const CommunityPage = () => {
  const { communityName } = useParams();
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Mock data - In real app, fetch this from API
  const communityData = {
    name: communityName,
    description:
      "A community for programming enthusiasts to share knowledge, ask questions, and collaborate on projects. Join us to discuss various programming languages, frameworks, and development practices.",
    members: 1500000,
    online: 2300,
    dateCreated: "2021-06-15",
    posts: 45000,
    image:
      "https://i.pinimg.com/originals/fb/7f/33/fb7f338e8a6e6f8d7795b2ff23e75754.png",
  };

  const posts = [
    {
      id: 1,
      title: "Best practices for React performance optimization",
      author: "reactdev123",
      upvotes: 1542,
      comments: 234,
      timePosted: "5 hours",
      content:
        "I've been working on optimizing React applications for the past few years and wanted to share some key learnings...",
      tags: ["React", "Performance", "JavaScript"],
    },
    {
      id: 2,
      title: "Getting started with TypeScript in 2024",
      author: "typescript_guru",
      upvotes: 892,
      comments: 156,
      timePosted: "12 hours",
      content:
        "TypeScript has become an essential tool for modern web development. Here's how to get started...",
      tags: ["TypeScript", "JavaScript", "Web Development"],
    },
    {
      id: 3,
      title: "Understanding async/await in JavaScript",
      author: "jsmaster",
      upvotes: 723,
      comments: 98,
      timePosted: "1 day",
      content:
        "Async/await has revolutionized how we handle asynchronous operations in JavaScript...",
      tags: ["JavaScript", "Async", "Programming"],
    },
  ];

  const toggleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Community Header */}
      <div className="relative">
        {/* Banner */}
        <div className="h-32 md:h-48 bg-gradient-to-r from-blue-600 to-purple-600" />

        {/* Community Info Section */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative -mt-16 pb-4 flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
            {/* Community Avatar */}
            <div className="w-32 h-32 rounded-full border-4 border-background bg-background overflow-hidden">
              <img
                src={communityData.image}
                alt={`${communityData.name} community`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Community Info */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold">
                c/{communityData.name}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {(communityData.members / 1000000).toFixed(1)}M members
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                  {communityData.online} online
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Created{" "}
                  {new Date(communityData.dateCreated).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 w-full md:w-auto">
              <Button
                onClick={toggleSubscribe}
                className="flex-1 md:flex-none"
                variant={isSubscribed ? "outline" : "default"}
              >
                {isSubscribed ? (
                  <>
                    <BellOff className="w-4 h-4 mr-2" />
                    Joined
                  </>
                ) : (
                  <>
                    <Bell className="w-4 h-4 mr-2" />
                    Join
                  </>
                )}
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Pin className="w-4 h-4 mr-2" />
                    Pin to Favorites
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BookmarkPlus className="w-4 h-4 mr-2" />
                    Save Community
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Content Area */}
          <div className="md:col-span-2">
            <Tabs defaultValue="posts" className="w-full">
              <TabsList>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="wiki">Wiki</TabsTrigger>
              </TabsList>
              <TabsContent value="posts" className="space-y-4">

                <CreatePostDialog/>

                {/* Posts would go here */}
                <div className="container max-w-4xl py-6 px-4 md:px-2">
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        usUserProfile={false}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="about">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">About Community</h3>
                    <p className="text-muted-foreground">
                      {communityData.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="space-y-1">
                        <p className="text-2xl font-bold">
                          {(communityData.posts / 1000).toFixed(1)}k
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Total Posts
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold">
                          {(communityData.members / 1000000).toFixed(1)}M
                        </p>
                        <p className="text-sm text-muted-foreground">Members</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="wiki">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center text-muted-foreground">
                      This community hasn't set up their wiki yet
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Community Rules</h3>
                <ol className="space-y-4 text-sm">
                  <li className="flex gap-2">
                    <span className="font-medium">1.</span>
                    <span className="text-muted-foreground">
                      Be respectful and helpful to other members
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium">2.</span>
                    <span className="text-muted-foreground">
                      No spam or self-promotion
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium">3.</span>
                    <span className="text-muted-foreground">
                      Use appropriate tags for your posts
                    </span>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Trending Topics</h3>
                <div className="space-y-2">
                  {["React", "Python", "JavaScript", "Web Development"].map(
                    (topic) => (
                      <div
                        key={topic}
                        className="flex items-center gap-2 text-sm"
                      >
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <span>{topic}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
