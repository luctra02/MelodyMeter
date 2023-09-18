import React, { useEffect, useState } from 'react';
import '../styles/statview.css';
import fetchAudioFeatures from '../script.js';

function StatView() {
  const [danceStat, setDanceStat] = useState(0);
  const [energyStat, setEnergyStat] = useState(0);
  const [loudStat, setLoudStat] = useState(0);
  const [positiveStat, setPositiveStat] = useState(0);

  useEffect(() => {
    const getStats = async () => {
      const sessionKey = sessionStorage.getItem("accesstoken")
      const audioFeatures = await fetchAudioFeatures(sessionKey, "4cOdK2wGLETKBW3PvgPWqT");
      // Update the document title using the browser API;
      setDanceStat(Math.floor(audioFeatures.danceability*100));
      setEnergyStat(Math.floor(audioFeatures.energy*100));
      setLoudStat(Math.round(audioFeatures.loudness));
      setPositiveStat(Math.floor(audioFeatures.valence*100));
    };

    getStats();

  }, []);



  return (
    <div className="statview">
      <ul>
        <li><p>Danceability</p><p>{danceStat}%</p></li>
        <li><p>Energy</p><p>{energyStat}%</p></li>
        <li><p>Loudness</p><p>{loudStat}dB</p></li>
        <li><p>Positivity</p><p>{positiveStat}%</p></li>
      </ul>
    </div>
  );
}

export default StatView;