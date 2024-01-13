"use client";
import { ChevronDown, PlayCircle, PlayCircleIcon } from "lucide-react";
import React, { useState } from "react";
import {
  BsPlayFill,
} from "react-icons/bs";

import {Movie} from '@/types/index'
import { useRouter } from "next/navigation";
import { useMovieUrlContext } from "@/context/MovieContext";

interface MovieCardProps{
  movie: Movie
}


const MovieCard = ({movie}: MovieCardProps) => {

  const router = useRouter()
  const {setUrl,setName} = useMovieUrlContext()
  const [loading, setLoading] = useState(false)


  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
        onClick={() => {}}
        src={movie.posterUrl}
        alt="Movie"
        draggable={false}
        className="
      cursor-pointer
      object-cover
      transition
      duration
      shadow-xl
      rounded-md
      group-hover:opacity-90
      sm:group-hover:opacity-0
      delay-300
      w-full
      h-[12vw]
    "
      />
      <div
        className="
      opacity-0
      absolute
      top-0
      transition
      duration-200
      z-10
      invisible
      sm:visible
      delay-300
      w-full
      scale-0
      group-hover:scale-110
      group-hover:-translate-y-[6vw]
      group-hover:translate-x-[2vw]
      group-hover:opacity-100
    "
      >
        <img
          onClick={() => {}}
          src={movie.posterUrl}
          alt="Movie"
          draggable={false}
          className="
        cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        rounded-t-md
        w-full
        h-[12vw]
      "
        />
        <div
          className="absolute z-10 w-full p-2 transition shadow-md bg-zinc-800 lg:p-4 rounded-b-md"
        >
          <div className="flex flex-row items-center gap-3">
            <div
              onClick={()=>{
                setUrl(movie.url)
                setName(movie.name)
                router.push(`/watch/${movie.id}`)
              }}
              className={`cursor-pointer ${loading? 'cursor-not-allowed' : 'cursor-pointer'} w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300`}
            >
              <BsPlayFill className="w-6 h-6 text-black" />
            </div>
            {/* <FavoriteButton movieId={data.id} /> */}
            <div
              onClick={() => {}}
              className="flex items-center justify-center w-6 h-6 ml-auto transition border-2 border-white rounded-full cursor-pointer group/item lg:w-10 lg:h-10 hover:border-neutral-300"
            >
              <ChevronDown className="w-4 text-white group-hover/item:text-neutral-300 lg:w-6" />
            </div>
          </div>
          <p className="mt-4 font-semibold text-green-400">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex flex-row items-center gap-2 mt-4">
            <p className="text-white text-[10px] lg:text-xs">Duration: {movie.duration}</p>
          </div>
          <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-xs">
            {movie.genre}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
