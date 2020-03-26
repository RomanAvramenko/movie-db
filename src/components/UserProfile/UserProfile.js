import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import placeholder from "../../assets/images/placeholder.jpg";
import { readWishList, fetchWishList } from "../../store/actions/auth";
import "./UserProfile.scss";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const { list, userId, responseList } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(readWishList(userId));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(fetchWishList(list));
    // eslint-disable-next-line
  }, [list]);

  return (
    <div className="profile">
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
                  <div className="search__item">
                    <h1 className="search__title">{title}</h1>
                    <span className="search__rating">
                      <i className="fas fa-star search__rating-big"></i>
                      &nbsp;
                      <strong className="search__rating-big">
                        {vote_average}
                      </strong>{" "}
                      / 10
                    </span>
                    <div className="search__img" style={poster}></div>
                    <div className="search__description">
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
                  </div>
                </Link>
              );
              /* return <li className="profile__container__list_item">lorem</li>; */
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
