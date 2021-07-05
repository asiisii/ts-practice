import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMovieData, checkForError } from '../../util/apiCalls'
import { cleanAMovieData } from '../../util/cleanApiData'
import { AMovieState, MovieDetailsProps } from '../../util/dataTypes'

export const MovieDetails: React.FC = () => {
	const params = useParams<MovieDetailsProps>()
	const [aMovie, setAMovie] = useState<AMovieState>()
	const [statusCode, setStatusCode] = useState<number>(200)
	const [fetchedError, setFetchedError] = useState<boolean>(false)

	useEffect(() => {
		getSingleMovieDetails()
	}, [params.id])

	const getSingleMovieDetails = async () => {
		setFetchedError(false)
		try {
			const response = await fetchMovieData(`/${params.id}`)
			setStatusCode(response.status)
			const data = await response.json()
			const cleanedData = cleanAMovieData(data.data)
			setAMovie(cleanedData)
		} catch (error) {
			setFetchedError(true)
		}
	}

	console.log(aMovie)

	return (
		<section className='MovieDetails'>
			{fetchedError && <h1>{checkForError(statusCode)}</h1>}
			{!aMovie && !fetchedError && <h1>Loading</h1>}
			{aMovie && (
				<>
					<article className='left'>
						<div>
							<img src={aMovie.posterPath} alt={`${aMovie.title} poster img`} />
						</div>
						<div>
							<h1>{aMovie.title}</h1>
							<h2>{aMovie.releaseYear}</h2>
							<h2>{aMovie.duration}</h2>
							<h3>{aMovie.genres}</h3>
							<br />
							<p>{aMovie.description}</p>
							<h3>Top Cast</h3>
							<p>{aMovie.topCast}</p>
						</div>
					</article>
					<div className='right'>
						<img src={aMovie.heroPath} alt={`${aMovie.title} hero img`} />
					</div>
				</>
			)}
		</section>
	)
}
