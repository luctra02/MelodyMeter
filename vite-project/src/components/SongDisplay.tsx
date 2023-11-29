// Importing necessary dependencies from React and React Router
import '../styles/songDisplay.css';
import { useEffect, useState } from 'react';
import { fetchTracks } from '../script';
import StatView from './Statview';
import { useLocation } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

// Functional component for displaying details of a song
function SongDisplay() {
  // State to manage the song details
  const [songName, setSongName] = useState('');
  const [songImage, setSongImage] = useState('');

  // Using the 'useLocation' hook from React Router to get the location state
  const location = useLocation();
  // Extracting relevant information from the location state
  const songId = location.state.albumId ? location.state.albumId : location.state.playlistId;
  const song = location.state.songName;
  const songImg = location.state.songImage;
  const artist = location.state.artist;

  // useEffect hook to fetch song details when the component mounts or relevant state changes
  useEffect(() => {
    const getStats = async () => {
      const sessionKey = sessionStorage.getItem('accesstoken');

      // Fetching track information based on the presence of songId
      if (songId) {
        const trackInfo = await fetchTracks(sessionKey, songId);
        setSongName(trackInfo.name);
        setSongImage(trackInfo.album.images[0].url);
      } else {
        // If there is no songId, using the provided songName and songImage
        setSongName(song);
        setSongImage(songImg);
      }
    };
    getStats();
  }, [songId, songImg, song]);

  // Rendering the component
  return (
    <div>
      {/* Displaying statistics view */}
      <StatView />

      <div className="grey-box">
        {/* Displaying individual song details */}
        <div className="singleSongDisplay">
          {/* Displaying the song image */}
          <img src={songImage} className="Song-Image"></img>
          {/* Displaying the song name */}
          <h1 className="songArtist">{songName}</h1>
          {/* Displaying the artist name */}
          <h1 className="songArtist">{artist}</h1>
          {/* Rendering the FavoriteButton component with relevant song information */}
          <FavoriteButton
            songID={songId}
            songName={songName}
            songArtist={artist}
            songImage={songImg}
          />
        </div>
      </div>
    </div>
  );
}

// Exporting the component as the default export
export default SongDisplay;
