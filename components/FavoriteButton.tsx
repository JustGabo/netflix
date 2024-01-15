"use client"
import { Movie } from "@/types";
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import React from "react";
import { BsHeartFill } from "react-icons/bs";

interface FavoriteButtonProps {
  movie: Movie;
}

const FavoriteButton = ({ movie }: FavoriteButtonProps) => {

    const supabase = createClientComponentClient()

    const handleLike = async()=>{
        const {data, error} = await supabase.from('favorites').insert({
            // favoriteOwner:,
            url: movie.url,
            posterUrl: movie.posterUrl,
            description: movie.description,
            duration: movie.duration,
            name: movie.name,
            genre: movie.genre,
        })
        if(error){
            console.log(error)
        }else{
            console.log(data)
        }
    }

  return (
    <div onClick={handleLike} className="flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer">
      <BsHeartFill className="w-4 h-4 text-black" />
    </div>
  );
};

export default FavoriteButton;
