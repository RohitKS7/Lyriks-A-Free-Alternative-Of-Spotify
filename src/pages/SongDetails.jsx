import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetRelatedSongsQuery,
} from "../redux/services/musicAPI";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetRelatedSongsQuery(songid);

  const { data: songsData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery(songid);

  if (isFetchingSongDetails && isFetchingRelatedSongs)
    return <Loader title="Searching song details" />;

  if (error) return <Error />;

  const songData = songsData?.result;
  const relatedSongsData = data?.result?.tracks;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

        <div className="mt-5">
          {songData?.lyrics ? (
            songData?.lyrics.map((line, i) => (
              <p key={i} className="text-gray-400 text-base my-1">
                {" "}
                {line}{" "}
              </p>
            ))
          ) : (
            <p>Sorry, no lyrics found!</p>
          )}
        </div>
      </div>

      <RelatedSongs
        data={relatedSongsData}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
