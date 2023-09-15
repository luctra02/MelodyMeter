import React from "react";
import "./navbar.css"
import musicLogo from ".././assets/logo.svg"

function Navbar () {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={musicLogo} alt="logo"/>
            </div>

            <ul className="navbar-list">
                <li className="navbar-item"><a href="/">Home</a></li>
                <li className="navbar-item"><a href="/favorites">Favorites</a></li>
                <div className="navbar-item">
                    <input type="text" placeholder="Search" />
                </div>
            </ul>
        </nav>
        )
    }

export default Navbar