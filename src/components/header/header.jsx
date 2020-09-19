import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../Modal/Modal";
import { genres } from "../../genres";
import { Trailer } from "../Trailer/Trailer";
import { useDispatch, useSelector } from "react-redux";
import { getData, getVideo } from "../../store/actions/header";
import { addToWishList } from "../../store/actions/auth";
import "./Header.scss";

export const Header = () => {
  const [show, setShow] = useState(false);
  const [movieIndex, setMovieIndex] = useState(1);
  const dispatch = useDispatch();
  const {
    header: { data, trailerRes },
    auth: { token, userId },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getData(movieIndex));
    const intervalId = setInterval(timer, 7000);
    if (show === true) {
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line
  }, [show]);

  const timer = () => setMovieIndex(Math.floor(Math.random() * 19));

  const showModal = () => {
    setShow(true);
    dispatch(getVideo(data[movieIndex].id));
  };

  const hideModal = () => setShow(false);

  if (data.length === 0) {
    return null;
  }
  const { backdrop_path, title, genre_ids, id } = data[movieIndex];
  const trailer = Math.floor(Math.random() * (trailerRes.length - 1));
  const bgImage =
    backdrop_path === null
      ? { backgroundColor: "rgba(0, 0, 0, 0.4)" }
      : {
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path}`,
        };
  return (
    <>
      {show ? (
        <Modal show={show} handleClose={hideModal}>
          <Trailer trailerKey={trailerRes[trailer].key} />
        </Modal>
      ) : null}
      <header className="hero__wrapper" style={bgImage}>
        <div className="hero__content">
          <h1 className="hero__content__title">{title}</h1>
          <div className="hero__content__genres">
            {genre_ids.map((i) => genres[i]).join(" ")}
          </div>
          <div className="hero__content__btns">
            <button
              className="hero__content__btn hero__content__btn_color"
              onClick={showModal}
            >
              WATCH TRAILER
            </button>
            <button className="hero__content__btn">
              <Link to={`/details?id=${id}`}>VIEW INFO</Link>
            </button>
            {token && (
              <button
                className="hero__content__btn hero__content__btn_unborder"
                onClick={(e) => {
                  dispatch(addToWishList(userId, data[movieIndex].id, e));
                }}
              >
                + ADD TO WISHLIST
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
