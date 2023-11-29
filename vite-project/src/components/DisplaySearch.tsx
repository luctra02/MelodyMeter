// Importing necessary dependencies from React and other modules
import { useEffect, useState } from 'react';
import { fetchArtist } from '../script';
import '../styles/grey-box.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Defining TypeScript interface for SpotifyArtist object
interface SpotifyArtist {
  id: string;
  name: string;
  images: { url: string }[];
  genres: string[];
}

// Functional component for displaying search results of artists
function DisplaySearch() {
  // Initializing React hooks for navigation, location, search term, and artists
  const navigate = useNavigate();
  const location = useLocation();
  const searchTerm = location.state.searchTerm;
  const [artistArray, setArtistArray] = useState<SpotifyArtist[]>([]);

  // useEffect hook to fetch artist data when searchTerm changes
  useEffect(() => {
    const getStats = async () => {
      const sessionKey = sessionStorage.getItem('accesstoken');

      // Fetching artists and updating the state
      const artistResult = await fetchArtist(sessionKey, searchTerm);
      const newArtistArray = Object.values(artistResult.artists.items) as SpotifyArtist[];

      // Update artistArray using state, limiting to the first 20 results
      setArtistArray(newArtistArray.slice(0, 20));
    };
    getStats();
  }, [searchTerm]);

  // Function to handle clicking on an artist, navigating to AlbumPlaylistDisplay
  function HandleClick(item: SpotifyArtist) {
    navigate('/project1/AlbumPlaylistDisplay', { state: { artistInfo: item } });
  }

  // Rendering the component
  return (
    <div className="displayArtists">
      {/* Conditional rendering based on the length of artistArray */}
      {artistArray.length === 0 ? (
        <h1 className="noResults">No Results Found</h1>
      ) : (
        <div className="Song-List">
          {/* Mapping through artistArray and rendering buttons for each artist */}
          {artistArray.map((item: SpotifyArtist, index: number) => (
            <button key={index} onClick={() => HandleClick(item)}>
              <div className="Song">
                {/* Displaying artist image or a default image if not available */}
                <img
                  src={
                    item.images.length > 0
                      ? item.images[0].url
                      : 'https://i.scdn.co/image/ab6761610000e5eba1b1a48354e9a91fef58f651'
                  }
                  className="Song-Image"
                ></img>

                {/* Displaying artist name and up to two genres */}
                <h3>
                  {item.name}
                  <div className="genreInfo">
                    {item.genres.slice(0, 2).map((genre: string) => (
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
      )}
    </div>
  );
}

// Exporting the component as the default export
export default DisplaySearch;
