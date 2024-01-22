"use client";
import useProfileStore from "@/stores/profile";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { LikeMovie, Movie } from "@/types/index";

interface FavoriteButtonProps {
  movie: Movie;
  likedMovie?: LikeMovie;
  liked?: boolean;
}

const FavoriteButton = ({ movie, liked, likedMovie }: FavoriteButtonProps) => {
  const supabase = createClientComponentClient();
  const [isLiked, setIsLiked] = useState(liked);
  const router = useRouter()

  const Icon = isLiked ? BsHeartFill : FaRegHeart;

  const { selectedProfile } = useProfileStore((set) => set);


  const handleLike = async () => {
    if (isLiked) {
      const { error, data } = await supabase
        .from("favorites")
        .delete()
        .eq("movieId", likedMovie?.movieId)
        .eq("favoriteOwner", selectedProfile?.id)
        .single();
        

      if (error) {
        console.log(error);
      } else {
        setIsLiked(false);
        router.refresh()
      }
    } else {
      const { data, error } = await supabase.from("favorites").insert({
        favoriteOwner: selectedProfile?.id,
        url: movie.url,
        posterUrl: movie.posterUrl,
        description: movie.description,
        duration: movie.duration,
        name: movie.name,
        genre: movie.genre,
        movieId: movie.id,
      });
      if (error) {
        console.log(error);
      } else {
        setIsLiked(true);
        router.refresh()
      }
    }
  };



  return (
    <div
      onClick={handleLike}
      className="flex items-center justify-center w-full h-10 text-white transition rounded-md cursor-pointer bg-zinc-800 hover:bg-zinc/80"
    >
      <Icon />
      {isLiked ? <span className="ml-2">Remove from favorites</span> : <span className="ml-2">Add to favorites</span>}
    </div>
  );
};

export default FavoriteButton;
