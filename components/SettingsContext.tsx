import { Profile } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface SettingsContextProps{
    profile: Profile
}

const SettingsContext: React.FC<SettingsContextProps> = ({profile}) => {
  
    const router = useRouter()

    return (
    <div
      onClick={() => {
        // setSelectedProfile(profile);
        setTimeout(() => {
          router.push("/");
        }, 500);
      }}
    >
      <div className="flex-row w-16 md:w-32 mx-auto group ">
        <div className="flex items-center justify-center md:w-32 md:h-32 w-8 h-8 overflow-hidden border-2 border-transparent rounded-md group-hover:cursor-pointer group-hover:border-white group-hover:transition">
          <img className="w-5 h-5" src={profile.profileImg} alt="" />
        </div>
        <div className="md:mt-4 mt-2 text-base md:text-2xl text-center text-gray-400 group-hover:text-white group-hover:transition">
          {profile.profileName}
        </div>
      </div>
    </div>
  );
};

export default SettingsContext;
