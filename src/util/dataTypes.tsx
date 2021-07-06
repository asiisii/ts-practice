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


export interface FilterProps {
	searchText: string
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	generateGenresOptions: () => JSX.Element
}

export interface AMovieState {
	id: string
	title: string
	releaseYear: number
	duration: string
	genres: string
	description: string
	topCast: string
	heroPath: string
	posterPath: string
}

export interface MovieDetailsProps {
	id: string
}

export type Chars = {
	name: string
	characterName: string
}[]
