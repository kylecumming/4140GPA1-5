import React, { Component } from 'react';
import "./Navbar.css"

class Navbar extends Component {
    render() {
        return (
            <nav className="Navbar">
                <h1 className="navbar-title">Company Z Agent Portal</h1>
                <ul className="nav-menu">
                    <li><a href="/" className="navbar-link">
                        Home</a>
                    </li>
                    <li><a href="/searchPO" className="navbar-link">
                        Search for a PO</a>
                    </li>
                    <li><a href="/partsList" className="navbar-link">
                        Parts</a>
                    </li>
                    <li><a href="/clientsList" className="navbar-link">
                        Clients</a>
                    </li>
                    <li>
                        <a href="allClientsList" className="navbar-link">
                            All Clients
                        </a>
                    </li>
                    <li>
                        <a href="/allPartsList" className="navbar-link">
                            All Parts
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;