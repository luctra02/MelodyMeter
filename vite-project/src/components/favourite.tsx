
import { useNavigate } from 'react-router-dom';
import '../styles/favourite.css'
import '../styles/index.css'
import '../styles/songDisplay.css'



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
    
    const favouritesJSON = localStorage.getItem("favourites");
    const favourites: Song[] = favouritesJSON ? JSON.parse(favouritesJSON) : [];
    console.log(favourites)
    //localStorage.setItem("favourites", "[]");

    return (
        <div className='fullpageBox'>
            <h1 id = "favouriteTitle">My Favourite Songs</h1>
            {favourites.map((item: any) => (
                <div id = "favouriteList" key={item.name+item.artist}>
                    <div className="favouriteSong">
                        <img src={item.imageURL} className='Song-Image'></img>
                        <h4 className='songArtist'>{item.songName}- {item.artist}</h4>
                    </div>
                </div>
            ))}
            </div>
    
    )
}

export {checkSongInFavourites, addSongToFavourites, removeSongFromFavourites};
export default favourite;