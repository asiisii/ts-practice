export interface MoviesState {
	movies: {
		id: number
		title: string
		genres: string[]
		path: string
	}[]
}

export interface AMovieApiData {
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

export interface AMovieState {
	id: string
	title: string
	releaseYear: number
	duration: string
	genres: string
	description: string
	topCast: {
		name: string
		characterName: string
	}[]
}

export interface MovieDetailsProps {
	id: string
}
