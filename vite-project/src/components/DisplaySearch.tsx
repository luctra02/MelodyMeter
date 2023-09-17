import '../styles/grey-box.css'
import { useLocation } from 'react-router-dom';


function DisplaySearch() {
    const location = useLocation();
    const songInfo = location.state.songInfo
    const songInfoArray = Object.values(songInfo.tracks.items)
    console.log(songInfoArray);
    console.log(typeof songInfo);


  return (
    <div className="grey-box">
        <div className="Song-List">
            {songInfoArray.map((item: any, index: number) => (
                <div className="Song" key={index}>
                    <img src='https://i.scdn.co/image/ab67616d00001e022a038d3bf875d23e4aeaa84e' className='Song-Image'></img>
                    <h3>Happier Than Ever</h3>
                </div>))
            }
        </div>
    </div>
    );

}

export default DisplaySearch;