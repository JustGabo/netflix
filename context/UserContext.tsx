import React, { useState, useEffect, useContext, createContext } from "react";

import { supabase } from "@/db/supabase";
import { User } from "@supabase/supabase-js";

interface Props {
  children: React.ReactNode;
}

interface UserContextState {
  user: User | null;
  getUser: ()=> void
}

const initialState = {
  user: null,
  getUser: ()=>{}
};

export const UserContext = createContext<UserContextState>(initialState);

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data && user === null) {
      console.log(data)
      setUser(data.user);
      setLoading(false);
    }else{
      console.log(error)
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

  // const change = supabase.auth.onAuthStateChange((e, session) => {
  //   console.log(e, session);

  //   // if(user){
  //   //   router.push('/')
  //   // }

  //   // if (e === 'INITIAL_SESSION') {
  //   //   // handle initial session
  //   //   router.push('/auth')
  //   // }
  //   if (e === "SIGNED_IN") {
  //     // handle sign in event
  //     // getUser()
  //     router.push("/");
  //   } else if (e === "SIGNED_OUT") {
  //     // handle sign out event
  //     router.push("/auth");
  //   } else if (e === "PASSWORD_RECOVERY") {
  //     // handle password recovery event
  //   } else if (e === "TOKEN_REFRESHED") {
  //     // handle token refreshed event
  //   } else if (e === "USER_UPDATED") {
  //     // handle user updated event
  //   }
  // });
  useEffect(() => {
    getUser();
    // change;
  }, []);

  const value = {
    user,
    getUser
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
