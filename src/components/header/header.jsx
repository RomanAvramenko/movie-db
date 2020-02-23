import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal } from '../Modal/Modal'
import { genres } from '../../genres'
import { Trailer } from '../Trailer/Trailer';
import "./Header.scss";
import { useDispatch, useSelector } from 'react-redux';
import { headerData, headerTrailer } from '../../store/actions/header';

export const Header = () => {

  const API_KEY = `api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
  const BASE_URL = 'https://api.themoviedb.org/3/movie';

  const [show, setShow] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(1)
  const dispatch = useDispatch()
  const { data, trailerRes } = useSelector(state => state.header)

  useEffect(() => {
    getData()
    const intervalId = setInterval(timer, 7000);
    if (show) {
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line
  }, [])

  const timer = () => {
    setCurrentIndex(Math.floor(Math.random() * 19))
  }

  const getData = async () => {
    const url = `${BASE_URL}/popular?${API_KEY}&language=en-US&page=1`;
    await axios
      .get(url)
      .then(result => {
        dispatch(headerData({ data: result.data.results }))
        getVideo(result.data.results[currentIndex].id)
      })
      .catch(e => { console.log(e.config) });
  }

  const getVideo = async (id) => {
    const urlVideo = `${BASE_URL}/${id}/videos?${API_KEY}`;
    await axios
      .get(urlVideo)
      .then(result => {
        dispatch(headerTrailer({ trailerRes: result.data }))
      })
      .catch(e => { console.log(e.config) })
  }

  const showModal = () => setShow(true);

  const hideModal = () => setShow(!show);


  if (!data[currentIndex]) {
    return null
  }
  const {
    backdrop_path, title, genre_ids, id
  } = data[currentIndex];
  const bgImage = backdrop_path === null
    ? { backgroundColor: 'rgba(0, 0, 0, 0.4)' }
    : { backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path}` }
  return (
    <>
      {show
        ? <Modal
          show={show}
          handleClose={hideModal}
        >
          <Trailer trailerKey={trailerRes.results[0].key} />
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
              onClick={showModal}
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
