import '../styles/navbar.css';
import musicLogo from '../assets/logo.svg';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/project1/">
          <img src={musicLogo} alt="logo" />
        </Link>
        <p>MelodyMeter</p>
      </div>

      <ul className="navbar-list">
        <Link to="/project1/">
          <li id="homenavbar" className="navbar-item">
            <a href="/project1/">Home</a>
          </li>
        </Link>
        <Link to="/project1/favourite">
          <li id="favoritenavbar" className="navbar-item">
            <a href="/favorites">Favorites</a>
          </li>
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;
