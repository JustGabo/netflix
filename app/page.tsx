import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import NavBar from "@/components/NavBar";
import { useProfilesContext } from "@/context/ProfilesContext";
import { supabase } from "@/db/supabase";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default async function Home() {
  return (
    <h1 className="">
      {/* <InfoModal/> */}
      <NavBar />
      <Billboard />
      <div className="pb-40">
        <MovieList />
      </div>
    </h1>
  );
}
