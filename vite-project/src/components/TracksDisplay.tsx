// Importing necessary dependencies from React and React Router
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/grey-box.css';
import { useEffect, useState } from 'react';
import { fetchAlbumTracks, fetchPlaylistTracks } from '../script';
import FavoriteButton from './FavoriteButton';

// TypeScript interfaces for the Track and artist objects
interface Track {
  track: { id: string; name: string; artists: { name: string }[]; duration_ms: number };
  id: string;
  name: string;
  artists: { name: string }[];
  duration_ms: number;
}

interface artist {
  name: string;
}

// Functional component for displaying tracks of an album or playlist
function TracksDisplay() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extracting relevant information from the location state
  const albumId = location.state.albumId;
  const playlistId = location.state.playlistId;
  const imageURL = albumId ? location.state.albumImage : location.state.playlistImage;

  // State variables to store the array of tracks for an album or playlist
  const [albumTracksArray, setAlbumTracksArray] = useState<Track[]>([]);
  const [playlistTracksArray, setPlaylistTracksArray] = useState<Track[]>([]);

  // Function to handle navigation to the SongDisplay component for an album track
  function HandleClickAlbum(item: Track) {
    navigate('/project1/SongDisplay', { state: { albumId: item.id, artist: item.artists[0].name } });
  }

  // Function to handle navigation to the SongDisplay component for a playlist track
  function HandleClickPlaylist(item: Track) {
    navigate('/project1/SongDisplay', { state: { playlistId: item.track.id, artist: item.track.artists[0].name } });
  }

  // useEffect hook to fetch tracks when the component mounts or relevant state changes
  useEffect(() => {
    const getStats = async () => {
      const sessionKey = sessionStorage.getItem('accesstoken');

      // Fetching album tracks or playlist tracks based on the presence of albumId
      if (albumId) {
        const albumTracksResult = await fetchAlbumTracks(sessionKey, albumId);
        const newAlbumTracksArray = Object.values(albumTracksResult.tracks.items) as Track[];
        setAlbumTracksArray(newAlbumTracksArray); // Update albumTracksArray using state
      } else {
        const playlistTracksResult = await fetchPlaylistTracks(sessionKey, playlistId);
        const newPlaylistTracksArray = Object.values(playlistTracksResult.tracks.items) as Track[];
        setPlaylistTracksArray(newPlaylistTracksArray); // Update playlistTracksArray using state
      }
    };
    getStats();
  }, [albumId, playlistId]);

  // Rendering the component
  return (
    <div className="displayArtists">
      {/* Displaying the image of the album or playlist */}
      <img src={imageURL} className="displayArtistImage" alt="" />
      <h1>Tracks</h1>
      <div className="Song-List">
        {/* Mapping through album tracks and rendering individual track items */}
        {albumTracksArray.map((item: Track) => (
          <button className="displayIndiviualSongsButton" key={item.id} onClick={() => HandleClickAlbum(item)}>
            <div className="Song displayIndiviualSongs">
              <h3>{item.name}</h3>
              {/* Displaying artists for the track */}
              <h3 className="songSpecificInfo">
                {item.artists.map(
                  (artist: artist, index: number) =>
                    index === item.artists.length - 1
                      ? artist.name + ' ' // Don't add a comma after the last item
                      : artist.name + ', ', // Add a comma after all other items
                )}
              </h3>
              {/* Displaying duration of the track */}
              <h3 className="songSpecificInfo">
                {Math.floor(item.duration_ms / 1000 / 60)}:
                {Math.floor((item.duration_ms / 1000) % 60) < 10
                  ? '0' + Math.floor((item.duration_ms / 1000) % 60)
                  : Math.floor((item.duration_ms / 1000) % 60)}
              </h3>
              {/* Rendering the FavoriteButton component with relevant track information */}
              <FavoriteButton
                songID={item.id}
                songName={item.name}
                songArtist={item.artists[0].name}
                songImage={imageURL}
              />
            </div>
          </button>
        ))}
      </div>
      <div className="Song-List">
        {/* Mapping through playlist tracks and rendering individual track items */}
        {playlistTracksArray.map((item: Track) => (
          <button className="displayIndiviualSongsButton" key={item.track.id} onClick={() => HandleClickPlaylist(item)}>
            <div className="Song displayIndiviualSongs">
              <h3>{item.track.name}</h3>
              {/* Displaying artists for the track */}
              <h3 className="songSpecificInfo">
                {item.track.artists.map(
                  (artist: artist, index: number) =>
                    index === item.track.artists.length - 1
                      ? artist.name + ' ' // Don't add a comma after the last item
                      : artist.name + ', ', // Add a comma after all other items
                )}
              </h3>
              {/* Displaying duration of the track */}
              <h3 className="songSpecificInfo">
                {Math.floor(item.track.duration_ms / 1000 / 60)}:
                {Math.floor((item.track.duration_ms / 1000) % 60) < 10
                  ? '0' + Math.floor((item.track.duration_ms / 1000) % 60)
                  : Math.floor((item.track.duration_ms / 1000) % 60)}
              </h3>
              {/* Rendering the FavoriteButton component with relevant track information */}
              <FavoriteButton 
                songID={item.track.id}
                songName={item.track.name}
                songArtist={item.track.artists[0].name}
                songImage={imageURL}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Exporting the component as the default export
export default TracksDisplay;
