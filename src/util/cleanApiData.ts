import { MoviesState as MoviesData, AMovieApiData, Chars } from './dataTypes'

//~~~ Returns movies data after iterating through all movies data ~~~
export const cleanAllMoviesData = (moviesData: MoviesData['movies']) => {
	const cleanedMoviesData = moviesData.map(movie => {
		const file = tryRequire(`./assets/moviePosterImages/${movie.id}.jpeg`)
			? true
			: false

		const moviePoster: string = `/assets/moviePosterImages/${movie.id}.jpeg`
		const defaultPoster: string = `/assets/moviePosterImages/defaultImage.jpeg`

		return {
			id: movie.id,
			title: movie.title,
			genres: movie.genres,
			path: file ? moviePoster : defaultPoster,
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
	const heroPath = tryRequire(`./assets/movieHeroImages/${aMovieData.id}.jpeg`)
		? true
		: false
	const posterPath = tryRequire(
		`./assets/moviePosterImages/${aMovieData.id}.jpeg`
	)
		? true
		: false
	const movieGenres = aMovieData.genres.join(' | ')
	const displayDuration = formateSecsToTime(aMovieData.duration)
	const movieHero: string = `/assets/movieHeroImages/${aMovieData.id}.jpeg`
	const defaultHero: string = `/assets/movieHeroImages/defaultImage.jpeg`
	const moviePoster: string = `/assets/moviePosterImages/${aMovieData.id}.jpeg`
	const defaultPoster: string = `/assets/moviePosterImages/defaultImage.jpeg`
	const topCastNamnes = formateTopCast(aMovieData.topCast)
	return {
		id: aMovieData.id,
		title: aMovieData.title,
		releaseYear: aMovieData.releaseYear,
		duration: displayDuration,
		genres: movieGenres,
		description: aMovieData.description,
		topCast: topCastNamnes,
		heroPath: heroPath ? movieHero : defaultHero,
		posterPath: posterPath ? moviePoster : defaultPoster,
	}
}

// ~~~ Converts seconds arguments to hh:mm:ss format
const formateSecsToTime = (seconds: number) => {
	const hr = Math.floor(seconds / 3600)
	const min = Math.floor((seconds % 3600) / 60)
	const formattedHr = hr > 0 ? hr + (hr === 1 ? 'hr' : 'hrs') : ''
	const formattedMin = min > 0 ? ':' + min + (min === 1 ? 'min' : 'mins') : ''

	return `${formattedHr}${formattedMin}`
}

// ~~~ Converts top cast array to string format
const formateTopCast = (chars: Chars) => {
	console.log(chars)
	const names = chars.map(char => char.name)
	return names.join(' | ')
}
