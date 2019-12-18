import React from 'react'

import './tile-item.scss'

export const TileItem = ({ results }) => {
    return (
        <div className="tile">
            {results.map(item => {
                return (
                    <div className="tile-item" key={item.id}>
                        <div className="tile-item__pic">
                            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
                        </div>
                        <div className="tile-item__discription">
                            <div className="tile-item__desc">
                                <div className="tile-item__title">{item.title}</div>
                                <div className="tile-item__genres">Action, Adventure, Fantasy</div>
                            </div>
                        </div>
                        <div className="tile-item__ratio">Ratio: {item.vote_average}</div>
                    </div>
                )
            })}
        </div>
    )
}