import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/grey-box.css'
import { useEffect, useState } from 'react';
import { fetchAlbumTracks, fetchPlaylistTracks } from '../script';

function TracksDisplay(){
    
    const navigate = useNavigate();
    const location = useLocation();
    const albumId = location.state.albumId;
    const playlistId = location.state.playlistId;
    const imageURL = albumId ? location.state.albumImage : location.state.playlistImage
    const [albumTracksArray, setAlbumTracksArray] = useState<any[]>([]);
    const [playlistTracksArray, setPlaylistTracksArray] = useState<any[]>([]);
    

    function HandleClickAlbum(item: any){
        navigate('/SongDisplay', {state: {albumId: item.id}});
    }

    function HandleClickPlaylist(item: any){
        navigate('/SongDisplay', {state: {playlistId: item.track.id}});
    }
    

    useEffect(() => {
        console.log(albumId)
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
      console.log(albumTracksArray)
      console.log(playlistTracksArray)
 
    return(
        <div className="displayArtists">
        <img src={imageURL} className="displayArtistImage" alt="" />
        <h1>Tracks</h1>
        <div className="Song-List">
            {albumTracksArray.map((item: any) => (
                <button key={item.id} onClick={() => HandleClickAlbum(item)}>
                    <div className="Song">
                        {/* <img src={item.images.length > 0  ? item.images[0].url: "https://i.scdn.co/image/ab6761610000e5eba1b1a48354e9a91fef58f651"} className='Song-Image'></img> */}
                        <h3>{item.name} - 
                        {item.artists.map((artist: any, index: number) => (
                                index === item.artists.length - 1
                                ? artist.name + ' '  // Don't add a comma after the last item
                                : artist.name + ', ' // Add a comma after all other items
                            ))}  
                        {Math.floor(item.duration_ms/1000/60) }:{Math.floor(item.duration_ms/1000 % 60) < 10 ? "0" + Math.floor(item.duration_ms/1000 % 60):Math.floor(item.duration_ms/1000 % 60)}</h3>
                    </div>
                </button>))}
        </div>
        <div className="Song-List">
            {playlistTracksArray.map((item: any,) => (
                <button className="displayIndiviualSongsButton"key={item.track.id} onClick={() => HandleClick(item)}>
                    <div className="Song displayIndiviualSongs">
                        {/* <img src={item.images.length > 0  ? item.images[0].url: "https://i.scdn.co/image/ab6761610000e5eba1b1a48354e9a91fef58f651"} className='Song-Image'></img> */}
                        <h3>
                            {item.track.name}                         
                        </h3>
                        <h3 className="songSpecificInfo">
                        {item.track.artists.map((artist: any, index: number) => (
                                index === item.track.artists.length - 1
                                ? artist.name + ' '  // Don't add a comma after the last item
                                : artist.name + ', ' // Add a comma after all other items
                            ))}
                        </h3>
                        <h3 className="songSpecificInfo">
                        {Math.floor(item.track.duration_ms/1000/60) }:{Math.floor(item.track.duration_ms/1000 % 60) < 10 ? "0" + Math.floor(item.track.duration_ms/1000 % 60):Math.floor(item.track.duration_ms/1000 % 60)}
                        </h3>      
                    </div>
                </button>))}
        </div>
    </div>
    )
}

export default TracksDisplay;