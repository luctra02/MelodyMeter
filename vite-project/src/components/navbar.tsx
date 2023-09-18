import "../styles/navbar.css"
import musicLogo from "../assets/logo.svg"
import { Link } from "react-router-dom";

function Navbar () {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={musicLogo} alt="logo"/>
                <p>MelodyMeter</p>
            </div>

            <ul className="navbar-list">
                <Link to='/'><li className="navbar-item"><a href="/">Home</a></li></Link>
                <Link to='/favourite'><li className="navbar-item"><a href="/favorites">Favorites</a></li></Link>
                <div className="navbar-item">
                    <input type="text" placeholder="Search" />
                </div>
            </ul>
            
        </nav>

        )
    }

export default Navbar