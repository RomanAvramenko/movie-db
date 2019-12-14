import React from 'react';

import axios from 'axios';
import './catalog.scss';
import Loading from '../loading';
import Footer from '../footer';

export default class Catalog extends React.Component {
    state = {
        response: []
    }

    componentDidMount() {
        this.request();
    }

    request = () => {
        const API_KEY = 'api_key=82d1a8c492becf617a26326954e61f9a';
        const BASE_URL = 'https://api.themoviedb.org/3/movie';
        const url = `${BASE_URL}/popular?${API_KEY}&language=en-US&page=1`;
        axios
            .get(url)
            .then(result => { this.setState({ response: this._transformData(result) }) })
            .catch(e => { console.log(e.config); });
    };

    _transformData = (result) => {
        return {
            page: result.data.page,
            results: result.data.results,
        }
    }

    render() {
        if (this.state.response.results === undefined) {
            return (
                <Loading />
            );
        }
        return (
            <section className="catalog">
                <div className="catalog__header">
                    <ul className="catalog__menu menu">
                        <li className="menu__item">
                            <button className="menu__btn menu__btn_active">Poular</button>
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
                    {this.state.response.results.map(item => {
                        return (
                            <div className="movie" key={item.id}>
                                <div className="movie__pic">
                                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
                                </div>
                                <div className="movie__discription">
                                    <div className="movie__desc">
                                        <div className="movie__title">{item.title}</div>
                                        <div className="movie__genres">Action, Adventure, Fantasy</div>
                                    </div>
                                </div>
                                <div className="movie__ratio">Ratio: {item.vote_average}</div>
                            </div>
                        )
                    })}
                </div>
                <Footer />
            </section>
        );
    }
}


