"use client";
import React, { useEffect, useState } from "react";
import NavBarItem from "./NavBarItem";
import DropDownMenu from "./DropDownMenu";
import { BsSearch, BsBell } from "react-icons/bs";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Image from "next/image";
const TOP_OFFSET = 66;

const NavBarRightSide = dynamic(() => import("./NavBarRightSide"), {
  ssr: false, // this means that the component will be ALWAYS rendered on the client
});

const NavBar = () => {
  const [showBackground, SetShowBackground] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        SetShowBackground(true);
      } else {
        SetShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed z-40 w-full">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center  transition-none duration-500 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        <Image width={100} height={100} src="/images/logo.png" className="h-6 lg:h-7" alt="logo" />
        <div className="flex-row hidden ml-8 text-xs  gap-7 lg:flex">
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
          <div onClick={()=> router.push('/search')} className="text-gray-200 transition cursor-pointer hover:text-gray-400">
            <BsSearch />
          </div>
          <div className="text-gray-200 transition cursor-pointer hover:text-gray-400">
            <BsBell />
          </div>

          <NavBarRightSide />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
