import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Modal } from '../Modal/Modal'
import { genres } from '../../genres'
import { Trailer } from '../Trailer/Trailer'
import { connect } from 'react-redux'
import { getData, getVideo } from '../../store/actions/header'
import "./Header.scss"

class Header extends Component {

  state = {
    currentMovieIndex: 1,
    show: false
  }

  componentDidMount() {
    this.props.getData(this.state.currentMovieIndex)
    this.intervalId = setInterval(this.timer, 7000);
  }

  componentDidUpdate() {
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

  showModal = () => {
    this.setState({ show: true });
    this.props.getVideo(this.props.data[this.state.currentMovieIndex].id)
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
    const trailer = Math.floor(Math.random() * (this.props.trailerRes.length - 1))
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
            <Trailer trailerKey={this.props.trailerRes[trailer].key} />
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
    trailerRes: header.trailerRes,
    loading: header.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getData: id => dispatch(getData(id)),
    getVideo: id => dispatch(getVideo(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)

Header.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired),
  trailerRes: PropTypes.arrayOf(PropTypes.object.isRequired),
  getData: PropTypes.func.isRequired,
}