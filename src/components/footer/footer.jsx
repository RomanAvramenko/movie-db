import React from 'react';

import "./footer.scss";

const Footer = () => {
    return (
        <div className="footer">
            <div className="logo footer-logo">THEMOVIEBOX</div>
            <div className="footer-menu">
                <ul>
                    <li>About</li>
                    <li>Movies</li>
                    <li>Rating</li>
                    <li>Contact</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;