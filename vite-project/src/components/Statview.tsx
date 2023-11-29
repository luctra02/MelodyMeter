// Importing necessary dependencies from React and React Router
import { useState, useEffect } from 'react';
import '../styles/statview.css';
import fetchAudioFeatures, { fetchSongInfo } from '../script';
import { useLocation } from 'react-router-dom';
// Importing icons for different statistics
import { SlEnergy } from "react-icons/sl";
import { VscSmiley } from "react-icons/vsc";
import { PiSpeakerHigh } from "react-icons/pi";
import { GiMusicalNotes } from "react-icons/gi";

// Functional component for displaying audio statistics of a song
function StatView() {
  // TypeScript interface for the search response
  interface SearchResponse {
    tracks: {
      items: Array<{ id: string }>;
    };
  }

  // State variables to store different audio statistics
  const [danceStat, setDanceStat] = useState(0);
  const [energyStat, setEnergyStat] = useState(0);
  const [loudStat, setLoudStat] = useState(0);
  const [positiveStat, setPositiveStat] = useState(0);

  // Using the 'useLocation' hook from React Router to get the location state
  const location = useLocation();
  // Extracting relevant information from the location state
  const songId = location.state.albumId ? location.state.albumId : location.state.playlistId;
  const song = location.state.songName;

  // useEffect hook to fetch audio statistics when the component mounts or relevant state changes
  useEffect(() => {
    const getStats = async () => {
      const sessionKey = sessionStorage.getItem('accesstoken');

      // Fetching audio statistics based on the presence of songId
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

    // Calling the function to fetch audio statistics
    getStats();
  }, [songId, song]);

  // Rendering the component
  return (
    <div className="statview">
      <ul>
        {/* Displaying Danceability statistic */}
        <li>
          <GiMusicalNotes />
          <p>Danceability</p>
          <p>{danceStat}%</p>
        </li>
        {/* Displaying Energy statistic */}
        <li>
          <SlEnergy/>
          <p>Energy</p>
          <p>{energyStat}%</p>
        </li>
        {/* Displaying Loudness statistic */}
        <li>
          <PiSpeakerHigh /><p>Loudness</p>
          <p>{loudStat}dB</p>
        </li>
        {/* Displaying Positivity statistic */}
        <li>
          <VscSmiley />
          <p>Positivity</p>
          <p>{positiveStat}%</p>
        </li>
      </ul>
    </div>
  );
}

// Exporting the component as the default export
export default StatView;
