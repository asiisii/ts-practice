export interface MoviesState {
	movies: {
		id: number
		title: string
		genres: string[]
		path: string
	}[]
}

export interface AMovieData {
	movie: {
		id: string
		title: string
		releaseYear: number
		duration: number
		genres: string[]
		description: string
		topCast: {
			name: string
			characterName: string
		}[]
	}
}
