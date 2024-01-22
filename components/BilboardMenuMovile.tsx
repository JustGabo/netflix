"use client";
import { Movie } from "@/types";
import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BsPlayFill } from "react-icons/bs";

interface BilboardMenuMovileProps {
  randomMovie: Movie;
}

const BilboardMenuMovile: React.FC<BilboardMenuMovileProps> = ({
  randomMovie,
}) => {
  const router = useRouter();

  return (
    <section className="pt-20 px-5    relative md:hidden h-full">
      <article className="h-full relative">
        <Image width={500}  height={200}
          className="object-cover  rounded-xl h-full"
          src={randomMovie.posterUrl}
          alt=""
        />
        <div className=" bg-gradient-to-t rounded-xl from-gray-800 to-neutral-50/20 absolute w-full h-full top-0 left-0" />
        <section className="absolute flex flex-col gap-4 p-2 pb-5 left-0 bottom-0 right-0  w-[90%]  m-auto">
          <h1 className="text-2xl text-center truncate font-semibold uppercase text-white">
            {randomMovie.name}
          </h1>
          <article className="flex items-center  h-[50px] gap-3">
            <button
              onClick={() => router.push(`/watch/${randomMovie.id}`)}
              className="bg-slate-200 text-black h-full flex items-center gap-1 justify-center font-medium p-2 flex-1 rounded-md"
            >
              <BsPlayFill className="w-6 h-6" />
              Play
            </button>
            <button className="bg-zinc-900/40 h-full font-medium flex items-center justify-center gap-1 text-white p-2 flex-1 rounded-md">
              <PlusCircleIcon className="w-7 h-7 font-light text-white" />
              Add to list
            </button>
          </article>
        </section>
      </article>
    </section>
  );
};

export default BilboardMenuMovile;
