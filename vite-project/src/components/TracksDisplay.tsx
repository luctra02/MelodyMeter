import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/grey-box.css';
import { useEffect, useState } from 'react';
import { fetchAlbumTracks, fetchPlaylistTracks } from '../script';
import FavoriteButton from './FavoriteButton';

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

function TracksDisplay() {
  const navigate = useNavigate();
  const location = useLocation();
  const albumId = location.state.albumId;
  const playlistId = location.state.playlistId;
  const imageURL = albumId ? location.state.albumImage : location.state.playlistImage;
  const [albumTracksArray, setAlbumTracksArray] = useState<Track[]>([]);
  const [playlistTracksArray, setPlaylistTracksArray] = useState<Track[]>([]);

  function HandleClickAlbum(item: Track) {
    navigate('/project1/SongDisplay', { state: { albumId: item.id, artist: item.artists[0].name } });
  }

  function HandleClickPlaylist(item: Track) {
    navigate('/project1/SongDisplay', { state: { playlistId: item.track.id, artist: item.track.artists[0].name} });
  }

  useEffect(() => {
    const getStats = async () => {
      const sessionKey = sessionStorage.getItem('accesstoken');
      if (albumId) {
        const albumTracksResult = await fetchAlbumTracks(sessionKey, albumId);
        const newAlbumTracksArray = Object.values(albumTracksResult.tracks.items) as Track[];
        setAlbumTracksArray(newAlbumTracksArray); // Update albumArray using state
      } else {
        const playlistTracksResult = await fetchPlaylistTracks(sessionKey, playlistId);
        const newPlaylistTracksArray = Object.values(playlistTracksResult.tracks.items) as Track[];
        setPlaylistTracksArray(newPlaylistTracksArray); // Update albumArray using state
      }
    };
    getStats();
  }, [albumId, playlistId]);

  return (
    <div className="displayArtists">
      <img src={imageURL} className="displayArtistImage" alt="" />
      <h1>Tracks</h1>
      <div className="Song-List">
        {albumTracksArray.map((item: Track) => (
          <button className="displayIndiviualSongsButton" key={item.id} onClick={() => HandleClickAlbum(item)}>
            <div className="Song displayIndiviualSongs">
              {/* <img src={item.images.length > 0  ? item.images[0].url: "https://i.scdn.co/image/ab6761610000e5eba1b1a48354e9a91fef58f651"} className='Song-Image'></img> */}
              <h3>{item.name}</h3>
              <h3 className="songSpecificInfo">
                {item.artists.map(
                  (artist: artist, index: number) =>
                    index === item.artists.length - 1
                      ? artist.name + ' ' // Don't add a comma after the last item
                      : artist.name + ', ', // Add a comma after all other items
                )}
              </h3>
              <h3 className="songSpecificInfo">
                {Math.floor(item.duration_ms / 1000 / 60)}:
                {Math.floor((item.duration_ms / 1000) % 60) < 10
                  ? '0' + Math.floor((item.duration_ms / 1000) % 60)
                  : Math.floor((item.duration_ms / 1000) % 60)}
              </h3>              <FavoriteButton
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
        {playlistTracksArray.map((item: Track) => (
          <button className="displayIndiviualSongsButton" key={item.track.id} onClick={() => HandleClickPlaylist(item)}>
            <div className="Song displayIndiviualSongs">
              {/* <img src={item.images.length > 0  ? item.images[0].url: "https://i.scdn.co/image/ab6761610000e5eba1b1a48354e9a91fef58f651"} className='Song-Image'></img> */}
              <h3>{item.track.name}</h3>
              <h3 className="songSpecificInfo">
                {item.track.artists.map(
                  (artist: artist, index: number) =>
                    index === item.track.artists.length - 1
                      ? artist.name + ' ' // Don't add a comma after the last item
                      : artist.name + ', ', // Add a comma after all other items
                )}
              </h3>
              <h3 className="songSpecificInfo">
                {Math.floor(item.track.duration_ms / 1000 / 60)}:
                {Math.floor((item.track.duration_ms / 1000) % 60) < 10
                  ? '0' + Math.floor((item.track.duration_ms / 1000) % 60)
                  : Math.floor((item.track.duration_ms / 1000) % 60)}
              </h3>
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

export default TracksDisplay;
