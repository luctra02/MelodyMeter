import './styles/App.css'
import Home from './components/Home'
import Navbar from './components/navbar'
import Favourite from './components/favourite'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {

  return (
  
    <Router >
      <div className="App">
        <Navbar />

      </div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/favourite' element={<Favourite />}/>
      </Routes>
    </Router>

  );
}

export default App