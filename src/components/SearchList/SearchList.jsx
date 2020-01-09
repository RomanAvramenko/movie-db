import React from 'react'

export const SearchList = (props) => {
	return (
		<React.Fragment>
			{props.results.map(item => {
				const { title, overview, poster_path,
					genre_ids, vote_average,
					id, release_date
				} = item;
				const poster = { backgroundImage: `url(https://image.tmdb.org/t/p/w1280${poster_path}` }
				return (
					<div key={id}>
						<h1 >{title}</h1>
						<span>
							<i></i>&nbsp;<strong>{vote_average}</strong> / 10
                        </span>
						<div style={poster}></div>
						<div>
							<ul>
								<li>
									<p>
										<strong>Plot Summary: </strong>
										{overview}
									</p>
								</li>
								<li>
									<p>
										<strong>Year: </strong>
										{release_date}
									</p>
								</li>
								<li>
									<p>
										<strong>Genres: </strong>
										{genre_ids.map(i => i.name).join(' ')}
									</p>
								</li>
							</ul>
						</div>
					</div>
				)
			})}
		</React.Fragment>
	)
}
