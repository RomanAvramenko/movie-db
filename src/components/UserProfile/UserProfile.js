import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import placeholder from "../../assets/images/placeholder.jpg";
import {
  readWishList,
  fetchWishList,
  removeFromWishList
} from "../../store/actions/auth";
import "./UserProfile.scss";
import { ScrollToTop } from "../UI/ScrollToTop/ScrollToTop";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const { list, userId, responseList, token } = useSelector(
    state => state.auth
  );

  useEffect(() => {
    dispatch(readWishList(userId));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(fetchWishList(list));
    // eslint-disable-next-line
  }, [list]);

  const renderProfile = (
    <div className="profile">
      <ScrollToTop />
      <div className="profile__wrapper">
        <div className="profile__avatar">
          <img
            src="https://avatars0.githubusercontent.com/u/38329169?s=460&u=edcdad44948e21f363c9e2aa7e895f3d4607368e&v=4"
            alt=""
            className="profile__avatar_img"
          />
          <p className="profile__avatar_name">Roman Avramenko</p>
        </div>
        <div className="profile__container">
          <p className="profile__container_title">Watch list</p>
          <ul className="profile__container__list">
            {responseList.map(item => {
              const {
                title,
                overview,
                poster_path,
                genres,
                vote_average,
                id,
                release_date
              } = item;
              let poster =
                poster_path === null
                  ? { backgroundImage: `url(${placeholder})` }
                  : {
                      backgroundImage: `url(https://image.tmdb.org/t/p/w1280${poster_path}`
                    };
              return (
                <Link to={`/details?id=${id}`} key={id}>
                  <div className="profile__container__item">
                    <h1 className="profile__container__title">{title}</h1>
                    <span className="profile__container__rating">
                      <i className="fas fa-star search__rating-big"></i>
                      &nbsp;
                      <strong className="search__rating-big">
                        {vote_average}
                      </strong>{" "}
                      / 10
                    </span>
                    <div
                      className="profile__container__img"
                      style={poster}
                    ></div>
                    <div className="profile__container__description">
                      <ul>
                        {overview && (
                          <li className="search__description__plot">
                            <strong>Plot Summary: </strong>
                            {overview}
                          </li>
                        )}
                        {release_date && (
                          <li>
                            <strong>Year: </strong>
                            {release_date.slice(0, 4)}
                          </li>
                        )}
                        {genres && (
                          <li>
                            <strong>Genres: </strong>
                            {genres.map(i => i.name).join(" ")}
                          </li>
                        )}
                      </ul>
                    </div>
                    <button
                      className="profile__container__btn button"
                      onClick={e => dispatch(removeFromWishList(userId, id, e))}
                    >
                      Remove
                    </button>
                  </div>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );

  return !token ? <Redirect to="/" /> : renderProfile;
};
