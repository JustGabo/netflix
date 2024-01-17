"use client";
import { supabase } from "@/db/supabase";
import { Movie } from "@/types";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchComponent = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([])
  const [input, setInput] = useState('')
  const router = useRouter()

  const getMovies = async () => {
    const { data, error } = await supabase.from("movies").select("*");
    if (data) {
      console.log(data);
      setMovies(data);
      setFilteredMovies(data)
    } else {
      console.log(error);
    }
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
        setFilteredMovies(movies)
      return;
    }

    const filter = movies.filter((movie: Movie) => {
      return movie.name.toLowerCase().includes(value.toLowerCase());
    });

    setFilteredMovies(filter);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <section className="md:p-8 p-4 pt-8  flex flex-col gap-10">
        <article className="flex items-center gap-3">
        <ChevronLeft onClick={()=> router.push('/')} className="text-white w-7 h-7 cursor-pointer"/>
      <form className="flex-1" action="">
        <input
        onChange={(e)=>{
            search(e)
            setInput(e.target.value)
        }}
          className="w-full p-2 bg-zinc-800 text-white outline-none rounded-md placeholder:text-sm"
          type="text"
          placeholder="Search for your movie"
        />
      </form>
        </article>
      {
        filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2  gap-2 md:grid-cols-4">
            {filteredMovies.map((movie) => {
              return <MovieCard movie={movie} key={movie.id} />;
            })}
          </div>
        ) : <div className="text-white">
            <p className="text-sm font-light">No movies found with the name: <span className="font-bold">{input}</span></p>
        </div>
      }
    </section>
  );
};

export default SearchComponent;
