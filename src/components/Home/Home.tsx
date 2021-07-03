import React, { useEffect, useState } from 'react'
import { MoviesState } from '../../util/dataTypes'
import { fetchAllMoviesData, checkForError } from '../../util/apiCalls'
import { cleanAllMoviesData } from '../../util/cleanApiData'


// interface MoviesState {
// 	movies: {
// 		id: number
// 		title: string
// 		genres: string[]
// 		img: string
// 		value: number
// 	}[]
// }


export const Home: React.FC = () => {
	const [allMovies, setAllMovies] = useState<MoviesState['movies']>([])
	const [statusCode, setStatusCode] = useState<number>(200)
	const [fetchedError, setFetchedError] = useState<boolean>(false)
	const [error, setError] = useState<string>('')

	// ~~~ Invokes the fetch call on load & assigns data to states ~~~
	useEffect(() => {
		getAllMovies()
	}, [])

	const getAllMovies = async () => {
		setFetchedError(false)
		try {
			const response = await fetchAllMoviesData()
			setStatusCode(response.status)
			const data = await response.json()
			// console.log(data);
			const cleanedData = cleanAllMoviesData(data)
			// console.log(cleanedData)
			setAllMovies(cleanedData)
		} catch (error) {
			setFetchedError(true)
		}
	}
	return <div>home</div>
}
