import './styles/App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Favourite from './components/Favourite';
import AlbumPlaylistDisplay from './components/AlbumPlaylistDisplay';
import TracksDisplay from './components/TracksDisplay';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SongDisplay from './components/SongDisplay';
import DisplaySearch from './components/DisplaySearch';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route path="/project1/" element={<Home />} />
        <Route path="/project1/favourite" element={<Favourite />} />
        <Route path="/project1/songDisplay" element={<SongDisplay />} />
        <Route path="/project1/searchDisplay" element={<DisplaySearch />} />
        <Route path="/project1/AlbumPlaylistDisplay" element={<AlbumPlaylistDisplay />} />
        <Route path="/project1/TracksDisplay" element={<TracksDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
