import React from 'react';
import { Search, Home, Compass, Bell, MessageSquare, BookMarked, Settings, Plus, TrendingUp, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from '../components/common/Navbar';

const HomePage = () => {
  // Sample data for posts
  const posts = [
    {
      id: 1,
      title: "Getting Started with Web Development in 2024",
      content: "As a beginner in web development, here are the essential technologies you need to learn...",
      author: "techEnthusiast",
      community: "webdev",
      upvotes: 324,
      comments: 45,
      timeAgo: "2h"
    },
    {
      id: 2,
      title: "The Future of AI: What to Expect",
      content: "Artificial Intelligence is rapidly evolving, and here's what we can expect in the coming years...",
      author: "aiResearcher",
      community: "artificialintelligence",
      upvotes: 892,
      comments: 156,
      timeAgo: "4h"
    }
  ];

  // Sample trending communities
  const trendingCommunities = [
    { name: "technology", members: "2.1M" },
    { name: "programming", members: "1.5M" },
    { name: "design", members: "890K" },
    { name: "startup", members: "450K" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      {/* <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold">ConnectMe</h2>
          </div>
          <div className="flex flex-1 items-center space-x-4 px-6">
            <Input
              type="search"
              placeholder="Search communities..."
              className="w-[300px] bg-muted"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav> */}

      <Navbar/>

      {/* Main Content */}
      <div className="flex pt-14">
        {/* Sidebar */}
        <aside className="fixed w-64 h-screen border-r pt-4">
          <ScrollArea className="h-[calc(100vh-3.5rem)]">
            <div className="space-y-4 py-4">
              <div className="px-3 py-2">
                <div className="space-y-1">
                  <Button variant="secondary" className="w-full justify-start">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Compass className="mr-2 h-4 w-4" />
                    Explore
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <BookMarked className="mr-2 h-4 w-4" />
                    Saved
                  </Button>
                </div>
              </div>
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold">Your Communities</h2>
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Community
                </Button>
                <div className="space-y-1 mt-4">
                  {trendingCommunities.map((community) => (
                    <Button
                      key={community.name}
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      c/{community.name}
                      <span className="ml-auto text-xs text-muted-foreground">
                        {community.members}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </aside>

        {/* Main Feed */}
        <main className="flex-1 ml-64">
          <div className="container max-w-4xl py-6">
            {/* Create Post Card */}
            <Card className="mb-6">
              <CardHeader className="flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src="/api/placeholder/32/32" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Input placeholder="Create a post" />
                <Button>Post</Button>
              </CardHeader>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/api/placeholder/24/24" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="space-x-2">
                        <span className="text-sm font-medium">c/{post.community}</span>
                        <span className="text-sm text-muted-foreground">• Posted by u/{post.author}</span>
                        <span className="text-sm text-muted-foreground">{post.timeAgo} ago</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold pt-2">{post.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{post.content}</p>
                  </CardContent>
                  <CardFooter className="space-x-4">
                    <Button variant="ghost" size="sm">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      {post.upvotes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {post.comments} Comments
                    </Button>
                    <Button variant="ghost" size="sm">
                      <BookMarked className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="fixed right-0 w-64 h-screen border-l pt-4">
          <ScrollArea className="h-[calc(100vh-3.5rem)]">
            <div className="px-4 py-2">
              <h2 className="mb-4 text-lg font-semibold">Trending Communities</h2>
              <div className="space-y-4">
                {trendingCommunities.map((community) => (
                  <Card key={community.name}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">c/{community.name}</h4>
                          <p className="text-sm text-muted-foreground">{community.members} members</p>
                        </div>
                        <Button size="sm">Join</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollArea>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;