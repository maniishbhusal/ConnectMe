import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";

const RightSidebar = () => {
  const trendingCommunities = [
    { name: "technology", members: "2.1M", growth: "+12%" },
    { name: "programming", members: "1.5M", growth: "+8%" },
    { name: "design", members: "890K", growth: "+15%" },
    { name: "startup", members: "450K", growth: "+20%" },
    { name: "data science", members: "700K", growth: "+10%" },
    { name: "cybersecurity", members: "600K", growth: "+18%" },
  ];

  return (
    <>
      <aside
        className={cn(
          "sticky top-2 max-w-72 h-screen bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-l py-12 xl:mr-28 z-40",
          "transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          "translate-x-full",
          "hidden lg:block"
        )}
      >
        <ScrollArea className="h-[calc(100vh-3.5rem)]">
          <div className="px-6 py-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Trending Communities</h2>
            </div>
            <div>
              {trendingCommunities.map((community) => (
                <div
                  key={community.name}
                  className="group relative px-4 py-3 rounded-lg hover:bg-muted/50 transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-4 w-4 text-primary" />
                        </span>
                        <h4 className="font-medium max-w-72 text-sm capitalize group-hover:text-primary transition-colors">
                          {community.name}
                        </h4>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {community.members}
                        </span>
                        <span className="text-emerald-500">
                          {community.growth}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};

export default RightSidebar;
