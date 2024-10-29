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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthDialogs from "../auth/AuthDialogs";
import { Bell, MessageSquare } from "lucide-react";
import { useAuth } from "../hooks/context/authContext";

const Navbar = () => {
  const { isAuth, handleLogout } = useAuth();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
        {isAuth ? (
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
            <Button variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          // Auth Section
          <div className="flex items-center gap-4">
            <AuthDialogs />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
