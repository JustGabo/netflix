import React, { useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { Profile } from "@/types";
import { supabase } from "@/db/supabase";

interface Props {
  children: React.ReactNode;
}

interface State {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
  MyProfiles: Profile[] | null;
}

const initialState = {
  profile: null,
  setProfile: () => {},
  MyProfiles: null,
};

const CurrentProfileContext = React.createContext<State>(initialState);

const CurrentProfileContextProvider = ({ children }: Props) => {
  const { user } = useUserContext();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [MyProfiles, setMyProfiles] = useState<Profile[] | null>([]);

  const getProfiles = async () => {
    const { data } = await supabase 
      .from("profiles")
      .select("*")
      .eq("ownerEmail", user?.email);
    setMyProfiles(data);
  };

  useEffect(() => {
    getProfiles();
    console.log(user)
  }, [user]);

  useEffect(() => {
    console.log(MyProfiles);
  }, [MyProfiles]);

  const value = {
    profile,
    setProfile,
    MyProfiles
  };

  return (
    <CurrentProfileContext.Provider value={value}>
      {children}
    </CurrentProfileContext.Provider>
  );
};

export default CurrentProfileContextProvider;

export const useProfilesContext = () => {
  const context = useContext(CurrentProfileContext);
  if (context === undefined) {
    throw new Error(
      "usingCurentProfileContext must be used within a CurrentProfileContextProvider"
    );
  }
  return context;
};
