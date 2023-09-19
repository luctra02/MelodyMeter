import './styles/App.css'
import Home from './components/Home'
import Navbar from './components/navbar'
import Favourite from './components/favourite'
import AlbumPlaylistDisplay from './components/AlbumPlaylistDisplay'
import TracksDisplay from './components/TracksDisplay'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SongDisplay from './components/SongDisplay';
import DisplaySearch from './components/DisplaySearch';




function App() {




  
  return (
    <Router >
      <div className="App">
        <Navbar />

      </div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/favourite' element={<Favourite />}/>
        <Route path='/songDisplay' element={<SongDisplay />}/>
        <Route path='/searchDisplay' element={<DisplaySearch  />}/>
        <Route path='/AlbumPlaylistDisplay' element={<AlbumPlaylistDisplay />}/>
        <Route path='/TracksDisplay' element={<TracksDisplay />}/>
      </Routes>
    </Router>

  );
}

export default App