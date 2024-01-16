"use client"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import useProfileStore from "@/stores/profile";

const ProfilesList = () => {
  const router = useRouter  ();
  const supabase = createClientComponentClient()
  const {setSelectedProfile,setUserProfiles, userProfiles} = useProfileStore((state)=> state)

  const getUserAndProfiles = async ()=>{
    const {data:{user}} = await supabase.auth.getUser()

    if(user){
      const {data, error} = await supabase.from('profiles').select('*').eq('ownerEmail', user.email)
      if(error){
        console.log(error)
      }else{
        setUserProfiles(data)
      }
    }
  }

  useEffect(()=>{
    getUserAndProfiles()
  },[])

  return (
    <div className="flex items-center justify-center gap-8 mt-10">
      {userProfiles?.map((profile) => {
        return (
          <div
            key={profile.id}
            onClick={() => {
              setSelectedProfile(profile);
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
