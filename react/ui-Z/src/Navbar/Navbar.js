import React, { Component } from 'react';
import "./Navbar.css"

class Navbar extends Component {
    render() {
        return (
            <nav className="Navbar">
                <h1 className="navbar-title">Client Portal</h1>
                <ul className="nav-menu">
                    <li><a href="/home" className="navbar-link">
                        Home</a>
                    </li>
                    <li><a href="/searchPO" className="navbar-link">
                        Search for a PO</a>
                    </li>
                    <li><a href="/createPO" className="navbar-link">
                        Create a PO</a>
                    </li>
                    <li><a href="/partsList" className="navbar-link">
                        Parts</a>
                    </li>
                    <li><a href="/" className="navbar-link">
                        Logout</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;