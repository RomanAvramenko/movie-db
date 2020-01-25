import React from 'react'
import axios from 'axios';
import './Detailed.scss'
import { Modal } from '../Modal/Modal';
import placeholder from '../../assets/images/placeholder.jpg'
export default class Detailed extends React.Component {

  state = {
    response: null,
    trailerResp: [],
    creditsResp: [],
    show: false
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const id = this.props.id.location.search.slice(4)
    const API_KEY = `api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
    const BASE_URL = 'https://api.themoviedb.org/3/movie';
    const url = `${BASE_URL}/${id}?${API_KEY}&language=en-US&page=1`;
    const urlVideo = `${BASE_URL}/${id}/videos?${API_KEY}`;
    const urlCredits = `${BASE_URL}/${id}/credits?${API_KEY}`;
    await axios
      .all([
        axios.get(url),
        axios.get(urlCredits),
        axios.get(urlVideo),
      ])
      .then(
        axios.spread((result, responseCast, resVideo) => {
          this.setState({
            response: result.data,
            creditsResp: responseCast.data,
            trailerResp: resVideo.data
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
        backdrop_path, production_countries, release_date, imdb_id
      } = this.state.response;

      const { crew, cast } = this.state.creditsResp

      const director = crew.find(i => i.job === "Director") === undefined
        ? ''
        : crew.find(i => i.job === "Director").name

      const poster = poster_path === null
        ? { backgroundImage: `url(${placeholder})` }
        : { backgroundImage: `url(https://image.tmdb.org/t/p/w1280${poster_path})` }

      const backdrop = backdrop_path === null
        ? { backgroundColor: 'rgba(0, 0, 0, 0.4)' }
        : { backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path})` }

      const actors = cast.slice(0, 8).map((actor) => {
        const picUrl = actor.profile_path === null
          ? { backgroundImage: `url(${placeholder})` }
          : { backgroundImage: `url(https://image.tmdb.org/t/p/w500${actor.profile_path})` };
        return (
          <li key={actor.id}>
            <figure className="cast__figure">
              <div className="cast__img" style={picUrl}></div>
              <figcaption className="cast__description">{actor.name}</figcaption>
            </figure>
          </li>
        )
      })

      return (
        <section className='detail' style={backdrop}>
          {this.state.show
            ? <Modal
              show={this.state.show}
              handleClose={this.hideModal}
              props={title}
              trailerKey={this.state.trailerResp.results[0].key}
            ></Modal>
            : null
          }
          <div className='detail__wrapper'>
            <h1 className='detail__wrapper__title'>{title}</h1>
            <span className='detail__wrapper__rating'>
              <i className="fas fa-star detail__wrapper__rating-big"></i>&nbsp;
              <strong className='detail__wrapper__rating-big'>{vote_average}</strong> / 10
            </span>
            <div className='poster' style={poster}></div>
            <div className='description'>
              <ul>
                <li>
                  <strong>Plot Summary: </strong>
                  {overview}
                </li>
                <li>
                  <strong>Duration: </strong>
                  {Math.floor(runtime / 60)} hours {runtime % 60} minutes
                </li>
                <li>
                  <strong>Year: </strong>
                  {release_date.slice(0, 4)}
                </li>
                <li>
                  <strong>Genres: </strong>
                  {genres.map(i => i.name).join(' ')}
                </li>
                <li>
                  <strong>Production Co: </strong>
                  {production_companies.slice(0, 4).map(i => i.name).join(', ')}
                </li>
                <li>
                  <strong>Production Country:</strong>
                  {production_countries.map(i => i.name).join(', ')}
                </li>
                <li>
                  <strong>Directed by: </strong>
                  {director}
                </li>
                <li>
                  <strong>Cast:</strong>
                  <ul className="cast">
                    {actors}
                  </ul>
                </li>
              </ul>
              <span className="imdbRatingPlugin">
                <a href={`https://www.imdb.com/title/${imdb_id}/?ref_=plg_rt_1`}>
                  <img
                    src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_46x22.png"
                    alt="" />
                </a>
              </span>
              {
                this.state.trailerResp.results.length === 0
                  ? null
                  : <div className='description__btn' onClick={this.showModal}>Watch Trailer</div>
              }
            </div>
          </div>
        </section>
      )
    }
  }
}