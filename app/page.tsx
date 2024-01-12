import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import NavBar from "@/components/NavBar";

export default function Home() {


  return (
    <h1 className="">
      {/* <InfoModal/> */}
      <NavBar />
      <Billboard/>
      <div className="pb-40">
        <MovieList/>
      </div>
    </h1>
  );
}
