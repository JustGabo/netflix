"use client";
import { usingMovieUrlContext } from "@/context/MovieContext";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const router = useRouter();
  const { url, name } = usingMovieUrlContext();

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <ChevronLeft
          onClick={() => router.push("/")}
          className="text-white cursor-pointer"
          size={40}
        />
        <p className="text-white text-xl md:text3xl font-bold">
          <span className="font-light text-white">Watching: </span>
          {name}
        </p>
      </nav>
      <video src={url} className="h-full w-full " autoPlay controls></video>
    </div>
  );
};

export default page;
