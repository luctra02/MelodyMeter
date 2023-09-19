import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/grey-box.css'
import { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { fetchAlbumTracks, fetchPlaylistTracks } from '../script';
import {addSongToFavourites, checkSongInFavourites, removeSongFromFavourites} from './favourite';

function TracksDisplay(){
    const navigate = useNavigate();
    const location = useLocation();
    const albumId = location.state.albumId;
    const playlistId = location.state.playlistId;
    const imageURL = albumId ? location.state.albumImage : location.state.playlistImage
    const [albumTracksArray, setAlbumTracksArray] = useState<any[]>([]);
    const [playlistTracksArray, setPlaylistTracksArray] = useState<any[]>([]);

    function HandleClick(item: any){
        navigate('/SongDisplay', {state: {albumId: item.id}});
    }
    
    useEffect(() => {
        const getStats = async () => {
            const sessionKey = sessionStorage.getItem("accesstoken");
            if(albumId){
                const albumTracksResult = await fetchAlbumTracks(sessionKey, albumId);
                const newAlbumTracksArray = Object.values(albumTracksResult.tracks.items);
                setAlbumTracksArray(newAlbumTracksArray); // Update albumArray using state
            }else{
                const playlistTracksResult = await fetchPlaylistTracks(sessionKey, playlistId);
                const newPlaylistTracksArray = Object.values(playlistTracksResult.tracks.items);
                setPlaylistTracksArray(newPlaylistTracksArray); // Update albumArray using state
            }
        };
        getStats();
      }, [albumId, playlistId]);
      
    function changeFavourite(filledId: string, songName: string, artist: string) {
        const exists = checkSongInFavourites(songName, artist)
        
        if (exists) {
            removeSongFromFavourites(songName, artist)
            const filledElement = document.getElementById(filledId);
            if (filledElement) {
                filledElement.style.display = "none";
            } else {
                console.error(`Element with id ${filledId} not found`);
            }

        } else {
            addSongToFavourites(songName, artist)
            const filledElement = document.getElementById(filledId);
            if (filledElement) {
                filledElement.style.display = "block";
            } else {
                console.error(`Element with id ${filledId} not found`);
            }
        }
    }

    function showFavourite(filledId: string, songName: string, artist: string) {
        const exists = checkSongInFavourites(songName, artist)
        
        if (exists) {
            const filledElement = document.getElementById(filledId);
            if (filledElement) {
                filledElement.style.display = "block";
            } else {
                console.error(`Element with id ${filledId} not found`);
            }

        } else {
            const filledElement = document.getElementById(filledId);
            if (filledElement) {
                filledElement.style.display = "none";
            } else {
                console.error(`Element with id ${filledId} not found`);
            }
        }
    }

    useEffect(() => {
        albumTracksArray.forEach(item => {
            showFavourite(`${item.id}filled`, item.name, item.artist);
        });
        playlistTracksArray.forEach(item => {
            showFavourite(`${item.track.id}filled`, item.track.name, item.track.artist);
        });
      }, [albumTracksArray, playlistTracksArray]); 

    return(
        <div className="grey-box">
        <img src={imageURL} alt="" />
        <h1>Tracks</h1>
        <div className="Song-List">
            {albumTracksArray.map((item: any) => (
                <button key={item.id} onClick={() => HandleClick(item)}>
                    <div className="Song">
                        <h3>{item.name} - 
                        {item.artists.map((artist: any, index: number) => (
                                index === item.artists.length - 1
                                ? artist.name + ' '  // Don't add a comma after the last item
                                : artist.name + ', ' // Add a comma after all other items
                            ))}  
                        {Math.floor(item.duration_ms/1000/60) }:{Math.floor(item.duration_ms/1000 % 60) < 10 ? "0" + Math.floor(item.duration_ms/1000 % 60):Math.floor(item.duration_ms/1000 % 60)}</h3>
                        <div style={{ position: 'relative' }}>                                                                      
                            <span onClick={(e) => { 
                                e.stopPropagation(); 
                                changeFavourite(`${item.id}filled`, item.name, item.artist);
                                }}>
                                <AiOutlineStar className="text-yellow-400" />
                            </span>
                            <span onClick={(e) => { 
                                e.stopPropagation(); 
                                changeFavourite(`${item.id}filled`, item.name, item.artist);
                                }}>
                                <AiFillStar className="star" id={`${item.id}filled`}  style={{position: 'absolute', top: 0, left: 0 }} />
                            </span>
                        </div>
                    </div>
                </button>))}
        </div>
        <div className="Song-List">
            {playlistTracksArray.map((item: any,) => (
                <button key={item.track.id} onClick={() => HandleClick(item)}>
                    <div className="Song" >
                        <h3>
                            {item.track.name} - 
                            {item.track.artists.map((artist: any, index: number) => (
                                index === item.track.artists.length - 1
                                ? artist.name + ' '  // Don't add a comma after the last item
                                : artist.name + ', ' // Add a comma after all other items
                            ))}                        
                            {Math.floor(item.track.duration_ms/1000/60) }:{Math.floor(item.track.duration_ms/1000 % 60) < 10 ? "0" + Math.floor(item.track.duration_ms/1000 % 60):Math.floor(item.track.duration_ms/1000 % 60)}</h3>
                        <div style={{ position: 'relative' }}>                                                                      
                            <span onClick={(e) => { 
                                e.stopPropagation(); 
                                changeFavourite(`${item.track.id}filled`, item.track.name, item.track.artist);
                                }}>
                                <AiOutlineStar  className="text-yellow-400" />
                            </span>
                            <span onClick={(e) => { 
                                e.stopPropagation(); 
                                changeFavourite(`${item.id}filled`, item.name, item.artist);
                                }}>
                                <AiFillStar className="star" id={`${item.track.id}filled`}  style={{position: 'absolute', top: 0, left: 0 }} />
                            </span>
                        </div>
                    </div>
                </button>))}
        </div>
    </div>
    )
    
}

export default TracksDisplay;