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
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          title
        </p>
        <div className="grid grid-cols-4 gap-2">
          {movies?.map((movie) => {
            return <MovieCard key={movie.id} movie={movie}/>;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
