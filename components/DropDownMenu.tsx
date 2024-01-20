import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

const DropDownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center text-xs text-white gap-1">
          Browser
          <ChevronDownIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-900 border-zinc-500 text-white">
        <DropdownMenuGroup>
          <DropdownMenuItem>Home</DropdownMenuItem>
          <DropdownMenuItem>Series</DropdownMenuItem>{" "}
          <DropdownMenuItem>Films</DropdownMenuItem>
          <DropdownMenuItem>New & Popular</DropdownMenuItem>
          <DropdownMenuItem>My List</DropdownMenuItem>
          <DropdownMenuItem>Browse by Languages</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenu;
