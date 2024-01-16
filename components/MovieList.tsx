"use client"
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { supabase } from "@/db/supabase";
import { Movie } from "@/types";

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const getMovies = async () => {
    const { data, error } = await supabase.from("movies").select("*");
    if (data) {
      setMovies(data);
    }
  };

  useEffect(()=>{
    getMovies()
  },[])

  return (
    <div className="px-4 space-y-8 mt-5 md:mt-10 md:px-12">
      <div>
        <h2 className="font-semibold text-white mb-5 md:mb-10 text-2xl md:text-xl lg:text-3xl">
          Trending Movies
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {movies?.map((movie) => {
            return <MovieCard key={movie.id} movie={movie}/>;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
