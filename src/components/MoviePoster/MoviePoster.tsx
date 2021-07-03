import React from 'react'
import { Link } from 'react-router-dom'

interface MoviePosterProps {
  key:number
  id: number
  title: string
  genres:string[]
  path: string
}

export const MoviePoster: React.FC<MoviePosterProps> = ({id, title, genres, path}) => {
  console.log(id);
  
  return (
		<div>
			<Link to={`/${id}`}>
				<img src={path} alt={`${title} poster`} />
				<h1>{title}</h1>
			</Link>
		</div>
	)
}