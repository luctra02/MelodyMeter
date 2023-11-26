import '../styles/songDisplay.css';
import { useEffect, useState } from 'react';
import { fetchTracks } from '../script';
import StatView from './Statview';
import { useLocation } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

function SongDisplay() {
  const [songName, setSongName] = useState('');
  const [songImage, setSongImage] = useState('');

  const location = useLocation();
  const songId = location.state.albumId ? location.state.albumId : location.state.playlistId;
  const song = location.state.songName;
  const songImg = location.state.songImage;
  const artist = location.state.artist;

  useEffect(() => {
    const getStats = async () => {
      const sessionKey = sessionStorage.getItem('accesstoken');

      // Update the document title using the browser API;
      if (songId) {
        const trackInfo = await fetchTracks(sessionKey, songId);
        setSongName(trackInfo.name);
        setSongImage(trackInfo.album.images[0].url);
      } else {
        setSongName(song);
        setSongImage(songImg);
      }
    };
    getStats();
  }, [songId, songImg, song]);

  return (
    <div>
      <StatView />

      <div className="grey-box">
        
        <div className="singleSongDisplay">
          
          <img src={songImage} className="Song-Image"></img>
          <h1 className="songArtist">{songName}</h1>
          <h1 className="songArtist">{artist}</h1>
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

export default SongDisplay;
