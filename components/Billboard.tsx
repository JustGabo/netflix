"use client";
import { supabase } from "@/db/supabase";
import { InfoIcon, PlayIcon, PlusCircleIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { BsPlayFill } from "react-icons/bs";
import { Movies } from "@/types/index";
import { useRouter } from "next/navigation";

const Billboard = () => {
  const router = useRouter()
  const [active, setActive] = useState(true);
  const [movies, setMovies] = useState<Movies[]>([]);
  const [index, setIndex] = useState<number>()
  const randomMovie = () => setIndex(Math.floor(Math.random()*4))
  const getMovies = async () => {
    const { data, error } = await supabase.from("movies").select("*");
    if (data) {
      setMovies(data!);
    } else {

      console.log(error);
    }
  };

  const redirecting = async ()=>{
    const {data:{user}} = await supabase.auth.getUser()
    if(!user){
      router.push('/auth')
    }
  }

  useEffect(() => {
    getMovies()
    randomMovie()
    redirecting()
  }, []);

  useEffect(()=>{
    console.log(movies[index!])
  },[index])

  return (
    <div className="relative h-[56.25vw]">
      {active && (
        <video
          className="w-full h-[56.25vw] object-cover brightness-[60%]"
          autoPlay
          muted
          loop
          src="https://elzylcnbaomumijxskps.supabase.co/storage/v1/object/public/movies/deadpool.mp4?t=2024-01-12T01%3A59%3A52.802Z"
        ></video>
      )}
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16 ">
        <p className="text-white text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          Testing movie title
        </p>
        <p className=" text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
          perferendis expedita accusantium sapiente recusandae. Itaque ipsam
          nulla quisquam sapiente architecto officiis in dicta et aliquam,
          voluptatibus voluptates quam nesciunt deleniti.
        </p>
        <div className="flex flex-row overflow-x-hidden items-center gap-3 mt-3 md:mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex flex-row items-center w-auto px-2 py-1 text-xs font-semibold text-white transition bg-white rounded-md bg-opacity-30 md:py-2 md:px-4 lg:text-lg hover:opacity-20">
                <InfoIcon className="mr-1 text-white" />
                More info
              </button>
            </DialogTrigger>
            <DialogContent className="w-[900px] bg-zinc-900 p-0 border-none rounded-none h-80">
              <div className="bg-red-50 flex flex-col">
                <div className="h-72 w-full relative">
                  <video
                    className="object-cover brightness-[50%]"
                    autoPlay
                    muted
                    loop
                    src="https://elzylcnbaomumijxskps.supabase.co/storage/v1/object/public/movies/deadpool.mp4?t=2024-01-12T01%3A59%3A52.802Z"
                  ></video>
                  <div className="absolute bottom-[10%] left-10">
                    <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-4">
                      title
                    </p>
                    <div className="flex flex-row gap-3 items-center">
                      <button className="bg-white w-20 hover:opacity-50 transition duration-150  flex font-semibold items-center rounded-md p-2 text-black">
                        <BsPlayFill className="w-5 h-5" />
                        Play
                      </button>
                      <button className="hover:opacity-50 transition duration-150">
                        <PlusCircleIcon className="text-white w-8 h-8 font-light" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-900 p-3 flex flex-col gap-2 text-white">
                  <span className="text-xs font-semibold text-green-300">
                    New
                  </span>
                  <span className="text-xs">15 mins</span>
                  <span className="text-xs">Si-fi</span>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eaque aspernatur, provident harum consequuntur voluptate,
                    iste repellat debitis sequi perferendis voluptatibus animi
                    enim porro esse numquam fugiat rerum temporibus! Expedita,
                    ipsam!
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
