import { useState } from 'react';
import '../styles/statview.css';
import fetchAudioFeatures, { fetchSongInfo } from '../utils/script';
import { useLocation } from 'react-router-dom';

function StatView() {
  interface SearchResponse {
    tracks: {
      items: Array<{ id: string }>;
    };
  }

  const [danceStat, setDanceStat] = useState(0);
  const [energyStat, setEnergyStat] = useState(0);
  const [loudStat, setLoudStat] = useState(0);
  const [positiveStat, setPositiveStat] = useState(0);
  const location = useLocation();
  const songId = location.state.albumId ? location.state.albumId : location.state.playlistId;
  const song = location.state.songName;

  const getStats = async () => {
    const sessionKey = sessionStorage.getItem('accesstoken');
    if (!songId) {
      const searchName: SearchResponse = await fetchSongInfo(sessionKey, song);
      const songInfoArray = Object.values(searchName.tracks.items);
      const songId = songInfoArray[0].id;
      const AudioFeatures = await fetchAudioFeatures(sessionKey, songId);
      setDanceStat(Math.floor(AudioFeatures.danceability * 100));
      setEnergyStat(Math.floor(AudioFeatures.energy * 100));
      setLoudStat(Math.round(AudioFeatures.loudness));
      setPositiveStat(Math.floor(AudioFeatures.valence * 100));
    } else {
      const AudioFeatures = await fetchAudioFeatures(sessionKey, songId);
      setDanceStat(Math.floor(AudioFeatures.danceability * 100));
      setEnergyStat(Math.floor(AudioFeatures.energy * 100));
      setLoudStat(Math.round(AudioFeatures.loudness));
      setPositiveStat(Math.floor(AudioFeatures.valence * 100));
    }
  };

  getStats();

  return (
    <div className="statview">
      <ul>
        <li>
          <p>Stats</p>
        </li>
        <li>
          <p>Danceability</p>
          <p>{danceStat}%</p>
        </li>
        <li>
          <p>Energy</p>
          <p>{energyStat}%</p>
        </li>
        <li>
          <p>Loudness</p>
          <p>{loudStat}dB</p>
        </li>
        <li>
          <p>Positivity</p>
          <p>{positiveStat}%</p>
        </li>
      </ul>
    </div>
  );
}

export default StatView;
