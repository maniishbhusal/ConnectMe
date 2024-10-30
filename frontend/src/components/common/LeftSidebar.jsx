import React from "react";
import { Home, Compass, BookMarked, Plus, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const LeftSidebar = ({ isOpen, onClose }) => {
  const trendingCommunities = [
    { name: "technology", members: "2.1M" },
    { name: "programming", members: "1.5M" },
    { name: "design", members: "890K" },
    { name: "startup", members: "450K" },
    { name: "data science", members: "700K" },
    { name: "cybersecurity", members: "600K" },
    { name: "artificial intelligence", members: "1.2M" },
    { name: "blockchain", members: "400K" },
    { name: "web development", members: "1M" },
    { name: "digital marketing", members: "350K" },
    { name: "game development", members: "500K" },
    { name: "cloud computing", members: "300K" },
    { name: "mobile development", members: "450K" },
    { name: "UX/UI design", members: "750K" },
    { name: "IoT", members: "200K" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 w-64 h-screen border-r pt-4 bg-background z-40 transition-transform duration-300 ease-in-out",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
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
              <h2 className="mb-2 px-4 text-lg font-semibold">
                Your Communities
              </h2>
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
    </>
  );
};

export default LeftSidebar;
