import React from 'react'
import { Link } from 'react-router-dom'

interface MoviePosterProps {
	key: number
	id: number
	title: string
	genres: string[]
	path: string
}

export const MoviePoster: React.FC<MoviePosterProps> = ({
	id,
	title,
	path,
}) => {
	const defaultSrc = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		// console.log(`original`)
		if (e.target) {
			console.log(e.target)
		}

		// e.target.src = `/assets/moviePosterImages/defaultImage.jpeg`

		// console.log('changed')
		// console.log(e.target.src)
		// console.log(`-------------`)
	}

	return (
		<div className='MoviePoster'>
			<Link to={`/${id}`}>
				<img onError={e => defaultSrc(e)} src={path} alt={`${title} poster`} />
				<h1 className='movie-title'>{title}</h1>
			</Link>
		</div>
	)
}
