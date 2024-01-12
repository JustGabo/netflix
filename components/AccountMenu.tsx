"use client";
import { supabase } from "@/db/supabase";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";

const AccountMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const Icon = isOpen ? ChevronUp : ChevronDown;

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={() => setIsOpen(true)} asChild>
        <button className="text-white transition">
          <Icon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-950 w-36 mt-5 mr-24 border border-zinc-500  text-white">
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex gap-2 p-3 cursor-pointer hover:bg-transparent">
            <img className="h-6" src="/images/profile-red.png" alt="" />
            <span className="text-sm">User1</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-zinc-500" />
        <DropdownMenuItem className="text-xs p-3 cursor-pointer">
          <button onClick={signOut}>Sign out of Nextflix</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;
