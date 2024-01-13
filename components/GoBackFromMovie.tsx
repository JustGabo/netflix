"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const GoBackFromMovie = () => {
  const router = useRouter();

  return (
    <ChevronLeft
      onClick={() => router.push("/")}
      className="text-white cursor-pointer"
      size={40}
    />
  );
};

export default GoBackFromMovie;
