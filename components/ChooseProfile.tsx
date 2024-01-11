"use client";
import React, { useEffect, useState } from "react";
import Profiles from "@/components/ChooseProfile";
import { usingContext } from "@/context/UserContext";
import { User } from "@/types";
import { supabase } from "@/db/supabase";

const ChooseProfile = () => {
  const { user } = usingContext();
  const [profiles, setProfiles] = useState<User | []>([]);

  const getProfiles = async () => {
    const result = await supabase
      .from("profiles")
      .select("*")
      .eq("ownerId", user?.userId);
    console.log(result);
  };

  useEffect(() => {
    getProfiles();
  }, [user]);

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is whatching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => {}}>
            <div className="group flex-row w-32 mx-auto ">
              <div className="w-32 h-32 rounded-md flex  items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white group-hover:transition overflow-hidden">
                <img src="/images/profile-red.png" alt="" />
              </div>
              <div className="mt-4 text-gray-400 text-center text-2xl group-hover:text-white group-hover:transition">
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
