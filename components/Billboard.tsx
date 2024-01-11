"use client";
import { supabase } from "@/db/supabase";
import { InfoIcon } from "lucide-react";
import React, { useEffect } from "react";

const Billboard = () => {
  const { data } = supabase.storage.from("movies").getPublicUrl("coraline.mp4");

  useEffect(() => {
    console.log(data.publicUrl);
  }, [data]);

  return (
    <div className="relative h-[56.25vw]">
      {data.publicUrl && (
        <video
          className="w-full h-[56.25vw] object-cover brightness-[60%]"
          autoPlay
          muted
          loop
          src={data.publicUrl}
        ></video>
      )}
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16 ">
        <p className="text-white text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          Testing movie title
        </p>
        <p className=" text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
          perferendis expedita accusantium sapiente recusandae. Itaque ipsam
          nulla quisquam sapiente architecto officiis in dicta et aliquam,
          voluptatibus voluptates quam nesciunt deleniti.
        </p>
        <div className="flex flex-row items-center gap-3 mt-3 md:mt-4">
          <button className="flex flex-row items-center w-auto px-2 py-1 text-xs font-semibold text-white transition bg-white rounded-md bg-opacity-30 md:py-2 md:px-4 lg:text-lg hover:opacity-20">
            <InfoIcon className="mr-1 text-white" />
            More info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
