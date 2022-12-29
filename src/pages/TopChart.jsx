import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/musicAPI";

const Discover = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongsByCountryQuery("IN");

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  const topSongsList = data?.result?.tracks?.slice(0, 50);

  return (
    <div className="flex flex-col ">
      <div className="flex w-full justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Top 100 Songs of India
        </h2>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {topSongsList?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            data={data}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
