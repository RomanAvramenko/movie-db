import React from 'react'
import { genres } from '../../genres'
import placeholder from '../../assets/images/placeholder.jpg'
import './TileItem.scss'
import { Link } from 'react-router-dom'

export const TileItem = ({ results }) => {
	return (
		<div className="tile">
			{results.map(item => {
				const { id, poster_path, title, genre_ids, vote_average, release_date } = item;
				let poster = poster_path === null
					? { backgroundImage: `url(${placeholder})` }
					: { backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster_path}` };
				return (
					<Link to={`/details?id=${id}`}
						key={id}
					>
						<div className="tile-item">
							<div className="tile-item__pic">
								<div style={poster}></div>
							</div>
							<div className="tile-item__discription">
								<div className="tile-item__desc">
									<div className="tile-item__title">{title}</div>
									<div className="tile-item__genres">{genre_ids.map(i => genres[i]).join(' ')}</div>
								</div>
							</div>
							<div className="tile-item__ratio"><i className="fas fa-star"></i>&nbsp;{vote_average}</div>
							<div className="tile-item__year">{release_date.slice(0, 4)}</div>
						</div>
					</Link>
				)
			})}
		</div>
	)
}