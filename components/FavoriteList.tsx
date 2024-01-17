"use client"
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { supabase } from "@/db/supabase";
import { Movie } from "@/types";
import useUserStore from "@/stores/user";
import useProfileStore from "@/stores/profile";

const FavoriteList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const {selectedProfile} = useProfileStore((set)=> set)

  const getMovies = async () => {
    const { data, error } = await supabase.from("favorites").select("*").eq("favoriteOwner",selectedProfile?.id);
    if (data) {
      setMovies(data);
    }
  };

  useEffect(()=>{
    getMovies()
  },[])

  return (
    <div className="px-4 mt-5 space-y-8 md:mt-10 md:px-12">
      <div>
        <h2 className="mb-5 text-2xl font-semibold text-white md:mb-10 md:text-xl lg:text-3xl">
          Favorite Movies
        </h2>
        {movies.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
                  {movies?.map((movie) => {
                    return <MovieCard key={movie.id} movie={movie}/>;
                  })}
                </div>
        ) : <div >
          <h2 className="text-sm text-gray-500 ">There is no favorite movies</h2>
        </div> }
      </div>
    </div>
  );
};

export default FavoriteList;
