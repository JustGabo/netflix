"use client"
import React, { useEffect, useState } from "react";
import NavBarItem from "./NavBarItem";
import DropDownMenu from "./DropDownMenu";
import { BsSearch, BsBell } from "react-icons/bs";
import AccountMenu from "./AccountMenu";
import { useProfilesContext } from "@/context/ProfilesContext";

const TOP_OFFSET = 66


const NavBar = () => {

  const [showBackground, SetShowBackground] = useState(false)
  const {profile} = useProfilesContext()

  useEffect(()=>{
    const handleScroll = ()=>{
      if(window.scrollY >= TOP_OFFSET){
        SetShowBackground(true)
      }else{
        SetShowBackground(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return ()=>{
      window.addEventListener('scroll', handleScroll)
    }
  },[])

  return (
    <nav className="fixed z-40 w-full">
      <div className={`px-4 md:px-16 py-6 flex flex-row items-center  transition-none duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
        <img src="/images/logo.png" className="h-6 lg:h-7" alt="logo" />
        <div className="flex-row hidden ml-8 text-xs gap-7 lg:flex">
          <NavBarItem label="Home" />
          <NavBarItem label="Series" />
          <NavBarItem label="Films" />
          <NavBarItem label="New & Popular" />
          <NavBarItem label="My List" />
          <NavBarItem label="Browse by languages" />
        </div>
        <div className="relative flex flex-row items-center gap-2 ml-8 cursor-pointer lg:hidden">
          <DropDownMenu />
        </div>
        <div className="flex flex-row items-center ml-auto gap-7">
          <div className="text-gray-200 transition cursor-pointer hover:text-gray-400">
            <BsSearch />
          </div>
          <div className="text-gray-200 transition cursor-pointer hover:text-gray-400">
            <BsBell />
          </div>
          <div className="relative flex flex-row items-center gap-2 cursor-pointer">
            <div className="w-6 h-6 overflow-hidden rounded-md lg:w-10 lg:h-10">
              <img src={profile?.profileImg} alt="" />
            </div>
            <AccountMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
