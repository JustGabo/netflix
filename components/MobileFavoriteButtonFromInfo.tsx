"use client"
import React, { useState } from "react";
import { BsHeartFill } from "react-icons/bs";

interface Props {
  liked?: boolean
}

const mobileFavoriteButton = ({liked}: Props) => {
  
  const [isLiked, setIsLiked] = useState(liked? liked : false)

  return (
    <button className="bg-zinc-800 gap-2 p-2 rounded-md font-semibold text-white flex items-center justify-center">
      <BsHeartFill />
      {isLiked? "Remove from list" : 'Add to list'}
    </button>
  );
};

export default mobileFavoriteButton;
