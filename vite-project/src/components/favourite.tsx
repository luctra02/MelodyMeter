
import '../styles/favourite.css'
import '../styles/index.css'
import '../styles/songDisplay.css'

interface Song {
    songName: string;
    artist: string;
  }

function addSongToFavourites(songName: string, artist: string) {
    const favouritesJSON = localStorage.getItem("favourites");
    const favourites: Song[] = favouritesJSON ? JSON.parse(favouritesJSON) : [];
    const newSong: Song = { songName: songName, artist: artist };
    favourites.push(newSong);
    const updatedFavourites = JSON.stringify(favourites);
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
    
    return (
        <div className='fullpageBox'>
            <h1 id = "favouriteTitle">My Favourite Songs</h1> 
            <div id = "favouriteList">
                <div className="favouriteSong">
                    <img src='https://i.scdn.co/image/ab67616d00001e022a038d3bf875d23e4aeaa84e' className='Song-Image'></img>
                    <h1 className='songArtist'>Billie Eilish - Happier Than Ever</h1>
                </div>
                <div className="favouriteSong">
                    <img src='https://i.scdn.co/image/ab67616d00001e022a038d3bf875d23e4aeaa84e' className='Song-Image'></img>
                    <h1 className='songArtist'>Billie Eilish - Happier Than Ever</h1>
                </div>
            </div>

        </div>
    )
}

export {checkSongInFavourites, addSongToFavourites, removeSongFromFavourites};
export default favourite;