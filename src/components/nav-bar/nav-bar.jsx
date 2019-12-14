import React from 'react';

import "./nav-bar.scss";

const NavBar = () => {
    return (
        <div className="nav-bar">
            <div className="logo"><a href="/">THEMOVIEBOX</a></div>
            <div className="nav__btn">
                <button className="nav__btn__item"><i className="fas fa-search"></i></button>
                <button className="nav__btn__item">LOG IN</button>
                <button className="nav__btn__item nav__btn__item-color">SIGN UP</button>
            </div>
        </div>
    )
}

export default NavBar;