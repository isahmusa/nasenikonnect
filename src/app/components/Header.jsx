"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Info, LogOut, Moon, Plus, Sun, Video, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!theme) {
      setTheme("light"); // Default theme is light with blue accents
    }
  }, [theme, setTheme]);

  const formatTimeDate = () => {
    const now = new Date();
    return now.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const userPlaceHolder = session?.user?.name
    ?.split(" ")
    .map((name) => name[0])
    .join("");

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/user-auth" });
  };

  const generateAvatarColor = () => {
    const colors = [
      "bg-gradient-to-r from-blue-500 to-blue-700",
      "bg-gradient-to-r from-blue-400 to-blue-600",
      "bg-gradient-to-r from-blue-300 to-blue-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <header className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 border-b shadow-lg">
      {/* Left Side: Logo */}
      <div className="flex items-center space-x-4 w-full md:w-auto animate-fadeIn">
        <Link href="/" className="flex items-center space-x-2">
          <Video className="w-6 h-6 md:w-8 md:h-8 text-white animate-bounce" />
          <span className="hidden md:block text-lg md:text-xl font-semibold text-white">
            NASENIKonnect
          </span>
        </Link>
      </div>

      {/* Middle: User Greeting */}
      <div className="flex justify-center w-full md:flex-1 text-center mt-2 md:mt-0 animate-slideIn">
        <h1 className="text-base md:text-lg font-medium text-white truncate">
          Welcome, {session?.user?.name || "User"}!
        </h1>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center space-x-3 mt-2 md:mt-0">
        <span className="text-sm md:text-md text-white hidden sm:block">
          {formatTimeDate()}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            setTheme(theme === "light" ? "dark" : "light")
          }
        >
          {theme === "light" ? (
            <Sun className="w-4 h-4 md:w-5 md:h-5 text-white transition-transform duration-200 hover:scale-110" />
          ) : (
            <Moon className="w-4 h-4 md:w-5 md:h-5 text-white transition-transform duration-200 hover:scale-110" />
          )}
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:block">
          <Info className="w-5 h-5 ml-2 text-white transition-opacity duration-200 hover:opacity-80" />
        </Button>

        {/* Dropdown Menu */}
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer shadow-lg transform transition-transform hover:scale-105">
              {session?.user?.image ? (
                <AvatarImage
                  src={session?.user?.image}
                  alt={session?.user?.name}
                  className="rounded-full"
                />
              ) : (
                <AvatarFallback
                  className={`text-lg ${generateAvatarColor()}`}
                >
                  {userPlaceHolder}
                </AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-64 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl animate-fadeIn"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-800 dark:text-white truncate">
                {session?.user?.email}
              </span>
              <Button
                className="rounded-full p-4"
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5 text-blue-600" />
              </Button>
            </div>
            <div className="flex flex-col items-center mb-4">
              <Avatar className="w-16 h-16 md:w-20 md:h-20 mb-2 transform transition-transform hover:scale-105">
                {session?.user?.image ? (
                  <AvatarImage
                    src={session?.user?.image}
                    alt={session?.user?.name}
                  />
                ) : (
                  <AvatarFallback
                    className={`text-xl md:text-2xl ${generateAvatarColor()}`}
                  >
                    {userPlaceHolder}
                  </AvatarFallback>
                )}
              </Avatar>
              <h1 className="text-lg md:text-xl font-semibold mt-2">
                Hi, {session?.user?.name}!
              </h1>
            </div>
            <div className="flex mb-4">
              <Button
                className="w-1/2 h-12 rounded-l-full bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:bg-blue-700"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2 text-white" />
                Add Account
              </Button>
              <Button
                className="w-1/2 h-12 rounded-r-full bg-blue-700 text-white hover:bg-blue-800"
                variant="outline"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2 text-white" />
                SignOut
              </Button>
            </div>
            <div className="text-center text-sm text-gray-500">
              <Link href="#" className="hover:bg-gray-300 p-2 rounded-lg">
                Privacy Policy
              </Link>
              {" . "}
              <Link href="#" className="hover:bg-gray-300 p-2 rounded-lg">
                Terms of Service
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
