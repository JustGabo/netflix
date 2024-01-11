"use client";
import React, { useEffect, useState } from "react";
import Profiles from "@/components/ChooseProfile";
import { usingContext } from "@/context/UserContext";
import { User } from "@/types";
import { supabase } from "@/db/supabase";
import { useRouter } from "next/navigation";

const ChooseProfile = () => {
  const { user } = usingContext();
  const [profiles, setProfiles] = useState<User | []>([]);
  const router = useRouter();


  useEffect(() => {
    if(user){
      const getProfiles = async () => {
        const result = await supabase
          .from("profiles")
          .select("*")
          .eq("ownerId", user?.userId);
        console.log(result);
      };
      getProfiles();
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col">
        <h1 className="text-3xl text-center text-white md:text-6xl">
          Who is whatching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => router.push('/')}>
            <div className="flex-row w-32 mx-auto group ">
              <div className="flex items-center justify-center w-32 h-32 overflow-hidden border-2 border-transparent rounded-md group-hover:cursor-pointer group-hover:border-white group-hover:transition">
                <img src="/images/profile-red.png" alt="" />
              </div>
              <div className="mt-4 text-2xl text-center text-gray-400 group-hover:text-white group-hover:transition">
                Name
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseProfile;
