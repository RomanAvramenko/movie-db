import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Widget from "../Widget/Widget"
import { genres } from '../../genres'

import "./Header.scss";

export default class Header extends Component {

    state = {
        data: {}
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        const API_KEY = 'api_key=82d1a8c492becf617a26326954e61f9a';
        const BASE_URL = 'https://api.themoviedb.org/3/movie';
        const url = `${BASE_URL}/popular?${API_KEY}&language=en-US&page=1`;
        await axios
            .get(url)
            .then(result => { this.setState({ data: this.transformData(result) }) })
            .catch(e => { console.log(e.config) });
    }

    transformData = (result) => {
        return {
            results: result.data.results
        }
    }

    render() {
        if (this.state.data.results === undefined) {
            return null
        }
        const { backdrop_path, title, genre_ids, vote_count, vote_average, id } = this.state.data.results[Math.floor(Math.random() * 20)];
        const bgImage = { backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path}` }
        return (
            <React.Fragment>
                <header className="page__header" style={bgImage} >
                    <div className="header-content">
                        <h1 className="content__title">{title}</h1>
                        <div className="header-content__main">
                            <div className="header-content__title">
                                <div className="content__desc">
                                    <div className="content__desc_genre">{genre_ids.map(i => genres[i]).join(' ')}</div>
                                </div>
                            </div>
                            <div className="header-content__btn">
                                <button className="content__btn content__btn_color">WATCH TRAILER</button>
                                <button className="content__btn">
                                    <Link to={{
                                        pathname: "/details",
                                        state: { id }
                                    }}>VIEW INFO
                                    </Link>
                                </button>
                                <button className="content__btn content__btn_unborder">+ ADD TO WISHLIST</button>
                            </div>
                        </div>
                        <Widget ratio={vote_average} votes={vote_count} />
                    </div>
                </header >
            </React.Fragment >
        )
    }
}
