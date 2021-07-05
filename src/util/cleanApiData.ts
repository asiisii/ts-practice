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
	console.log(aMovieData)
	const movieGenres = aMovieData.genres.join(' | ')
	const time = new Date(aMovieData.duration * 1000).toISOString().substr(11, 8)
	console.log(time)
	const givenSecs = aMovieData.duration
	var hr = Math.floor(givenSecs / 3600)
	var min = Math.floor((givenSecs % 3600) / 60)
	var sec = Math.floor((givenSecs % 3600) % 60)

	var formattedHr = hr > 0 ? hr + (hr === 1 ? 'hr' : 'hrs') : ''
	let formattedMin = min > 0 ? ':' + min + (min === 1 ? 'min' : 'mins') : ''
	var formattedSec =
		(sec > 0 ? ':' + sec + (sec === 1 ? 'sec' : 'secs') : '') || (sec < 1 && '')
	const displayDuration = `${formattedHr}${formattedMin}${formattedSec}`

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
