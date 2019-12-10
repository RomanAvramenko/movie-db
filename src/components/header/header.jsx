import React from 'react';
import NavBar from "../nav-bar";
import Widget from "../widget"
import "./header.scss";

const Header = () => {
    const bgImage = {backgroundImage: `url(${require("./images/featured-image-header.png")})`}
        return(
        <header className = "page__header" style = { bgImage } >
                <NavBar />
                <div className="header-content">
                    <h1 className="content__title">WRATH OF THE TITANS</h1>
                    <div className="header-content__main">
                        <div className="header-content__title">
                            <div className="content__desc">
                                <div className="content__desc_genre">Fantasy Animation Family |&nbsp;</div>
                                <div className="content__desc_duration">Duration: 1h 52m</div>
                            </div>
                        </div>
                        <div className="header-content__btn">
                            <button className="content__btn_color">WATCH MOVIE</button>
                            <button className="content__btn_bordered">VIEW INFO</button>
                            <button className="content__btn">+ ADD TO WISHLIST</button>
                        </div>
                    </div>
                    <Widget />
                </div>
        </header >
    )
}

export default Header;