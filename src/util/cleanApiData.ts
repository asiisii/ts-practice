type MoviesData = {
	id: number
	title: string
	genres: string[]
}[]


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