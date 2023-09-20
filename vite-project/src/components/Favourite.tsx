import { useNavigate } from 'react-router-dom';
import '../styles/favourite.css';
import '../styles/index.css';
import '../styles/songDisplay.css';
import '../styles/grey-box.css';

interface Song {
  songName: string;
  artist: string;
  imageURL: string;
}

function Favourite() {
  const navigate = useNavigate();
  const favouritesJSON = localStorage.getItem('favourites');
  const favourites: Song[] = favouritesJSON ? JSON.parse(favouritesJSON) : [];
  //localStorage.setItem("favourites", "[]"); //reset localStorage
  function HandleClick(item: Song) {
    navigate('/project1/SongDisplay', {
      state: { songName: item.songName, songImage: item.imageURL, artistName: item.artist },
    });
  }

  return (
    <div className="displayArtists">
      <h1 id="favouriteTitle">My Favourite Songs</h1>
      <div className="Song-List">
        {favourites.map((item: Song) => (
          <button key={item.songName + item.artist} onClick={() => HandleClick(item)}>
            <div className="Song">
              <img src={item.imageURL} className="Song-Image"></img>
              <h3 className="songArtist">
                {item.songName}- {item.artist}
              </h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Favourite;
