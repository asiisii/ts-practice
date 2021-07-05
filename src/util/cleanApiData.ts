import { MoviesState as MoviesData, AMovieData } from './dataTypes'

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
export const cleanAMovieData = (aMovieData: AMovieData['movie']) => {
  console.log(aMovieData);
  return {
    title: aMovieData.title
  }
}
