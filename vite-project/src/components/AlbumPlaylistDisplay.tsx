// Importing necessary dependencies from React and other modules
import { useEffect, useState } from 'react';
import '../styles/grey-box.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fetchAlbum, fetchPlaylists } from '../script';

// Defining TypeScript interfaces for Album and Playlist objects
interface Album {
  id: string;
  images: { url: string }[];
  name: string;
}

interface Playlist {
  id: string;
  images: { url: string }[];
  name: string;
}

// Functional component for displaying albums and playlists
function AlbumPlaylistDisplay() {
  // Initializing React hooks for navigation, location, artist information, albums, and playlists
  const navigate = useNavigate();
  const location = useLocation();
  const artistInfo = location.state.artistInfo;
  const [albumArray, setAlbumArray] = useState<Album[]>([]);
  const [playlistArray, setPlaylistArray] = useState<Playlist[]>([]);

  // useEffect hook to fetch album and playlist data when artistInfo changes
  useEffect(() => {
    const getStats = async () => {
      const sessionKey = sessionStorage.getItem('accesstoken');

      // Fetching albums and updating the state
      const albumsResult = await fetchAlbum(sessionKey, artistInfo.name);
      const newAlbumArray = Object.values(albumsResult.albums.items) as Album[];
      setAlbumArray(newAlbumArray);

      // Fetching playlists and updating the state
      const playlistResult = await fetchPlaylists(sessionKey, artistInfo.name);
      const newPlaylistArray = Object.values(playlistResult.playlists.items) as Playlist[];
      setPlaylistArray(newPlaylistArray);
    };
    getStats();
  }, [artistInfo]);

  // Function to handle clicking on an album, navigating to TracksDisplay
  function HandleClickAlbum(item: Album) {
    navigate('/project1/TracksDisplay', { state: { albumId: item.id, albumImage: item.images[0].url } });
  }

  // Function to handle clicking on a playlist, navigating to TracksDisplay
  function HandleClickPlaylist(item: Playlist) {
    navigate('/project1/TracksDisplay', { state: { playlistId: item.id, playlistImage: item.images[0].url } });
  }

  // Rendering the component
  return (
    <div className="displayArtists">
      <h1>Albums</h1>
      <div className="Song-List">
        {/* Mapping through albumArray and rendering buttons for each album */}
        {albumArray.map((item: Album) => (
          <button key={item.id} onClick={() => HandleClickAlbum(item)}>
            <div className="Song">
              {/* Displaying album image or a default image if not available */}
              <img
                src={
                  item.images.length > 0
                    ? item.images[0].url
                    : 'https://i.scdn.co/image/ab6761610000e5eba1b1a48354e9a91fef58f651'
                }
                className="Song-Image"
              ></img>
              <h3>{item.name}</h3>
            </div>
          </button>
        ))}
      </div>
      <h1>Playlists</h1>
      <div className="Song-List">
        {/* Mapping through playlistArray and rendering buttons for each playlist */}
        {playlistArray.map((item: Playlist) => (
          <button key={item.id} onClick={() => HandleClickPlaylist(item)}>
            <div className="Song">
              {/* Displaying playlist image or a default image if not available */}
              <img
                src={
                  item.images.length > 0
                    ? item.images[0].url
                    : 'https://i.scdn.co/image/ab6761610000e5eba1b1a48354e9a91fef58f651'
                }
                className="Song-Image"
              ></img>
              <h3>{item.name}</h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Exporting the component as the default export
export default AlbumPlaylistDisplay;
