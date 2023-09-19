import "../styles/navbar.css"
import musicLogo from "../assets/logo.svg"
import { Link } from "react-router-dom";

function Navbar () {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
            <Link to='/'><img src={musicLogo} alt="logo"/></Link>
                <p>MelodyMeter</p>
            </div>

            <ul className="navbar-list">
                <Link to='/'><li id="homenavbar" className="navbar-item"><a href="/">Home</a></li></Link>
                <Link to='/favourite'><li id="favoritenavbar" className="navbar-item"><a href="/favorites">Favorites</a></li></Link>
            </ul>
            
        </nav>

        )
    }

export default Navbar