import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { addSongToFavourites, checkSongInFavourites, removeSongFromFavourites } from '../utils/favouriteFunctions';
import { useEffect, useState } from 'react';

export default function FavoriteButton(songInfo: {
  songID: string;
  songName: string;
  songArtist: string;
  songImage: string;
}) {
  function changeFavourite(songName: string, artist: string, songImage: string) {
    const exists = checkSongInFavourites(songName, artist);
    if (exists) {
      removeSongFromFavourites(songName, artist);
    } else {
      addSongToFavourites(songName, artist, songImage);
    }
    setIsFavourite(checkSongInFavourites(songInfo.songName, songInfo.songArtist));
  }

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    setIsFavourite(checkSongInFavourites(songInfo.songName, songInfo.songArtist));
  }, [songInfo.songName, songInfo.songArtist]);

  return (
    <div style={{ position: 'relative' }}>
      {isFavourite ? (
        <span
          id="removeFromFavorites"
          onClick={(e) => {
            e.stopPropagation();
            changeFavourite(songInfo.songName, songInfo.songArtist, songInfo.songImage);
          }}
        >
          <AiFillStar
            className="star"
            id={`${songInfo.songName}filled`}
          />
        </span>
      ) : (
        <span
          id="addToFavorites"
          onClick={(e) => {
            e.stopPropagation();
            changeFavourite(songInfo.songName, songInfo.songArtist, songInfo.songImage);
          }}
        >
          <AiOutlineStar className="text-yellow-400" />
        </span>
      )}
    </div>
  );
}
