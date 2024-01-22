import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import MobileFavoriteButton from '@/components/MobileFavoriteButtonFromInfo'
import MobilePlayButton from '@/components/MobilePlayButtonFromInfo'

interface movieInfoMobileProps {
  id: string;
}

const movieInfoMobile = async ({ id }: movieInfoMobileProps) => {
  const supabase = createClientComponentClient();
  // const [movie, setMovie] = useState<Movie | null>(null);


  

  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", id)
    .single();


  return (
    <main className="flex flex-col gap-2">
      <section className="w-full">
        <img src={data?.posterUrl} alt="moviePoster" className="object-cover" />
      </section>
      
      <section className="flex flex-col gap-3 p-2">
        <div>
          <span className="text-sm font-semibold text-green-400">New</span>
        <h2 className="text-xl font-semibold text-white">{data?.name}</h2>
        </div>
        <article className="flex flex-col gap-3">
           <MobilePlayButton id={data?.id}/>
          <MobileFavoriteButton movie={data}/>
        </article>
        <p className="mt-2 text-sm text-white">{data?.description}</p>
      </section>
    </main>
  );
};

export default movieInfoMobile;
