// Importing necessary dependencies from React and React Router
import { useNavigate } from 'react-router-dom';

// Importing styles for the component
import '../styles/favourite.css';
import '../styles/index.css';
import '../styles/songDisplay.css';
import '../styles/grey-box.css';

// Defining TypeScript interface for the Song object
interface Song {
  songName: string;
  artist: string;
  imageURL: string;
}

// Functional component for displaying favorite songs
function Favourite() {
  // Using the 'useNavigate' hook from React Router for navigation
  const navigate = useNavigate();

  // Retrieving favorites from localStorage or initializing an empty array
  const favouritesJSON = localStorage.getItem('favourites');
  console.log(favouritesJSON)
  const favourites: Song[] = favouritesJSON ? JSON.parse(favouritesJSON) : [];
  
  // Function to handle clicking on a favorite song, navigating to SongDisplay
  function HandleClick(item: Song) {
    navigate('/project1/SongDisplay', {
      state: { songName: item.songName, songImage: item.imageURL, artist: item.artist },
    });
  }

  // Rendering the component
  return (
    <div className='displayArtists'>
      <div className="Song-List">
        {/* Mapping through the favorites and rendering buttons for each song */}
        {favourites.map((item: Song) => (
          <button className="displayIndiviualSongsButton" key={item.songName + item.artist} onClick={() => HandleClick(item)}>
            <div className="Song displayIndiviualSongs">
              {/* Displaying the song image or a default image if not available */}
              {<img src={item.imageURL.length > 0 ? item.imageURL : "https://i.scdn.co/image/ab6761610000e5eba1b1a48354e9a91fef58f651"} className='Song-Image'></img>}
              <h3>{item.songName}</h3>
              {/* Displaying the artist information */}
              <h3 className="songSpecificInfo">
                {item.artist}
              </h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Exporting the component as the default export
export default Favourite;
