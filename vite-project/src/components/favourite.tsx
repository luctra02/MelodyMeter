
import { useNavigate } from 'react-router-dom';
import '../styles/favourite.css'
import '../styles/index.css'
import '../styles/songDisplay.css'
import '../styles/grey-box.css'


interface Song {
    songName: string;
    artist: string;
    imageURL: string;
  }

  async function addSongToFavourites(songName: string, artist: string, imageURL: string) {
    const favouritesJSON = localStorage.getItem("favourites");
    const favourites = favouritesJSON ? JSON.parse(favouritesJSON) : [];
    const newSong = {
    songName: songName,
    artist: artist,
    imageURL: imageURL || '' // Use optional chaining to avoid errors if imageURL is undefined
    };
  
    favourites.push(newSong);
    const updatedFavourites = JSON.stringify(favourites);
    console.log()
    localStorage.setItem("favourites", updatedFavourites);
  }


function removeSongFromFavourites(songName: string, artist: string) {
    const favouritesJSON = localStorage.getItem("favourites");
    const favourites: Song[] = favouritesJSON ? JSON.parse(favouritesJSON) : [];
    const index = favourites.findIndex(song => song.songName == songName && song.artist == artist);
    if (index != -1) {
      favourites.splice(index, 1);
      const updatedFavourites = JSON.stringify(favourites);
      localStorage.setItem("favourites", updatedFavourites);
    }
  }

function checkSongInFavourites(songName: string, artist: string) {
    const favouritesJSON = localStorage.getItem("favourites");
    const favourites: Song[] = favouritesJSON ? JSON.parse(favouritesJSON) : [];
    const index = favourites.findIndex(song => song.songName == songName && song.artist == artist);
    if (index != -1) {
      return true
    } else {
        return false
    }
  }


function favourite() {    
    const navigate = useNavigate();
    const favouritesJSON = localStorage.getItem("favourites");
    const favourites: Song[] = favouritesJSON ? JSON.parse(favouritesJSON) : [];
    console.log(favourites)
    //localStorage.setItem("favourites", "[]");
    function HandleClick(item: any){
        navigate('/TracksDisplay', {state: {albumId: item.id , albumImage: item.images[0].url}});
    }
    // function HandleClick(item: any){
    //     navigate('/TracksDisplay', {state: {playlistId: item.id, playlistImage: item.images[0].url}});
    // }

    return (
        <div className="displayArtists">
            <h1 id = "favouriteTitle">My Favourite Songs</h1>
            <div className="Song-List">
            {favourites.map((item: any) => (
                <button onClick={() => HandleClick(item)}>
                    <div className="Song">
                        <img src={item.imageURL} className='Song-Image'></img>
                        <h3 className='songArtist'>{item.songName}- {item.artist}</h3>
                    </div>
                </button>
            ))}
            </div>
        </div>
    
    )
}

export {checkSongInFavourites, addSongToFavourites, removeSongFromFavourites};
export default favourite;