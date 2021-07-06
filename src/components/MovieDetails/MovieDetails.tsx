import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchMovieData, checkForError } from '../../util/apiCalls'
import { AMovieState, MovieDetailsProps } from '../../util/dataTypes'
import { cleanAMovieData } from '../../util/cleanApiData'
import backbtn from '../../util/assets/back-button.png'
import { Navbar } from '../Navbar/Navbar'
import './MovieDetails.css'

// ~~~ Displays the movie details ~~~
export const MovieDetails: React.FC = () => {
	const params = useParams<MovieDetailsProps>()
	const [aMovie, setAMovie] = useState<AMovieState>()
	const [statusCode, setStatusCode] = useState<number>(200)
	const [fetchedError, setFetchedError] = useState<boolean>(false)

	useEffect(() => {
		getSingleMovieDetails()
	}, [params.id])

	// ~~~ Fetches the movie details data and assigns it to the state ~~~
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

	return (
		<main className='MovieDetails'>
			<Navbar />
			<Link to='/'>
				<img src={backbtn} alt='back-button' className='back-btn' />
			</Link>
			{fetchedError && <h1>{checkForError(statusCode)}</h1>}
			{!aMovie && !fetchedError && <h1>Loading</h1>}
			{aMovie && (
				<div className='details-section'>
					<article className='left'>
						<div className='top'>
							<div className='poster-img-wrapper'>
								<img
									src={aMovie.posterPath}
									alt={`${aMovie.title} poster img`}
								/>
							</div>
							<div className='info'>
								<h1 className='movie-title'>{aMovie.title}</h1>
								<h2 className='release-year'>{aMovie.releaseYear}</h2>
								<h2 className='duration'>{aMovie.duration}</h2>
								<h3 className='genres'>{aMovie.genres}</h3>
								<br />
							</div>
						</div>
						<div className='bottom'>
							<h3>Description</h3>
							<p className='description'>{aMovie.description}</p>
							<h3>Top Cast</h3>
							<p className='top-cast'>{aMovie.topCast}</p>
						</div>
					</article>
					<div className='right'>
						<img
							className='poster'
							src={aMovie.heroPath}
							alt={`${aMovie.title} hero img`}
						/>
					</div>
				</div>
			)}
		</main>
	)
}
