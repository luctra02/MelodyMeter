import '../styles/songDisplay.css'
import React, { useEffect, useState } from 'react';
import fetchSongInfo from '../script.js';
import Statview from './StatView'
import GreyBox from "./GreyBox"


function SongDisplay() {

    const [songName, setSongName] = useState("")
    const [songArtist, setSongArtist] = useState("")
    const [songImage, setSongImage] = useState("")
    const [songID, setSongID] = useState("")
    const [songAlbum, setSongAlbum] = useState("")

    useEffect(() => {
        
        const getStats = async () => {
            const sessionKey = sessionStorage.getItem("accesstoken")
            const songInfo = await fetchSongInfo(sessionKey, "4cOdK2wGLETKBW3PvgPWqT");
            // Update the document title using the browser API;
            setSongName(songInfo.name);
            setSongArtist(songInfo.artists);
            setSongImage(songInfo.album.images[0].url);
            setSongID(songInfo.id);
            setSongAlbum(songInfo.album);
            console.log(songInfo);

        }
        getStats();
    }, []);

    return (
        <div>
            <Statview />

            <div className="grey-box">
                <div className="Song">
                    <img src={songImage} className='Song-Image'></img>
                    <h1 className='songArtist'>Billie Eilish - Happier Than Ever</h1>
                </div>
            </div>
        </div>
    )
  }

export default SongDisplay;