import { useEffect, useState } from 'react';
import { fetchArtist } from '../script';
import '../styles/grey-box.css'
import { useLocation } from 'react-router-dom';


function DisplaySearch({ searchTerm }: { searchTerm: string }) {
    console.log(searchTerm);
    const location = useLocation();
    const songInfo = location.state.songInfo;
    const songInfoArray = Object.values(songInfo.tracks.items);
    console.log(songInfoArray);
    console.log(typeof songInfo);
  
    // Use the useState hook to manage artistArray
    const [artistArray, setArtistArray] = useState<any[]>([]);
  
    useEffect(() => {
      const getStats = async () => {
        const sessionKey = sessionStorage.getItem("accesstoken");
        const artistResult = await fetchArtist(sessionKey, searchTerm);
        const newArtistArray = Object.values(artistResult.artists.items);
        console.log(newArtistArray);
        setArtistArray(newArtistArray.slice(0,6)); // Update artistArray using state
      };
      getStats();
    }, [searchTerm]);
    
  return (
    <div className="grey-box">
        <div className="Song-List">
            {artistArray.map((item: any, index: number) => (
                <div className="Song" key={index}>
                    <img src={item.images.length > 0  ? item.images[0].url: "https://i.scdn.co/image/ab6761610000e5eba1b1a48354e9a91fef58f651"} className='Song-Image'></img>
                    
                    <h3>{item.name}</h3>
                </div>))
            
            }
        </div>
    </div>
    );

}

export default DisplaySearch;