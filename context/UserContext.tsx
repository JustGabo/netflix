import React, { useState, useEffect, useContext, createContext } from "react";

// import { User } from "@/types/index";
import { supabase } from "@/db/supabase";
import { useRouter } from "next/navigation";
import {User} from '@supabase/supabase-js'

interface Props {
  children: React.ReactNode;
}

interface UserContextState {
  user: User | null;
}

const initialState = {
  user: null,
};

export const UserContext = createContext<UserContextState>(initialState);

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null >(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true)

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data) {
      setUser(data.user)
      setLoading(false)
    }

    // if (data) {
    //   console.log(data);
    //   const { data: UserData, error } = await supabase
    //     .from("users")
    //     .select("*")
    //     .eq("email", data.user?.email);
    //   if (UserData) {
    //     console.log(UserData);
    //     setUser(UserData);
    //   } else {
    //     console.log(error);
    //   }
    // }
  };

  const change = supabase.auth.onAuthStateChange((e, session) => {
    console.log(e, session);

    // if(user){
    //   router.push('/')
    // }

    // if (e === 'INITIAL_SESSION') {
    //   // handle initial session
    //   router.push('/auth')
    // }
    if (e === "SIGNED_IN") {
      // handle sign in event
      // getUser()
      router.push("/profiles");
    } else if (e === "SIGNED_OUT") {
      // handle sign out event
      router.push("/auth");
    } else if (e === "PASSWORD_RECOVERY") {
      // handle password recovery event
    } else if (e === "TOKEN_REFRESHED") {
      // handle token refreshed event
    } else if (e === "USER_UPDATED") {
      // handle user updated event
    }
  });

  // useEffect(() => {
  //   if (user) {
  //     const getProfiles = async () => {
  //       const { data, error } = await supabase
  //         .from("profiles")
  //         .select("*")
  //         .eq("ownerEmail", user?.email);
  //       if (data) {
  //         console.log(data);
  //         // setProfiles(data);
  //       } else {
  //         console.log(error);
  //       }
  //     };
  //     getProfiles()
  //   }
  // }, [user]);

  useEffect(() => {
    getUser();
    // change;
  }, []);

  const value = {
    user,
  };

  return <UserContext.Provider value={value}>{!loading && children}</UserContext.Provider>;
};

export default UserContextProvider;

export const usingContext = () => {
  const context = useContext(UserContext);
  return context;
};
