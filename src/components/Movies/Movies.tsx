import React from 'react'
import { MoviePoster } from '../MoviePoster/MoviePoster'

interface MoviesProps {
	movies: {
		id: number
		title: string
		genres: string[]
		path: string
	}[]
}

export const Movies: React.FC<MoviesProps> = ({movies}) => {
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
	return <div>{posters}</div>
}
