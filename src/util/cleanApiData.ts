type MoviesData = {
	id: number
	title: string
	genres: string[]
}[]

type aMovieData = {
	id: string
	title: string
	releaseYear: number
	duration: number
	genres: string[]
	descritpion: string
	topCast: {
		name: string
		characterName: string
	}[]
}

export const cleanAllMoviesData = (moviesData: MoviesData) => {
	const cleanedMoviesData = moviesData.map(movie => {
		return {
			id: movie.id,
      title: movie.title,
      genres: movie.genres
		}
	})
	return cleanedMoviesData
}

export const cleanAMovieData = (amovieData: aMovieData) => {}