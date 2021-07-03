export interface MoviesState {
	movies: {
		id: number
		title: string
		genres: string[]
		path: string
	}[]
}
