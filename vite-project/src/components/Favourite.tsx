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
  console.log(favouritesJSON)
  const favourites: Song[] = favouritesJSON ? JSON.parse(favouritesJSON) : [];
  //localStorage.setItem("favourites", "[]"); //reset localStorage
  function HandleClick(item: Song) {
    navigate('/project1/SongDisplay', {
      state: { songName: item.songName, songImage: item.imageURL, artist: item.artist },
    });
  }

  return (
    <div className='displayArtists'>
        <div className="Song-List">
        {favourites.map((item: Song) => (
          <button className="displayIndiviualSongsButton" key={item.songName + item.artist} onClick={() => HandleClick(item)}>
            <div className="Song displayIndiviualSongs">
              {<img src={item.imageURL.length > 0  ? item.imageURL: "https://i.scdn.co/image/ab6761610000e5eba1b1a48354e9a91fef58f651"} className='Song-Image'></img>}
              <h3>{item.songName}</h3>
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

export default Favourite;
