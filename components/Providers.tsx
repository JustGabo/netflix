"use client";
import React from "react";
import UserContextProvider from "@/context/UserContext";
import AccountContextProvider from "@/context/AccountContext";
import MovieUrlContextProvider from "@/context/MovieContext";
import ProfilesContext from "@/context/ProfilesContext";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <UserContextProvider>
      <AccountContextProvider>
        <ProfilesContext>
          <MovieUrlContextProvider>{children}</MovieUrlContextProvider>
        </ProfilesContext>
      </AccountContextProvider>
    </UserContextProvider>
  );
};

export default Providers;
