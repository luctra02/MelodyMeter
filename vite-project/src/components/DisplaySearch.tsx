import { useEffect, useState } from 'react';
import { fetchArtist } from '../utils/script';
import '../styles/grey-box.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface SpotifyArtist {
  id: string;
  name: string;
  images: { url: string }[];
  genres: string[];
}

function DisplaySearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const songInfo = location.state.songInfo;
  const songInfoArray = Object.values(songInfo.tracks.items);
  const searchTerm = location.state.searchTerm;
  console.log(songInfoArray);

  const [artistArray, setArtistArray] = useState<SpotifyArtist[]>([]);

  useEffect(() => {
    const getStats = async () => {
      const sessionKey = sessionStorage.getItem('accesstoken');
      const artistResult = await fetchArtist(sessionKey, searchTerm);
      const newArtistArray = Object.values(artistResult.artists.items) as SpotifyArtist[];
      console.log(newArtistArray);
      setArtistArray(newArtistArray.slice(0, 20)); // Update artistArray using state
    };
    getStats();
  }, [searchTerm]);

  function HandleClick(item: SpotifyArtist) {
    //console.log(item.images[0].url, item.name, item.id)
    navigate('/project1/AlbumPlaylistDisplay', { state: { artistInfo: item } });
  }

  return (
    <div className="displayArtists">
      <div className="Song-List">
        {artistArray.map((item: SpotifyArtist, index: number) => (
          <button key={index} onClick={() => HandleClick(item)}>
            <div className="Song">
              <img
                src={
                  item.images.length > 0
                    ? item.images[0].url
                    : 'https://i.scdn.co/image/ab6761610000e5eba1b1a48354e9a91fef58f651'
                }
                className="Song-Image"
              ></img>

              <h3>
                {item.name}
                <div className="genreInfo">
                  {item.genres.map((genre: string) => (
                    <h3 className="genres" key={item.name + genre}>
                      {genre}
                    </h3>
                  ))}
                </div>
              </h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default DisplaySearch;
