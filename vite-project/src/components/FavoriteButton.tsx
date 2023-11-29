// Importing necessary dependencies from React and custom utility functions
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import {
  addSongToFavourites,
  checkSongInFavourites,
  removeSongFromFavourites,
} from '../utils/favouriteFunctions';
import { useEffect, useState } from 'react';

// Functional component for rendering a favorite button for a song
export default function FavoriteButton(songInfo: {
  songID: string;
  songName: string;
  songArtist: string;
  songImage: string;
}) {
  // Function to toggle the favorite status of a song
  function changeFavourite(songName: string, artist: string, songImage: string) {
    // Checking if the song is already in favorites
    const exists = checkSongInFavourites(songName, artist);

    // If the song is in favorites, remove it; otherwise, add it
    if (exists) {
      removeSongFromFavourites(songName, artist);
    } else {
      addSongToFavourites(songName, artist, songImage);
    }

    // Update the favorite state based on the current status
    setIsFavourite(checkSongInFavourites(songInfo.songName, songInfo.songArtist));
  }

  // State to track whether the song is a favorite or not
  const [isFavourite, setIsFavourite] = useState(false);

  // useEffect hook to initialize the favorite state based on the current status
  useEffect(() => {
    setIsFavourite(checkSongInFavourites(songInfo.songName, songInfo.songArtist));
  }, [songInfo.songName, songInfo.songArtist]);

  // Rendering the component
  return (
    <div style={{ position: 'relative' }}>
      {isFavourite ? (
        // Render a filled star if the song is in favorites
        <span
          id="removeFromFavorites"
          onClick={(e) => {
            e.stopPropagation();
            changeFavourite(songInfo.songName, songInfo.songArtist, songInfo.songImage);
          }}
        >
          <AiFillStar className="star star-filled" id={`${songInfo.songName}filled`} />
        </span>
      ) : (
        // Render an outlined star if the song is not in favorites
        <span
          id="addToFavorites"
          onClick={(e) => {
            e.stopPropagation();
            changeFavourite(songInfo.songName, songInfo.songArtist, songInfo.songImage);
          }}
        >
          <AiOutlineStar className="text-yellow-400 star" />
        </span>
      )}
    </div>
  );
}
