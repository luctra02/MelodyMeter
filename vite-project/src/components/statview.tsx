import React, { useEffect, useState } from 'react';
import '../styles/statview.css';
import fetchAudioFeatures from '../script';
import { useLocation } from 'react-router-dom';

function StatView() {
  const [danceStat, setDanceStat] = useState(0);
  const [energyStat, setEnergyStat] = useState(0);
  const [loudStat, setLoudStat] = useState(0);
  const [positiveStat, setPositiveStat] = useState(0);
  const location = useLocation();
  const songId = location.state.albumId ? location.state.albumId : location.state.playlistId;

  useEffect(() => {
    const getStats = async () => {
      const sessionKey = sessionStorage.getItem("accesstoken")
      const AudioFeatures = await fetchAudioFeatures(sessionKey, songId);

      setDanceStat(Math.floor(AudioFeatures.danceability*100));
      setEnergyStat(Math.floor(AudioFeatures.energy*100));
      setLoudStat(Math.round(AudioFeatures.loudness));
      setPositiveStat(Math.floor(AudioFeatures.valence*100));
      
      // Update the document title using the browser API;
    };

    getStats();

  }, []);



  return (
    <div className="statview">
      <ul>
        <li><p>Stats</p></li>
        <li><p>Danceability</p><p>{danceStat}%</p></li>
        <li><p>Energy</p><p>{energyStat}%</p></li>
        <li><p>Loudness</p><p>{loudStat}dB</p></li>
        <li><p>Positivity</p><p>{positiveStat}%</p></li>
      </ul>
    </div>
  );
}

export default StatView;