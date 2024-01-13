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
import { useAccountContext } from "@/context/AccountContext";
import { useProfilesContext } from "@/context/ProfilesContext";

const AccountMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { profile, MyProfiles } = useProfilesContext();

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
      <DropdownMenuContent className="mt-5 mr-24 text-white border bg-zinc-950 w-36 border-zinc-500">
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex gap-2 p-3 cursor-pointer hover:bg-transparent">
            <img className="h-6" src={profile?.profileImg} alt="" />
            <span className="text-sm">{profile?.profileName}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-zinc-500" />
        <DropdownMenuGroup>
          {MyProfiles?.map((profile) => {
            return (
              <DropdownMenuItem
                key={profile.id}
                className="flex gap-2 p-3 cursor-pointer hover:bg-transparent"
              >
                <img className="h-6" src={profile?.profileImg} alt="" />
                <span className="text-sm">{profile?.profileName}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-zinc-500" />
        <DropdownMenuItem className="p-3 text-xs cursor-pointer">
          <button onClick={signOut}>Sign out of Nextflix</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;
