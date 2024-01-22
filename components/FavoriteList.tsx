"use client";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { LikeMovie } from "@/types";
import useProfileStore from "@/stores/profile";
import Animation from "@/components/pulsates/MoviesAnimationLoading";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const FavoriteList = () => {
  const [movies, setMovies] = useState<LikeMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient()

  const { selectedProfile } = useProfileStore((set) => set);

  const getMovies = async () => {
    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("favoriteOwner", selectedProfile?.id);


    if (data) {
      setMovies(data);
      setLoading(false);
    } else if (data == null) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="px-4 mt-5 space-y-8 md:mt-10 md:px-12">
      <div>
        <h2 className="mb-5 text-2xl font-semibold text-white md:mb-10 md:text-xl lg:text-3xl">
          Favorite Movies
        </h2>
        {loading ? (
          <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
            <Animation />
            <Animation />
            <Animation />
            <Animation />
          </div>
        ) : (
          <div>
            {movies.length > 0 ? (
              <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
                {movies?.map((movie) => {
                  return (
                    <MovieCard key={movie.id} movie={movie} liked={true} likedMovie={movie} />
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center w-full mt-16">
                <h2 className="text-sm text-gray-500 ">
                  There is no favorite movies
                </h2>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteList;
