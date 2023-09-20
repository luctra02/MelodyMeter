import '../styles/songDisplay.css'
import { useEffect, useState } from 'react';
import { fetchTracks } from '../script';
import StatView from './statview';
import { useLocation } from 'react-router-dom';


function SongDisplay() {

    const [songName, setSongName] = useState("")
    const [songImage, setSongImage] = useState("")
   
    const location = useLocation();
    const songId = location.state.albumId ? location.state.albumId : location.state.playlistId;
    const song = location.state.songName;
    const songImg = location.state.songImage;

    
    useEffect(() => {
        console.log(songId)
        const getStats = async () => {
            const sessionKey = sessionStorage.getItem("accesstoken")
            const songInfo = await fetchTracks(sessionKey, songId);
            // Update the document title using the browser API;
            if(songId) {
                setSongName(songInfo.name);
                setSongImage(songInfo.album.images[0].url);
                console.log(songInfo);
            }else {
                setSongName(song)
                setSongImage(songImg)
                console.log(song)
            }
        }
        getStats();
    }, []);

    return (
        <div>
            <StatView />

            <div className="grey-box">
                <div className="singleSongDisplay">
                    <img src={songImage} className='Song-Image'></img>
                    <h1 className='songArtist'>{songName}</h1>
                </div>
            </div>
        </div>
    )
  }

export default SongDisplay;