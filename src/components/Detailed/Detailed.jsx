import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Modal } from "../Modal/Modal";
import { Trailer } from "../Trailer/Trailer";
import { Loading } from "../UI/Loading/Loading";
import { getDetailData } from "../../store/actions/detailInfo";
import { addToWishList } from "../../store/actions/auth";
import "./Detailed.scss";
import placeholder from "../../assets/images/placeholder.jpg";

export const Detailed = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { response, creditsResp, trailerResp, loading } = useSelector(
    (state) => state.detailedInfo
  );
  const { token, userId } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getDetailData(location));
    // eslint-disable-next-line
  }, [location]);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  if (loading) {
    return (
      <div className="detail" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
        <Loading />
      </div>
    );
  }
  if (response) {
    window.scroll(0, 0);
    const {
      id,
      title,
      overview,
      poster_path,
      runtime,
      genres,
      production_companies,
      vote_average,
      backdrop_path,
      production_countries,
      release_date,
    } = response;

    const { crew, cast } = creditsResp;

    const director =
      crew.find((i) => i.job === "Director") === undefined
        ? null
        : crew.find((i) => i.job === "Director").name;

    const poster =
      poster_path === null
        ? { backgroundImage: `url(${placeholder})` }
        : {
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${poster_path})`,
          };

    const backdrop =
      backdrop_path === null
        ? { backgroundColor: "rgba(0, 0, 0, 0.4)" }
        : {
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path})`,
          };

    const actors = cast.slice(0, 8).map((actor) => {
      const picUrl =
        actor.profile_path === null
          ? { backgroundImage: `url(${placeholder})` }
          : {
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${actor.profile_path})`,
            };
      return (
        <li key={actor.id}>
          <figure className="cast__figure">
            <div className="cast__img" style={picUrl}></div>
            <figcaption className="cast__description">{actor.name}</figcaption>
          </figure>
        </li>
      );
    });

    return (
      <section className="detail" style={backdrop}>
        {show && (
          <Modal show={show} handleClose={hideModal}>
            <Trailer trailerKey={trailerResp.results[0].key} />
          </Modal>
        )}
        <div className="detail__wrapper">
          {/* <h1 className="detail__wrapper__title">{title}</h1> */}
          <span className="detail__wrapper__rating">
            <i className="fas fa-star detail__wrapper__rating-big"></i>&nbsp;
            <strong className="detail__wrapper__rating-big">
              {/* {vote_average} */}
            </strong>{" "}
            / 10
          </span>
          <div className="poster" style={poster}></div>
          <div className="description">
            <ul>
              {/* {overview && (
                <li>
                  <strong>Plot Summary: </strong>
                  {overview}
                </li>
              )}
              {runtime && (
                <li>
                  <strong>Duration: </strong>
                  {Math.floor(runtime / 60)} hours {runtime % 60} minutes
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
                  {genres.map((i) => i.name).join(" ")}
                </li>
              )}
              {production_companies && (
                <li>
                  <strong>Production Co: </strong>
                  {production_companies
                    .slice(0, 4)
                    .map((i) => i.name)
                    .join(", ")}
                </li>
              )}
              {production_countries && (
                <li>
                  <strong>Production Country: </strong>
                  {production_countries.map((i) => i.name).join(", ")}
                </li>
              )} */}
              {/* {director && (
                <li>
                  <strong>Directed by: </strong>
                  {director}
                </li>
              )} */}
              <li>
                <strong>Cast:</strong>
                <ul className="cast">{actors}</ul>
              </li>
            </ul>
            <div className="description__btngroup">
              {/* {token && (
                <button
                  className="description__btngroup__btn"
                  onClick={(e) => {
                    dispatch(addToWishList(userId, id, e));
                  }}
                >
                  + wishlist
                </button>
              )} */}
              {/* {trailerResp.results.length === 0 ? null : (
                <button
                  className="description__btngroup__btn"
                  onClick={showModal}
                >
                  Watch Trailer
                </button>
              )} */}
            </div>
          </div>
        </div>
      </section>
    );
  }
};
