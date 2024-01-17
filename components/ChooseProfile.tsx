import React from "react";
import ProfilesList from "./ProfilesList";


const ChooseProfile = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col">
        <h1 className="text-3xl text-center text-white md:text-6xl">
          Who is whatching?
        </h1>
        
        <ProfilesList />
      </div>
    </div>
  );
};

export default ChooseProfile;
