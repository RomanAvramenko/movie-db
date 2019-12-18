import React from 'react';

import "./nav-bar.scss";

const NavBar = () => {

    const toggle = (e) => {
        e.preventDefault();

    }

    return (
        <nav className="menu-box">
            <div className="logo"><a href="/">THEMOVIEBOX</a></div>
            <button className="menu-toggle" id="toggle-menu" onClick={toggle}>toggle menu</button>
            <div className="menu-dropdown is-open">
                <ul className="nav__menu">
                    <li className="nav__menu__item"><i className="fas fa-search"></i></li>
                    <li className="nav__menu__item">LOG IN</li>
                    <li className="nav__menu__item nav__menu__item-color">SIGN UP</li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;