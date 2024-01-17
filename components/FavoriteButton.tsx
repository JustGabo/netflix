"use client"
import useProfileStore from "@/stores/profile";
import { Movie } from "@/types";
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import { HeartPulseIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BsHeartFill, BsHearts } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";

interface FavoriteButtonProps {
  movie: Movie;
}

const FavoriteButton = ({ movie }: FavoriteButtonProps) => {

    const supabase = createClientComponentClient()

    const {selectedProfile} = useProfileStore((set)=> set)
    const router = useRouter()

    const handleLike = async()=>{
        const {data, error} = await supabase.from('favorites').insert({
            favoriteOwner:selectedProfile?.id,
            url: movie.url,
            posterUrl: movie.posterUrl,
            description: movie.description,
            duration: movie.duration,
            name: movie.name,
            genre: movie.genre,
            movieId: movie.id
        })
        if(error){
            console.log(error)
        }else{
            console.log(data)
            router.refresh()
        }
    }

    const handleUnlike = async()=>{
      const {data,error} = await supabase.from('favorites').delete().eq('favoriteOwner', selectedProfile?.id).eq('movieId', movie.id)
      if(error){
        console.log(error)}
        else{
          console.log(data)
          router.refresh()
        }
    }

    // const isLiked = async ()=> {
    //   const {data, error} = await supabase.from('favorites').select("*").eq('favoriteOwner', selectedProfile?.id).eq('movieId', movie.id)
    //   if(data?.length == 0){
    //     return false
    //   }else if(data?.length >= 0){
    //     return true
    //   }
    // }

    // useEffect(()=>{
    //   isLiked()
    // },[])

  return (
    <div onClick={handleLike} className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full cursor-pointer hover:bg-white/80">
      {/* <BsHeartFill className="text-black " /> */}
      <FaRegHeart className="w-5 h-5"/>
    </div>
  );
};

export default FavoriteButton;
