import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchMovieData, checkForError } from '../../util/apiCalls'
import { cleanAMovieData } from '../../util/cleanApiData'
import { AMovieState, MovieDetailsProps } from '../../util/dataTypes'
import backbtn from '../../util/assets/back-button.png'
import './MovieDetails.css'
import { Navbar } from '../Navbar/Navbar'
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
      <Navbar/>
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

// ;<main className='movie-detail'>
// 	<section className='movie-card__details'>
// 		<div className='movie-info'>
// 			<img src={poster} className='movie-card__details__poster' alt={title} />
// 			<h2 className='movie-card__details__title'>{title}</h2>
// 			<h3 className='movie-card__details__date'>{releaseDate}</h3>
// 			<div
// 				className='movie-card__details__rating fa fa-star'
// 				style={ratingStyle}
// 			/>
// 			<br />
// 			<p className='movie-card__details__tagline'>{tagline}</p>
// 			<p className='movie-card__details__run-time'>{runtime} min</p>
// 			<p className='movie-card__details__genre'>{genres}</p>
// 			<p className='movie-card__details__overview'>{overview}</p>
// 			{trailerKey && (
// 				<button
// 					className='movie-card__details__btn'
// 					onClick={this.toggleTrailer}
// 				>
// 					<BsPlayFill className='icon' />
// 					Watch Trailer
// 				</button>
// 			)}
// 		</div>
// 	</section>
// 	<div className='movie-backdrop'>
// 		<img className='movie-backdrop__image' src={backdrop} alt={title} />
// 	</div>
// </main>
