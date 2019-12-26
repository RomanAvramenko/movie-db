import React from 'react'
import { genres } from '../../genres'

import './TileItem.scss'
import { Link } from 'react-router-dom'

export const TileItem = ({ results }) => {
    return (
        <div className="tile">
            {results.map(item => {
                const { id, poster_path, title, genre_ids, vote_average } = item
                return (
                    <Link to={{
                        pathname: "/details",
                        state: { id }
                    }}
                        key={id}
                    >
                        <div className="tile-item">
                            <div className="tile-item__pic">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                                    alt={`./images/alt.jpg`}
                                />
                            </div>
                            <div className="tile-item__discription">
                                <div className="tile-item__desc">
                                    <div className="tile-item__title">{title}</div>
                                    <div className="tile-item__genres">{genre_ids.map(i => genres[i]).join(' ')}</div>
                                </div>
                            </div>
                            <div className="tile-item__ratio">Ratio: {vote_average}</div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}