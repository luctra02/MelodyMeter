// Importing necessary dependencies from React and React Router
import musicLogo from '../assets/logo.svg';
import '../styles/index.css';
import { useState } from 'react';
import { fetchSongInfo } from '../script';
import { useNavigate } from 'react-router-dom';

// Functional component for the home page
function Home() {
  // Using the 'useNavigate' hook from React Router for navigation
  const navigate = useNavigate();

  // State to manage the search term input
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle input change in the search bar
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Function to trigger the search when the search button is clicked
  const handleSearch = () => {
    getSongs();
  };

  // Function to handle Enter key press in the search bar
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // If Enter key is pressed, trigger the search
      handleSearch();
    }
  };

  // Function to fetch song information based on the search term
  const getSongs = async () => {
    const sessionKey = String(sessionStorage.getItem('accesstoken'));
    const songInfo = await fetchSongInfo(sessionKey, searchTerm);
    // Navigating to the searchDisplay page with song information and search term
    navigate('/project1/searchDisplay', { state: { songInfo: songInfo, searchTerm: searchTerm } });
  };

  // Rendering the component
  return (
    <div>
      <div id="search">
        {/* Logo section */}
        <div className="Logo">
          <img src={musicLogo} alt="logo" />
        </div>
        {/* Search bar section */}
        <div className="Search">
          <input
            type="text"
            placeholder="Search Artist Name"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
}

// Exporting the component as the default export
export default Home;
