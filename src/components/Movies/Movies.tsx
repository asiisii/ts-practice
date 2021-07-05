import React from 'react'
import { MoviePoster } from '../MoviePoster/MoviePoster'
import { MoviesState as MoviesProps } from '../../util/dataTypes'
import './Movies.css'

// ~~~ Passes down the each movie data to moviePoster and displays it inside the div~~~
export const Movies: React.FC<MoviesProps> = ({ movies }) => {
	const posters = movies.map(movie => {
		return (
			<MoviePoster
				key={movie.id}
				id={movie.id}
				title={movie.title}
				genres={movie.genres}
				path={movie.path}
			/>
		)
	})
	return <div className='Movies'>{posters}</div>
}
