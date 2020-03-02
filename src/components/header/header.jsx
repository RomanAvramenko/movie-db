import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal } from '../Modal/Modal'
import { genres } from '../../genres'
import { Trailer } from '../Trailer/Trailer';
import "./Header.scss";
import { BASE_URL, API_KEY } from '../../constants';
import { connect } from 'react-redux';
import { headerData, headerTrailer } from '../../store/actions/header';
import PropTypes from 'prop-types';

class Header extends Component {

  state = {
    currentMovieIndex: 1,
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
      currentMovieIndex: Math.floor(Math.random() * 19)
    })
  }

  getData = async () => {
    const url = `${BASE_URL}/popular?${API_KEY}&language=en-US&page=1`;
    await axios
      .get(url)
      .then(result => {
        this.props.headerData({ data: result.data.results })
        const idVideo = this.props.data[this.state.currentMovieIndex].id;
        this.getVideo(idVideo);
      })
      .catch(e => { console.log(e.config) });
  }

  getVideo = async (id) => {
    const urlVideo = `${BASE_URL}/${id}/videos?${API_KEY}`;
    await axios
      .get(urlVideo)
      .then(result => {
        this.props.headerTrailer({ trailerRes: result.data.results })
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
    if (this.props.data.length === 0) {
      return null
    }
    const {
      backdrop_path, title, genre_ids, id
    } = this.props.data[this.state.currentMovieIndex];
    const bgImage = backdrop_path === null
      ? { backgroundColor: 'rgba(0, 0, 0, 0.4)' }
      : { backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path}` }
    return (
      <>
        {this.state.show
          ? <Modal
            show={this.state.show}
            handleClose={this.hideModal}
          >
            <Trailer trailerKey={this.props.trailerRes[0].key} />
          </Modal>
          : null
        }
        <header className="hero__wrapper" style={bgImage} >
          <div className="hero__content">
            <h1 className="hero__content__title">{title}</h1>
            <div className="hero__content__genres">{genre_ids.map(i => genres[i]).join(' ')}</div>
            <div className="hero__content__btns">
              <button
                className="hero__content__btn hero__content__btn_color"
                onClick={this.showModal}
              >
                WATCH TRAILER
              </button>
              <button className="hero__content__btn">
                <Link to={`/details?id=${id}`}>
                  VIEW INFO
                </Link>
              </button>
              <button className="hero__content__btn hero__content__btn_unborder">+ ADD TO WISHLIST</button>
            </div>
          </div>
        </header >
      </>
    )
  }
}

const mapStateToProps = ({ header }) => {
  return {
    data: header.data,
    trailerRes: header.trailerRes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    headerData: response => dispatch(headerData(response)),
    headerTrailer: response => dispatch(headerTrailer(response))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)

Header.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired),
  trailerRes: PropTypes.arrayOf(PropTypes.object.isRequired),
  headerData: PropTypes.func.isRequired,
  headerTrailer: PropTypes.func.isRequired
}