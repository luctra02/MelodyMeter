import musicLogo from "../assets/logo.svg"
import '../styles/index.css'
import { useState } from "react"
import { fetchSongInfo } from '../script.js'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        
      };

    const handleSearch = () => {
        getSongs()
    };
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          // If Enter key is pressed, trigger the search
          handleSearch();
        }
      };

    const getSongs = async () => {
        const sessionKey = String(sessionStorage.getItem("accesstoken"))
        const songInfo = await fetchSongInfo(sessionKey, searchTerm);
        navigate('/searchDisplay', {state: {songInfo: songInfo, searchTerm: searchTerm}});

    }

    return (
        <div>
            <div id = "search">
                <div className="Logo">
                    <img src={musicLogo} alt="logo"/>
                </div>
                <div className="Search">
                    <input type="text" placeholder="Search Artist Name" 
                            value={searchTerm}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}/>
                </div>
            </div>
        </div>
    )
}

export default Home