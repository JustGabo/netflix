// "use client";
import GoBackFromMovie from "@/components/GoBackFromMovie";
// import { supabase } from "@/db/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface WatchPageProps {
  params: {
    id: string;
  };
}

const WatchPage = async ({ params }: WatchPageProps) => {
  const supabase = createClientComponentClient();

  const { data } = await supabase
    .from("movies")
    .select("*")
    .eq("id", params.id)
    .single();

  return (
    <div className="w-screen h-screen bg-black">
      <nav className="fixed z-10 flex flex-row items-center w-full lg:gap-8 gap-2 p-4 bg-black bg-opacity-70">
        <GoBackFromMovie />
        <p className="text-xl font-bold text-white md:text3xl">
          <span className="font-light text-white">Watching: </span>
          {data?.name}
        </p>
      </nav>
      <video
        src={data.url}
        className="w-full h-full "
        autoPlay
        controls
      ></video>
    </div>
  );
};

export default WatchPage;
