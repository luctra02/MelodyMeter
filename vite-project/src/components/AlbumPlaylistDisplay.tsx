import { useEffect, useState } from 'react';
import '../styles/grey-box.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fetchAlbum, fetchPlaylists } from '../utils/script';

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

function AlbumPlaylistDisplay() {
  const navigate = useNavigate();
  const location = useLocation();
  const artistInfo = location.state.artistInfo;
  const [albumArray, setAlbumArray] = useState<Album[]>([]);
  const [playlistArray, setPlaylistArray] = useState<Playlist[]>([]);

  useEffect(() => {
    const getStats = async () => {
      const sessionKey = sessionStorage.getItem('accesstoken');
      const albumsResult = await fetchAlbum(sessionKey, artistInfo.name);
      const newAlbumArray = Object.values(albumsResult.albums.items) as Album[];
      setAlbumArray(newAlbumArray); // Update albumArray using state

      const playlistResult = await fetchPlaylists(sessionKey, artistInfo.name);
      const newPlaylistArray = Object.values(playlistResult.playlists.items) as Playlist[];
      setPlaylistArray(newPlaylistArray); // Update playlistArray using state
    };
    getStats();
  }, [artistInfo]);

  function HandleClickAlbum(item: Album) {
    navigate('/project1/TracksDisplay', { state: { albumId: item.id, albumImage: item.images[0].url } });
  }
  function HandleClickPlaylist(item: Playlist) {
    navigate('/project1/TracksDisplay', { state: { playlistId: item.id, playlistImage: item.images[0].url } });
  }

  return (
    <div className="displayArtists">
      <h1>Albums</h1>
      <div className="Song-List">
        {albumArray.map((item: Album) => (
          <button key={item.id} onClick={() => HandleClickAlbum(item)}>
            <div className="Song">
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
        {playlistArray.map((item: Playlist) => (
          <button key={item.id} onClick={() => HandleClickPlaylist(item)}>
            <div className="Song">
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

export default AlbumPlaylistDisplay;
