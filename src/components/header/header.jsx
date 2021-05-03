import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel";
import { Modal } from "../Modal/Modal";
import { genres } from "../../genres";
import { Trailer } from "../Trailer/Trailer";
import { getVideo } from "../../store/actions/header";
import { addToWishList } from "../../store/actions/auth";
import "./Header.scss";
import "pure-react-carousel/dist/react-carousel.es.css";

export const Header = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { data, trailerRes } = useSelector((state) => state.header);
  const { token, userId } = useSelector((state) => state.auth);

  const showModal = (id) => {
    setShow(true);
    dispatch(getVideo(id));
  };

  const hideModal = () => {
    setShow(false);
    if (data.length === 0) {
      return null;
    }
  };

  const render = data.data.map((i, idx) => (
    <Slide index={idx} key={i.id}>
      <Image src={`https://image.tmdb.org/t/p/w1280${i.backdrop_path}`} />
      <div className="hero__content">
        <h1 className="hero__content__title">{i.title}</h1>
        <div className="hero__content__genres">
          {i.genre_ids.map((i) => genres[i]).join(" ")}
        </div>
        <div className="hero__content__btns">
          <button
            className="hero__content__btn hero__content__btn_color"
            onClick={() => showModal(i.id)}
          >
            WATCH TRAILER
          </button>
          <button className="hero__content__btn">
            <Link to={`/details?id=${i.id}`}>VIEW INFO</Link>
          </button>
          {token && (
            <button
              className="hero__content__btn hero__content__btn_unborder"
              onClick={(e) => {
                dispatch(addToWishList(userId, i.id, e));
              }}
            >
              + ADD TO WISHLIST
            </button>
          )}
        </div>
      </div>
    </Slide>
  ));

  return (
    <>
      {show ? (
        <Modal show={show} handleClose={hideModal}>
          <Trailer trailerKey={trailerRes.trailerRes[0].key} />
        </Modal>
      ) : null}
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={60}
        totalSlides={data.data.length}
        visibleSlides={1}
      >
        <Slider>{render}</Slider>
        <ButtonBack className="buttonBack">
          <i className="fas fa-chevron-left"></i>
        </ButtonBack>
        <ButtonNext className="buttonNext">
          <i className="fas fa-chevron-right"></i>
        </ButtonNext>
      </CarouselProvider>
    </>
  );
};

/* const bgImage =
        i.backdrop_path === null
          ? { backgroundColor: "rgba(0, 0, 0, 0.4)" }
          : {
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280${i.backdrop_path}`,
            }; */

//first template

/* {show ? (
        <Modal show={show} handleClose={hideModal}>
          <Trailer trailerKey={trailerRes.trailerRes[trailer].key} />
        </Modal>
      ) : null} 
       <header className="hero__wrapper" style={bgImage}>
        <div key={id}>
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
                    dispatch(
                      addToWishList(userId, data.data[movieIndex].id, e)
                    );
                  }}
                >
                  + ADD TO WISHLIST
                </button>
              )}
            </div>
          </div>
        </div>
      </header> */

//second template

/* <header className="hero__wrapper" style={bgImage}>
            <div>
              <div className="hero__content">
                <h1 className="hero__content__title">{i.title}</h1>
                <div className="hero__content__genres">
                  {i.genre_ids.map((i) => genres[i]).join(" ")}
                </div>
                <div className="hero__content__btns">
                  <button
                    className="hero__content__btn hero__content__btn_color"
                    onClick={showModal}
                  >
                    WATCH TRAILER
                  </button>
                  <button className="hero__content__btn">
                    <Link to={`/details?id=${i.id}`}>VIEW INFO</Link>
                  </button>
                  {token && (
                    <button
                      className="hero__content__btn hero__content__btn_unborder"
                      onClick={(e) => {
                        dispatch(addToWishList(userId, data.data[i].id, e));
                      }}
                    >
                      + ADD TO WISHLIST
                    </button>
                  )}
                </div>
              </div>
            </div>
          </header> */
