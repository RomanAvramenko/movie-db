import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal } from '../Modal/Modal'
import { genres } from '../../genres'

import "./Header.scss";

export default class Header extends Component {

  API_KEY = `api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
  BASE_URL = 'https://api.themoviedb.org/3/movie';

  state = {
    data: {},
    currentMovieIndex: 1,
    trailerRes: [],
    show: false
  }

  componentDidMount() {
    this.getData()
    this.intervalId = setInterval(this.timer, 7000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentMovieIndex !== this.state.currentMovieIndex) {
      this.getData()
    }
    if (this.state.show === true) {
      clearInterval(this.intervalId);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  timer = () => {
    this.setState({
      currentMovieIndex: Math.floor(Math.random() * 10)
    })
  }

  getData = async () => {
    const url = `${this.BASE_URL}/popular?${this.API_KEY}&language=en-US&page=1`;
    await axios
      .get(url)
      .then(result => {
        this.setState({
          data: this.transformData(result)
        })
        const idVideo = this.state.data.results[this.state.currentMovieIndex].id;
        this.getVideo(idVideo);
      })
      .catch(e => { console.log(e.config) });
  }

  transformData = (result) => {
    return {
      results: result.data.results
    }
  }

  getVideo = async (id) => {
    const urlVideo = `${this.BASE_URL}/${id}/videos?${this.API_KEY}`;
    await axios
      .get(urlVideo)
      .then(result => {
        this.setState({
          trailerRes: result.data
        })
      })
      .catch(e => { console.log(e.config) })
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    if (!this.state.data.results) {
      return null
    }
    const {
      backdrop_path, title, genre_ids,
      vote_count, vote_average, id
    } = this.state.data.results[this.state.currentMovieIndex];
    const bgImage = { backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path}` }
    return (
      <React.Fragment>
        {this.state.show
          ? <Modal
            show={this.state.show}
            handleClose={this.hideModal}
            props={title}
            trailerKey={this.state.trailerRes.results[0].key}
          ></Modal>
          : null
        }
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
                <button
                  className="content__btn content__btn_color"
                  onClick={this.showModal}
                >WATCH TRAILER</button>
                <button className="content__btn">
                  <Link to={`/details?id=${id}`}>
                    VIEW INFO
                  </Link>
                </button>
                <button className="content__btn content__btn_unborder">+ ADD TO WISHLIST</button>
              </div>
            </div>
            <div className="hero__rating">
                <p>Rating</p>
                <p className="title">based on {vote_count} reviews</p>
                <i className="fas fa-star"></i>
                <div className="rating">{vote_average}</div>
            </div>
          </div>
        </header >
      </React.Fragment >
    )
  }
}
