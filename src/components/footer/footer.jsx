import React from 'react';

import "./Footer.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="logo footer-logo">THEMOVIEBOX</div>
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