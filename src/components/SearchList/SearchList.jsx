import React from 'react'
import { genres } from '../../genres'
import './SearchList.scss'
import placeholder from '../../assets/images/placeholder.jpg'
import { Link } from 'react-router-dom'
import { ScrollToTop } from '../ScrollToTop/ScrollToTop'

export const SearchList = (props) => {
  return (
    <div className="search" >
      <ScrollToTop />
      <div className="search__wrapper">
        {props.results.map(item => {
          const { title, overview, poster_path,
            genre_ids, vote_average,
            id, release_date
          } = item;
          console.log(item)
          let poster = poster_path === null
            ? { backgroundImage: `url(${placeholder})` }
            : { backgroundImage: `url(https://image.tmdb.org/t/p/w1280${poster_path}` };
          return (
            <Link to={`/details?id=${id}`} key={id}>
              <div className="search__item">
                <h1 className="search__title">{title}</h1>
                <span className="search__rating">
                  <i className="fas fa-star search__rating-big"></i>
                  &nbsp;
                  <strong className="search__rating-big">{vote_average}</strong> / 10
                </span>
                <div className="search__img" style={poster}></div>
                <div className="search__description">
                  <ul>
                    {overview && <li className="search__description__plot">
                      <strong>Plot Summary: </strong>
                      {overview}
                    </li>}
                    {release_date && <li>
                      <strong>Year: </strong>
                      {release_date.slice(0, 4)}
                    </li>}
                    {genre_ids && <li>
                      <strong>Genres: </strong>
                      {genre_ids.map(i => genres[i]).join(' ')}
                    </li>}
                  </ul>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
