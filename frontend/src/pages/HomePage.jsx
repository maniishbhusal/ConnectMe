import React from "react";
import { MessageSquare, BookMarked, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const HomePage = () => {
  // Sample data for posts
  const posts = [
    {
      id: 1,
      title: "Getting Started with Web Development in 2024",
      content:
        "As a beginner in web development, here are the essential technologies you need to learn...",
      author: "techEnthusiast",
      community: "webdev",
      upvotes: 324,
      comments: 45,
      timeAgo: "2h",
    },
    {
      id: 2,
      title: "The Future of AI: What to Expect",
      content:
        "Artificial Intelligence is rapidly evolving, and here's what we can expect in the coming years...",
      author: "aiResearcher",
      community: "artificialintelligence",
      upvotes: 892,
      comments: 156,
      timeAgo: "4h",
    },
    {
      id: 3,
      title: "JavaScript ES2024 Features to Watch",
      content:
        "The upcoming features in ES2024 promise to enhance developer experience significantly...",
      author: "jsDev",
      community: "javascript",
      upvotes: 410,
      comments: 78,
      timeAgo: "1h",
    },
    {
      id: 4,
      title: "Understanding Machine Learning Basics",
      content:
        "This article breaks down the fundamental concepts of machine learning for beginners...",
      author: "mlGuru",
      community: "machinelearning",
      upvotes: 675,
      comments: 120,
      timeAgo: "3h",
    },
    {
      id: 5,
      title: "Top 10 Python Libraries for Data Science",
      content:
        "Explore the most popular Python libraries that are essential for data science projects...",
      author: "dataScientist",
      community: "datascience",
      upvotes: 530,
      comments: 90,
      timeAgo: "5h",
    },
    {
      id: 6,
      title: "Exploring the Metaverse: What You Need to Know",
      content:
        "A comprehensive guide to understanding the metaverse and its potential impact on society...",
      author: "vrExplorer",
      community: "virtualreality",
      upvotes: 210,
      comments: 32,
      timeAgo: "6h",
    },
    {
      id: 7,
      title: "Building Responsive Web Apps with React",
      content:
        "Learn how to create responsive web applications using React and its ecosystem...",
      author: "reactDev",
      community: "webdev",
      upvotes: 385,
      comments: 67,
      timeAgo: "1d",
    },
    {
      id: 8,
      title: "Cybersecurity Trends to Watch in 2024",
      content:
        "Stay ahead of the curve with the latest trends in cybersecurity and how they affect us...",
      author: "cyberExpert",
      community: "cybersecurity",
      upvotes: 420,
      comments: 55,
      timeAgo: "2d",
    },
    {
      id: 9,
      title: "The Role of Blockchain in Modern Business",
      content:
        "An overview of how blockchain technology is transforming various industries today...",
      author: "blockchainBuff",
      community: "blockchain",
      upvotes: 310,
      comments: 49,
      timeAgo: "3d",
    },
    {
      id: 10,
      title: "Creating Engaging Content for Social Media",
      content:
        "Tips and tricks for creating content that captivates audiences on social media platforms...",
      author: "socialMediaPro",
      community: "marketing",
      upvotes: 590,
      comments: 80,
      timeAgo: "4d",
    },
    {
      id: 11,
      title: "Tips for Effective Remote Team Management",
      content:
        "Strategies for managing remote teams effectively while maintaining productivity...",
      author: "teamLeader",
      community: "business",
      upvotes: 450,
      comments: 37,
      timeAgo: "5d",
    },
  ];

  return (
    <>
      <div className="container max-w-4xl py-6 px-4 md:px-2">
        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="hover:border-primary/50 transition-colors"
            >
              <CardHeader>
                <div className="flex items-center flex-wrap gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="space-x-2 flex-wrap">
                    <span className="text-sm font-medium">
                      c/{post.community}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      • Posted by u/{post.author}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {post.timeAgo} ago
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold pt-2">{post.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.content}</p>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
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
    </>
  );
};

export default HomePage;
