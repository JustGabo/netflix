import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import useProfileStore from "@/stores/profile";

import AccountMenu from "./AccountMenu";
import Image from "next/image";

const NavBarRightSide = () => {
  const { selectedProfile } = useProfileStore((state)=> state);

  useEffect(() => {
    if (!selectedProfile) {
      redirect("/profiles");
    }
  }, []);

  
  return (
    <div className="relative flex flex-row items-center gap-2 cursor-pointer">
      <div className="w-6 h-6 overflow-hidden rounded-sm lg:w-10 lg:h-10">
        <Image width={100} height={100} src={selectedProfile?.profileImg!} alt="" />
      </div>
      
      <AccountMenu />
    </div>
  );
};

export default NavBarRightSide;
