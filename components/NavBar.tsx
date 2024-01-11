"use client"
import React, { useEffect, useState } from "react";
import NavBarItem from "./NavBarItem";
import DropDownMenu from "./DropDownMenu";
import { BsSearch, BsBell } from "react-icons/bs";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66


const NavBar = () => {

  const [showBackground, SetShowBackground] = useState(false)

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
    <nav className="w-full fixed z-40">
      <div className={`px-4 md:px-16 py-6 flex flex-row items-center  transition-none duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
        <img src="/images/logo.png" className="h-6 lg:h-7" alt="logo" />
        <div className="flex-row ml-8 text-xs gap-7 hidden lg:flex">
          <NavBarItem label="Home" />
          <NavBarItem label="Series" />
          <NavBarItem label="Films" />
          <NavBarItem label="New & Popular" />
          <NavBarItem label="My List" />
          <NavBarItem label="Browse by languages" />
        </div>
        <div className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <DropDownMenu />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-400 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-400 cursor-pointer transition">
            <BsBell />
          </div>
          <div className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/profile-red.png" alt="" />
            </div>
            <AccountMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
