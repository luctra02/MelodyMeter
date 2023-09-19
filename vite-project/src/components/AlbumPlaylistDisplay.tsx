import { useEffect, useState } from 'react';
import '../styles/grey-box.css'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fetchAlbum, fetchPlaylists } from '../script';

function AlbumPlaylistDisplay() {
    const navigate = useNavigate();
    const location = useLocation();
    const artistInfo = location.state.artistInfo;
    const [albumArray, setAlbumArray] = useState<any[]>([]);
    const [playlistArray, setPlaylistArray] = useState<any[]>([]);

    useEffect(() => {
        const getStats = async () => {
            const sessionKey = sessionStorage.getItem("accesstoken");
            const albumsResult = await fetchAlbum(sessionKey, artistInfo.name);
            const newAlbumArray = Object.values(albumsResult.albums.items);
            setAlbumArray(newAlbumArray); // Update albumArray using state

            const playlistResult = await fetchPlaylists(sessionKey, artistInfo.name);
            console.log(playlistResult)
            const newPlaylistArray = Object.values(playlistResult.playlists.items);
            setPlaylistArray(newPlaylistArray); // Update playlistArray using state
        };
        getStats();
      }, [artistInfo]);

    function HandleClickAlbum(item: any){
        navigate('/TracksDisplay', {state: {albumId: item.id}});
    }
    function HandleClickPlaylist(item: any){
        navigate('/TracksDisplay', {state: {playlistId: item.id}});
    }

    return(
        <div className="grey-box">
            <h1>Albums</h1>
            <div className="Song-List">
                {albumArray.map((item: any) => (
                    <button onClick={() => HandleClickAlbum(item)}>
                        <div className="Song" key={item.name}>
                            <img src={item.images.length > 0  ? item.images[0].url: "https://i.scdn.co/image/ab6761610000e5eba1b1a48354e9a91fef58f651"} className='Song-Image'></img>
                            <h3>{item.name}</h3>
                        </div>
                    </button>))}
            </div>
            <h1>Playlists</h1>
            <div className="Song-List">
                {playlistArray.map((item: any,) => (
                    <button onClick={() => HandleClickPlaylist(item)}>
                        <div className="Song" key={item.name}>
                            <img src={item.images.length > 0  ? item.images[0].url: "https://i.scdn.co/image/ab6761610000e5eba1b1a48354e9a91fef58f651"} className='Song-Image'></img>
                            <h3>{item.name}</h3>
                        </div>
                    </button>))}
            </div>
        </div>
    )
}

export default AlbumPlaylistDisplay