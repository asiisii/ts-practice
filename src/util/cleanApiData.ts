type MoviesData = {
	id: number
	title: string
	genres: string[]
  img: string
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
// ~~~ Returns movies data after iterating through all movies data ~~~
export const cleanAllMoviesData = (moviesData: MoviesData) => {
	const cleanedMoviesData = moviesData.map(movie => {
    const moviePoster:string = `/assets/moviePosterImages/${movie.id}.jpeg` 
		return {
			id: movie.id,
      title: movie.title,
      genres: movie.genres,
      img: moviePoster
		}
	})
	return cleanedMoviesData
}
// ~~~ Returns only necessary data of clicked movie poster ~~~
export const cleanAMovieData = (amovieData: aMovieData) => {}