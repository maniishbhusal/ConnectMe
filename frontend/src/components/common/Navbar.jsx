import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { Root } from "@radix-ui/react-visually-hidden";
import { SheetHeader } from "../ui/sheet";
import SignUpDialog from "../auth/SignUpDialog";
import LoginDialog from "../auth/LoginDialog";
import AuthDialogs from "../auth/AuthDialogs";

const Navbar = () => {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary p-2">
            <svg
              viewBox="0 0 24 24"
              fill="white"
              height="24"
              width="24"
              className="h-5 w-5"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            ConnectMe
          </span>
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

        {/* Mobile Search */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Search className="h-4 w-4" />
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 ml-2"
                ></Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          <AuthDialogs />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
