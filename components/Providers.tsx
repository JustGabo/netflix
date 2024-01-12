"use client";
import React from "react";
import UserContextProvider from "@/context/UserContext";
import AccountContextProvider from "@/context/AccountContext";
import MovieUrlContextProvider from "@/context/MovieContext";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <UserContextProvider>
      <AccountContextProvider>
        <MovieUrlContextProvider>{children}</MovieUrlContextProvider>
      </AccountContextProvider>
    </UserContextProvider>
  );
};

export default Providers;
