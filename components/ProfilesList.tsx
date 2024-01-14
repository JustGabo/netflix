"use client"
import { useProfilesContext } from "@/context/ProfilesContext";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProfilesList = () => {
  const { setProfile, MyProfiles } = useProfilesContext();
  const {getUser} = useUserContext()
  const router = useRouter  ();

  useEffect(()=>{
    getUser()
    router.refresh()
  },[])

  return (
    <div className="flex items-center justify-center gap-8 mt-10">
      {MyProfiles?.map((profile) => {
        return (
          <div
            key={profile.id}
            onClick={() => {
              setProfile(profile);
              setTimeout(() => {
                router.push("/");
              }, 1000);
            }}
          >
            <div className="flex-row w-32 mx-auto group ">
              <div className="flex items-center justify-center w-32 h-32 overflow-hidden border-2 border-transparent rounded-md group-hover:cursor-pointer group-hover:border-white group-hover:transition">
                <img src={profile.profileImg} alt="" />
              </div>
              <div className="mt-4 text-2xl text-center text-gray-400 group-hover:text-white group-hover:transition">
                {profile.profileName}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfilesList;
