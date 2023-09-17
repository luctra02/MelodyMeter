import "../styles/navbar.css"
import musicLogo from "../assets/logo.svg"
import { Link } from "react-router-dom";

function Navbar () {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={musicLogo} alt="logo"/>
            </div>

            <ul className="navbar-list">
                <li className="navbar-item"><a href="/">Home</a></li>
                <Link to='/favourite'><li className="navbar-item"><a href="/favorites">Favorites</a></li></Link>
                <div className="navbar-item">
                    <input type="text" placeholder="Search" />
                </div>
            </ul>
            
        </nav>

        )
    }

export default Navbar