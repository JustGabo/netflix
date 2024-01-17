"use client";
import useProfileStore from "@/stores/profile";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { Movie } from "@/types/index";

interface FavoriteButtonProps {
  movie: Movie;
  liked?: boolean;
}

const FavoriteButton = ({ movie, liked }: FavoriteButtonProps) => {
  const supabase = createClientComponentClient();
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(liked? liked: false);
  const [likedMovies, setLikedMovies] = useState<Movie[] | null>();
  const [currentProfileLikedSongs, setCurrentProfileLikedSongs] = useState<
    Movie[] | null
  >(null);

  const Icon = isLiked ? BsHeartFill : FaRegHeart;

  const { selectedProfile } = useProfileStore((set) => set);

  const gettingLikedMovie = async () => {
    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("favoriteOwner", selectedProfile?.id)
      .eq("movieId", movie.id);
    if (data?.length! > 0) {
      setIsLiked(true);
    }
  };

  const handleLike = async () => {
    if (isLiked) {
      const {error, data} = await supabase
        .from("favorites")
        .delete()
        .eq("favoriteOwner", selectedProfile?.id)
        .eq("movieId", movie.id);
        if(error){
          console.log(error)
        }else{
          setIsLiked(false)
          console.log(data)
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
      }
    }
  };

  useEffect(() => {
    gettingLikedMovie();
  }, []);

  return (
    <div
      onClick={handleLike}
      className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full cursor-pointer hover:bg-white/80"
    >
      <Icon />
    </div>
  );
};

export default FavoriteButton;
