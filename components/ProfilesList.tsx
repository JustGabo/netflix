"use client"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import useProfileStore from "@/stores/profile";
import Image from "next/image";

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
    <main className="flex items-center justify-center gap-8 mt-10">
      {userProfiles?.map((profile) => {
        return (
          <div
            key={profile.id}
            onClick={() => {
              setSelectedProfile(profile);
              setTimeout(() => {
                router.push("/");
              }, 500);
            }}
          >
            <div className="flex-row w-16 md:w-32 mx-auto group ">
              <div className="flex items-center justify-center md:w-32 md:h-32 w-16 h-16 overflow-hidden border-2 border-transparent rounded-md group-hover:cursor-pointer group-hover:border-white group-hover:transition">
                <Image width={200} height={200} src={profile.profileImg} alt="" />
              </div>
              <div className="md:mt-4 mt-2 text-base md:text-2xl text-center text-gray-400 group-hover:text-white group-hover:transition">
                {profile.profileName}
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default ProfilesList;
