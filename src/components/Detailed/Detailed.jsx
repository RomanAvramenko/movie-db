import React from 'react'
import axios from 'axios';


import './Detailed.scss'

export default class Detailed extends React.Component {

    state = {
        response: null
    }

    componentDidMount() {
        this.getData()

    }

    getData = async () => {
        const { id } = this.props.id.location.state
        const API_KEY = 'api_key=82d1a8c492becf617a26326954e61f9a';
        const BASE_URL = 'https://api.themoviedb.org/3/movie';
        const url = `${BASE_URL}/${id}?${API_KEY}&language=en-US&page=1`;
        await axios
            .get(url)
            .then(result => { this.setState({ response: result }) })
            .catch(e => { console.log(e.config) });
        console.log(this.state.response.data);

    }

    render() {
        if (this.state.response === null) {
            return null
        } else {
            const { title, overview, poster_path, runtime,
                genres, production_companies,
                backdrop_path, production_countries
            } = this.state.response.data;
            const poster = { backgroundImage: `url(https://image.tmdb.org/t/p/w1280${poster_path}` }
            const backdrop = { backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path}` }
            return (
                <section className='detailed' style={backdrop}>
                    <div className='detailed__wrapper'>
                        <h1 className='title'>{title}</h1>
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
                        </div>
                    </div>
                </section>
            )
        }
    }
}