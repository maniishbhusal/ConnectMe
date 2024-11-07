import React, { useState } from "react";
import Navbar from "../common/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import LeftSidebar from "../common/LeftSidebar";
import RightSidebar from "../common/RightSidebar";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const RootLayout = () => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const location = useLocation();

  // Check if the current path matches the /communities/:communityName pattern
  const isCommunityPage = location.pathname.startsWith("/communities/");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 left-4 z-50 md:hidden h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-lg"
        onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
      >
        {isLeftSidebarOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>
      <div className="flex pt-14 relative">
        <LeftSidebar
          isOpen={isLeftSidebarOpen}
          onClose={() => setIsLeftSidebarOpen(false)}
        />
        <main
          className="flex-1 w-full transition-all duration-300 ease-in-out 
          md:ml-64 px-4 md:px-0"
        >
          <Outlet />
        </main>
        {/* Conditionally render RightSidebar only if not on a community page */}
        {!isCommunityPage && <RightSidebar />}
      </div>
    </div>
  );
};

export default RootLayout;
