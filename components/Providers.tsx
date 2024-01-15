"use client";

import React, { useEffect } from "react";
import AccountContextProvider from "@/context/AccountContext";
import MovieUrlContextProvider from "@/context/MovieContext";
import ProfilesContext from "@/context/ProfilesContext";
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {

  const supabase = createClientComponentClient()

  const gettingProfiles = async ()=>{
    const result = await supabase.from('profiles').select('*')
  }


  useEffect(()=>{
    gettingProfiles()
  },[])


  return (
      <AccountContextProvider>
        <ProfilesContext>
          <MovieUrlContextProvider>{children}</MovieUrlContextProvider>
        </ProfilesContext>
      </AccountContextProvider>
  );
};

export default Providers;
