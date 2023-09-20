import '../styles/songDisplay.css';
import { useEffect, useState } from 'react';
import { fetchTracks } from '../script';
import StatView from './Statview';
import { useLocation } from 'react-router-dom';


function SongDisplay() {
  const [songName, setSongName] = useState('');
  const [songImage, setSongImage] = useState('');

  const location = useLocation();
  const songId = location.state.albumId ? location.state.albumId : location.state.playlistId;
  const song = location.state.songName;
  const songImg = location.state.songImage;

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
        </div>
      </div>
    </div>
  );
}

export default SongDisplay;
