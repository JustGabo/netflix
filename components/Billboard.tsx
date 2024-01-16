import { supabase } from "@/db/supabase";
import { InfoIcon, PlusCircleIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import GoToMovieFromModal from "./GoToMovieFromModal";
import BilboardMenuMovile from "./BilboardMenuMovile";

const Billboard = async () => {
  const { data, error } = await supabase.from("movies").select("*");

  let randomMovie = data![Math.floor(Math.random() * data!.length)];
  // if (error) {
  //   randomUrl =
  //     "https://elzylcnbaomumijxskps.supabase.co/storage/v1/object/public/movies/deadpool.mp4?t=2024-01-12T01%3A59%3A52.802Z";
  // }

  return (
    <div className="relative h-[70vh] md:h-[56.25vw]">
      <BilboardMenuMovile randomMovie={randomMovie} />
      <video
        className="w-full hidden md:relative h-[56.25vw] object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        src={randomMovie.url}
      ></video>

      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16 ">
        <h1 className="text-white hidden md:relative text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {randomMovie.name}
        </h1>
        <p className=" text-white hidden md:relative text-[8px] md:text-base font-light mt-3  w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {randomMovie.description}
        </p>
        <div className=" flex-row hidden md:flex items-center gap-3 mt-3 overflow-x-hidden md:mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex flex-row items-center w-auto px-2 py-1 text-xs font-semibold text-white transition bg-white rounded-md bg-opacity-30 md:py-2 md:px-4 lg:text-lg hover:opacity-20">
                <InfoIcon className="mr-1 text-white" />
                More info
              </button>
            </DialogTrigger>
            <DialogContent className="w-[900px] bg-zinc-900 p-0 border-none rounded-none h-80">
              <div className="flex flex-col bg-red-50">
                <div className="relative w-full h-72">
                  <video
                    className="object-cover h-full brightness-[50%]"
                    autoPlay
                    muted
                    loop
                    src={randomMovie.url}
                  ></video>
                  <div className="absolute bottom-[10%] left-10">
                    <p className="h-full mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                      {randomMovie.name}
                    </p>
                    <div className="flex flex-row items-center gap-3">
                      <GoToMovieFromModal id={randomMovie.id} />
                      <button className="transition duration-150 hover:opacity-50">
                        <PlusCircleIcon className="w-8 h-8 font-light text-white" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-3 text-white bg-zinc-900">
                  <span className="text-xs font-semibold text-green-300">
                    New
                  </span>
                  <span className="text-xs">{randomMovie.duration}</span>
                  <span className="text-xs">Si-fi</span>
                  <p className="text-sm">{randomMovie.description}</p>
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
