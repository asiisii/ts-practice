import React from 'react'
import { Link } from 'react-router-dom'

interface MoviePosterProps {
	key: number
	id: number
	title: string
	genres: string[]
	path: string
}

// ~~~ Displays all the movie posters with its title"
export const MoviePoster: React.FC<MoviePosterProps> = ({
	id,
	title,
	path,
}) => {
	return (
		<div className='MoviePoster'>
			<Link to={`/${id}`}>
				<img src={path} alt={`${title} poster`} />
				<h1 className='movie-title'>{title}</h1>
			</Link>
		</div>
	)
}
