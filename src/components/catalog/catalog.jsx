import React from 'react';
import axios from 'axios';
import './catalog.scss';
import Loading from '../loading';
import Footer from '../footer';
import { TileItem } from '../tile-item/tile-item';

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
            results: result.data.results
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
                <TileItem results={this.state.response.results}/>
                <Footer />
            </section>
        );
    }
}


