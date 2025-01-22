import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, MessageSquare, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { Root } from "@radix-ui/react-visually-hidden";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthDialogs from "../auth/AuthDialogs";
import { useAuth } from "../hooks/context/authContext";

const Navbar = () => {
  const { isAuth, handleLogout } = useAuth();

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold">ConnectMe</h2>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:block flex-1 mx-16">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search ConnectMe..."
              className="pl-10 w-full max-w-md bg-muted/40 border-none"
            />
          </div>
        </div>

        {/* Mobile Search and Create Post */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9">
                <Search className="h-4 w-4 text-muted-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full p-0">
              <SheetHeader>
                <SheetTitle className="hidden">Search</SheetTitle>
                <SheetDescription>
                  <Root>Search Field</Root>
                </SheetDescription>
              </SheetHeader>
              <div className="flex items-center border-b border-border h-13 px-4 pb-3">
                <Search className="h-4 w-4 text-muted-foreground mr-2" />
                <Input
                  className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                  placeholder="Search ConnectMe..."
                  autoFocus
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {isAuth ? (
          <div className="flex items-center ">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>

            <div className="relative group">
              <Button variant="ghost" className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
              <div className="absolute right-0 w-48 bg-background rounded-md shadow-lg py-1 z-10 hidden group-hover:block border">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                >
                  Settings
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <AuthDialogs />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
