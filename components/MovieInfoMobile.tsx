"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import MobilePlayButton from "@/components/MobilePlayButtonFromInfo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsPlayFill } from "react-icons/bs";
import { useMovieUrlContext } from "@/context/MovieContext";
import { useEffect, useState } from "react";
import { Movie } from "@/types";

interface movieInfoMobileProps {
  id: string;
}

const MovieInfoMobile =  ({ id }: movieInfoMobileProps) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUrl, setName } = useMovieUrlContext();
  const [movie, setMovie]= useState<Movie | null>(null)

  const gettingData = async () =>{
    const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", id)
    .single();
    if(data){
      setMovie(data)
    }else{
      console.log(error)
    }
  }

  useEffect(()=>{
    gettingData()
  },[])

  return (
    <main className="flex flex-col gap-2">
      <section className="relative w-full">
        <div className="absolute flex items-center justify-center w-full h-full bg-zinc-900/60 ">
        <div
          onClick={() => {
            setUrl(movie?.url!);
            setName(movie?.name!);
            router.push(`/movieInfo/${movie?.id}`);
          }}
          className={`cursor-pointer ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          } w-12 h-12 bg-zinc-900/80 lg:hidden border border-white md:border-none md:bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300`}
        >
          <BsPlayFill className="w-6 h-6 text-white md:text-black" />
        </div>
        </div>
        <Image
          width={500}
          height={500}
          src={movie?.posterUrl!}
          alt="moviePoster"
          className="object-cover"
        />
      </section>

      <section className="flex flex-col gap-3 p-2">
        <div>
          <span className="text-sm font-semibold text-green-400">New</span>
          <h2 className="text-xl font-semibold text-white">{movie?.name}</h2>
        </div>
        <article className="flex flex-col gap-3">
          <MobilePlayButton id={movie?.id!} />
          {/* <MobileFavoriteButton movie={data}/> */}
        </article>
        <p className="mt-2 text-sm text-white">{movie?.description}</p>
      </section>
    </main>
  );
};

export default MovieInfoMobile;
