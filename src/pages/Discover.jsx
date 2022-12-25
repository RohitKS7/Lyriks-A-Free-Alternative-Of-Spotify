import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetSongsByCountryQuery } from "../redux/services/musicAPI";

const Discover = () => {
  // NOTE "useSelector" let us select a specific state from its state storage which is currently 'playerSlice' and you can see it that we have created a state called "player" which we are accessing now
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // NOTE "useDispatch" let use make changes into the selected redux state
  const dispatch = useDispatch();

  const { data, isFetching, error } = useGetSongsByCountryQuery();

  if (isFetching) return <Loader title="Loading songs..." />;

  const topSongsList = data?.result?.tracks;

  console.log(topSongsList);

  if (error) return <Error />;

  const genreTitle = "Pop";

  return (
    <div className="flex flex-col ">
      <div className="flex w-full justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={() => {}}
          value=""
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option value={genre.value} key={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
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
