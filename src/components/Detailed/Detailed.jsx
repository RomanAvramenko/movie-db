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
            const { title, tagline, poster_path } = this.state.response.data;
            const bgImage = { backgroundImage: `url(https://image.tmdb.org/t/p/w1280${poster_path}` }
            return (
                <section className='detailed'>
                    <div className='detailed__wrapper'>
                        <h1 className='title'>{title}</h1>
                        <p className='tag'>{tagline}</p>
                        <div className='poster' style={bgImage}></div>
                    </div>
                </section>
            )
        }
    }
}