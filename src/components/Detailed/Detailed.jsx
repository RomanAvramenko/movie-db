import React from 'react'
import axios from 'axios';
import './Detailed.scss'
import { Modal } from '../Modal/Modal';
export default class Detailed extends React.Component {

  state = {
    response: null,
    trailerResp: [],
    creditsResp: [],
    crewResp: [],
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
    const urlCredits = `${BASE_URL}/${id}/credits?${API_KEY}`;
    await axios
      .all([
        axios.get(url),
        axios.get(urlCredits),
        axios.get(urlVideo),
      ])
      .then(
        axios.spread((result, responseCast, resVideo) => {
          console.log(result);

          this.setState({
            response: result.data,
            creditsResp: responseCast.data.cast,
            crewResp: responseCast.data.crew.find(i => { return i.job === "Director" }),
            trailerResp: resVideo.data.results[0].key
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
        backdrop_path, production_countries, release_date
      } = this.state.response;
      const poster = { backgroundImage: `url(https://image.tmdb.org/t/p/w1280${poster_path}` }
      const backdrop = { backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path}` }
      return (
        <section className='detail' style={backdrop}>
          {this.state.show
            ? <Modal
              show={this.state.show}
              handleClose={this.hideModal}
              props={title}
              trailerKey={this.state.trailerResp}
            ></Modal>
            : null
          }
          <div className='detail__wrapper'>
            <h1 className='detail__wrapper__title'>{title}</h1>
            <span className='detail__wrapper__rating'>
              <i className="far fa-star detail__wrapper__rating-big"></i>&nbsp;
              <strong className='detail__wrapper__rating-big'>{vote_average}</strong> / 10
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
                        <strong>Year: </strong>
                        {release_date.slice(0, 4)}
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
                <li>
                  <span>
                    <strong>Directed by: </strong>
                    {this.state.crewResp.name}
                  </span>
                </li>
                <li>
                  <strong>Cast:</strong>
                  <ul className="cast">
                    {this.state.creditsResp.slice(0, 8).map((actor) => {
                      const picUrl = `https://image.tmdb.org/t/p/w1280${actor.profile_path}`;
                      return (
                        <li key={actor.id}>
                          <figure className="cast__figure">
                            <img src={picUrl} alt={actor.name} className="cast__img" />
                            <figcaption className="cast__description">{actor.name}</figcaption>
                          </figure>
                        </li>
                      )
                    })}
                  </ul>
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