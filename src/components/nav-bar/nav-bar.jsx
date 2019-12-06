import React from 'react';

import "./nav-bar.scss";

const NavBar = () => {
    return (
        <div className="nav-bar">
            <div className="logo">THEMOVIEBOX</div>
            <div className="nav__btn">
                <button className="nav__btn"><i className="fas fa-search"></i></button>
                <button className="nav__btn">LOG IN</button>
                <button className="nav__btn nav__btn_color">SIGN UP</button>
            </div>
        </div>
    )
}

export default NavBar;