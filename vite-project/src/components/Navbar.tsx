// Importing necessary dependencies from React and React Router
import '../styles/navbar.css';
import musicLogo from '../assets/logo.svg';
import { Link } from 'react-router-dom';

// Functional component for rendering the navigation bar
function Navbar() {
  // Rendering the component
  return (
    <nav className="navbar">
      {/* Logo and brand name section */}
      <div className="navbar-logo">
        {/* Link to the home page */}
        <Link to="/project1/">
          <img src={musicLogo} alt="logo" />
        </Link>
        <p>MelodyMeter</p>
      </div>

      {/* Navigation links section */}
      <ul className="navbar-list">
        {/* Link to the home page */}
        <Link to="/project1/">
          <li id="homenavbar" className="navbar-item">
            <a href="/project1/">Home</a>
          </li>
        </Link>
        {/* Link to the favorites page */}
        <Link to="/project1/favourite">
          <li id="favoritenavbar" className="navbar-item">
            <a href="/favorites">Favorites</a>
          </li>
        </Link>
      </ul>
    </nav>
  );
}

// Exporting the component as the default export
export default Navbar;
