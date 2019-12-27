import React from 'react';
import { Link } from 'react-router-dom';

import "./Footer.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="logo footer-logo"><Link to='/'>THEMOVIEBOX</Link></div>
            <div className="footer-menu">
                <ul>
                    <li>About</li>
                    <li>Movies</li>
                    <li>Rating</li>
                    <li>Contact</li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;