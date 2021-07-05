import { MoviesState as MoviesData, AMovieApiData } from './dataTypes'

//~~~ Returns movies data after iterating through all movies data ~~~
export const cleanAllMoviesData = (moviesData: MoviesData['movies']) => {
	const cleanedMoviesData = moviesData.map(movie => {
		const header = tryRequire(`./assets/moviePosterImages/${movie.id}.jpeg`)
			? true
			: false

		const moviePoster: string = `/assets/moviePosterImages/${movie.id}.jpeg`
		const defaultPoster: string = `/assets/moviePosterImages/defaultImage.jpeg`

		return {
			id: movie.id,
			title: movie.title,
			genres: movie.genres,
			path: header ? moviePoster : defaultPoster,
		}
	})

	return cleanedMoviesData
}

//~~~ Takes in the path and checks if the path exists or not ~~~
const tryRequire = (path: string) => {
	try {
		return require(`${path}`)
	} catch (err) {
		return null
	}
}

// ~~~ Returns only necessary data of clicked movie poster ~~~
export const cleanAMovieData = (aMovieData: AMovieApiData) => {
	const movieGenres = aMovieData.genres.join(' | ')
	const displayDuration = formateSecsToTime(aMovieData.duration)

	return {
		id: aMovieData.id,
		title: aMovieData.title,
		releaseYear: aMovieData.releaseYear,
		duration: displayDuration,
		genres: movieGenres,
		description: aMovieData.description,
		topCast: aMovieData.topCast,
	}
}

// ~~~ Converts seconds arguments to hh:mm:ss format
const formateSecsToTime = (seconds: number) => {
	const hr = Math.floor(seconds / 3600)
	const min = Math.floor((seconds % 3600) / 60)
	const sec = Math.floor((seconds % 3600) % 60)

	const formattedHr = hr > 0 ? hr + (hr === 1 ? 'hr' : 'hrs') : ''
	const formattedMin = min > 0 ? ':' + min + (min === 1 ? 'min' : 'mins') : ''
	const formattedSec =
		(sec > 0 ? ':' + sec + (sec === 1 ? 'sec' : 'secs') : '') || (sec < 1 && '')

	return `${formattedHr}${formattedMin}${formattedSec}`
}
