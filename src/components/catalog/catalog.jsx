import React from 'react';

import './catalog.scss';
import Loading from '../loading';

const Catalog = () => {
    return (
        <section className="catalog">
            <div className="catalog__header">
                <ul className="catalog__menu menu">
                    <li className="menu__item">
                        <button className="menu__btn menu__btn_active">Trending</button>
                    </li>
                    <li className="menu__item">
                        <button className="menu__btn">Top Rated</button>
                    </li>
                    <li className="menu__item">
                        <button className="menu__btn">New Arrivals</button>
                    </li>
                    <li className="menu__item">
                        <button className="menu__btn">Genre<i className="fas fa-angle-down"></i></button>
                    </li>
                </ul>
            </div>
            <div className="catalog__content row">
                <div className="col-3 col-md-3">
                    <div className="movie">
                        <div className="movie__pic"><img src={require('./images/bitmap.jpg')} alt=""/></div>
                        <div className="movie__discription">
                            <div className="movie__desc">
                                <div className="movie__title">Logan</div>
                                <div className="movie__genres">Action, Adventure, Fantasy</div>
                            </div>
                            <div className="movie__ratio">4.0</div>
                        </div>
                    </div>
                </div>
                <div className="col-3 col-md-3">
                    <div className="movie">
                        <div className="movie__pic"><img src={require('./images/JohnWick.png')} alt=""/></div>
                        <div className="movie__discription">
                            <div className="movie__desc">
                                <div className="movie__title">John Wick: Chapter 2</div>
                                <div className="movie__genres">Action, Thriller</div>
                            </div>
                            <div className="movie__ratio">4.8</div>
                        </div>
                    </div>
                </div>
                <div className="col-3 col-md-3">
                    <div className="movie">
                        <div className="movie__pic"><img src={require('./images/FanBeast.png')} alt=""/></div>
                        <div className="movie__discription">
                            <div className="movie__desc">
                                <div className="movie__title">Fantastic beast an..</div>
                                <div className="movie__genres">Adventure, Fantasy, Action</div>
                            </div>
                            <div className="movie__ratio">4.5</div>
                        </div>
                    </div>
                </div>
                <div className="col-3 col-md-3">
                    <div className="movie">
                        <div className="movie__pic"><img src={require('./images/Beauty.png')} alt=""/></div>
                        <div className="movie__discription">
                            <div className="movie__desc">
                                <div className="movie__title">Beauty and the Beast</div>
                                <div className="movie__genres">Musical, Drama, Fantasy</div>
                            </div>
                            <div className="movie__ratio">4.4</div>
                        </div>
                    </div>
                </div>
                <Loading />
            </div>
            <div className="catalog__footer">
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
        </section>
    );
}

export default Catalog;
