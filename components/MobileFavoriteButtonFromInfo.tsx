import React from "react";
import { BsHeartFill } from "react-icons/bs";

const mobileFavoriteButton = () => {
  return (
    <button className="bg-zinc-800 gap-2 p-2 rounded-md font-semibold text-white flex items-center justify-center">
      <BsHeartFill />
      Add to list
    </button>
  );
};

export default mobileFavoriteButton;
