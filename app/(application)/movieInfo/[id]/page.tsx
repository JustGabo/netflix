
import MobileMovieInfo from "@/components/MovieInfoMobile";

interface InfoMobileProps {
  params: {
    id: string;
  };
}

const InfoMobile = ({ params }: InfoMobileProps) => {
  return (
    <div className="">
      <MobileMovieInfo id={params.id} />
    </div>
  );
};

export default InfoMobile;
