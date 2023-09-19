import '../styles/grey-box.css'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function AlbumPlaylistDisplay() {
    const location = useLocation();
    const artistInfo = location.state.artistInfo;
    console.log(artistInfo)
    return(
        <div className="grey-box">
            <div>
                <img src={artistInfo.images[0].url}/>
                <p>{artistInfo.name}</p>
                

            </div>
        <div className="Song-List">
        </div>
    </div>
    )
}

export default AlbumPlaylistDisplay