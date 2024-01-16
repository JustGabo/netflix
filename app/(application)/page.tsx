import Billboard from "@/components/Billboard";
import FavoriteList from "@/components/FavoriteList";
import MovieList from "@/components/MovieList";
import NavBar from "@/components/NavBar";

export default async function Home() {
  return (
    <main className="">
      {/* <InfoModal/> */}
      <NavBar />
      <Billboard />
      <div className="">
        <MovieList />
        <FavoriteList/>
      </div>
    </main>
  );
}
