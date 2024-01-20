import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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
import { useRouter } from "next/navigation";
import useProfileStore from "@/stores/profile";

const AccountMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {selectedProfile,userProfiles} = useProfileStore((state)=> state)

  
  const supabase = createClientComponentClient();

  const Icon = isOpen ? ChevronUp : ChevronDown;

  const signOut = async () => {
    localStorage.removeItem("profile-storage");
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    localStorage.removeItem('user-storage')
    localStorage.removeItem('profile-storage')
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={() => setIsOpen(true)} asChild>
        <button className="text-white transition">
          <Icon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-1 mr-8 md:mt-5 md:mr-24 text-white border bg-zinc-900 w-36 border-zinc-500">
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex gap-2 p-3 cursor-pointer hover:bg-transparent">
            <img className="h-6" src={selectedProfile?.profileImg} alt="" />
            <span className="text-sm">{selectedProfile?.profileName}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-zinc-500" />
        <DropdownMenuGroup>
          {userProfiles?.map((profile) => {
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
