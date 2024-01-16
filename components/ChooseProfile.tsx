"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProfilesContext } from "@/context/ProfilesContext";
import ProfilesList from "./ProfilesList";

const ChooseProfile = () => {
  const { setProfile,MyProfiles } = useProfilesContext();
  const router = useRouter();
  // const [myProfiles, setMyProfiles] = useState<Profile[] | undefined>([]);



  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col">
        <h1 className="text-3xl text-center text-white md:text-6xl">
          Who is whatching?
        </h1>
        <ProfilesList/>
      </div>
    </div>
  );
};

export default ChooseProfile;
