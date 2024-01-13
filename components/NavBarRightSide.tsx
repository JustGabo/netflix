import React, { useEffect } from "react";
import AccountMenu from "./AccountMenu";
import { useProfilesContext } from "@/context/ProfilesContext";
import { redirect } from "next/navigation";

const NavBarRightSide = () => {
  const { profile } = useProfilesContext();

  useEffect(() => {
    if (!profile) {
      redirect("/profiles");
    }
  }, [profile]);

  return (
    <div className="relative flex flex-row items-center gap-2 cursor-pointer">
      <div className="w-6 h-6 overflow-hidden rounded-md lg:w-10 lg:h-10">
        <img src={profile?.profileImg} alt="" />
      </div>
      <AccountMenu />
    </div>
  );
};

export default NavBarRightSide;
