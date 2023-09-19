
import '../styles/favourite.css'
import '../styles/index.css'
import '../styles/songDisplay.css'
import '../styles/grey-box.css'

function favourite() {
    return (
        <div className='displayArtists'>
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

export default favourite