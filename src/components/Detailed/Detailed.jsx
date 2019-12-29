import React from 'react'
import axios from 'axios';
import './Detailed.scss'
import { Modal } from '../Modal/Modal';
export default class Detailed extends React.Component {

    state = {
        response: null,
        trailerRes: [],
        show: false
    }

    componentDidMount() {
        this.getData()

    }

    getData = async () => {
        const { id } = this.props.id.location.state
        const API_KEY = 'api_key=82d1a8c492becf617a26326954e61f9a';
        const BASE_URL = 'https://api.themoviedb.org/3/movie';
        const url = `${BASE_URL}/${id}?${API_KEY}&language=en-US&page=1`;
        const urlVideo = `${BASE_URL}/${id}/videos?${API_KEY}`;
        await axios
            .all([
                axios.get(url),
                axios.get(urlVideo)
            ])
            .then(
                axios.spread((result, resVideo) => {
                    this.setState({
                        response: result,
                        trailerRes: resVideo.data.results[0].key
                    })
                })
            )
            .catch(e => { console.log(e.config) });
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    render() {
        if (this.state.response === null) {
            return null
        } else {
            const { title, overview, poster_path, runtime,
                genres, production_companies, vote_average,
                backdrop_path, production_countries
            } = this.state.response.data;
            const poster = { backgroundImage: `url(https://image.tmdb.org/t/p/w1280${poster_path}` }
            const backdrop = { backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path}` }
            return (
                <section className='detail' style={backdrop}>
                    <Modal
                        show={this.state.show}
                        handleClose={this.hideModal}
                        props={title}
                        trailerKey={this.state.trailerRes}
                    ></Modal>
                    <div className='detail__wrapper'>
                        <h1 className='detail__wrapper__title'>{title}</h1>
                        <span className='detail__wrapper__rating'>
                            <i className="far fa-star detail__wrapper__rating-big"></i>&nbsp;<strong className='detail__wrapper__rating-big'>{vote_average}</strong> / 10
                        </span>
                        <div className='poster' style={poster}></div>
                        <div className='description'>
                            <ul>
                                <li>
                                    <p>
                                        <strong>Plot Summary: </strong>
                                        {overview}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Duration: </strong>
                                        {Math.floor(runtime / 60)} hours {runtime % 60} minutes
                                        </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Genres: </strong>
                                        {genres.map(i => i.name).join(' ')}
                                    </p>
                                </li>
                                <li>
                                    <span>
                                        <strong>Production Co: </strong>
                                        <ul>
                                            {production_companies.map(i => <li key={i.id}>{i.name}</li>)}
                                        </ul>
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        <strong>Production Country:</strong>
                                        <ul>
                                            {production_countries.map((i, index) => <li key={index}>{i.name}</li>)}
                                        </ul>
                                    </span>
                                </li>
                            </ul>
                            <div className='description__btn' onClick={this.showModal}>Watch Trailer</div>
                        </div>
                    </div>
                </section>
            )
        }
    }
}