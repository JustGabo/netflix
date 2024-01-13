"use client";
import React, { useEffect, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { Profile } from "@/types";
import { useRouter } from "next/navigation";
import { useProfilesContext } from "@/context/ProfilesContext";
import { supabase } from "@/db/supabase";

const ChooseProfile = () => {
  const { user } = useUserContext();
  const { setProfile,MyProfiles } = useProfilesContext();
  const router = useRouter();
  // const [myProfiles, setMyProfiles] = useState<Profile[] | undefined>([]);


  const redirecting = async () => {
    const {data:{user}} = await supabase.auth.getUser()
    if(!user){
      router.push('/auth')
    }else{
      console.log(user)
    }
  };

  useEffect(() => {
    redirecting();
  }, []);


  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col">
        <h1 className="text-3xl text-center text-white md:text-6xl">
          Who is whatching?
        </h1>
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
      </div>
    </div>
  );
};

export default ChooseProfile;
