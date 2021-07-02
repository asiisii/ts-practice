import React, { useEffect, useState } from 'react'
import { fetchAllMoviesData, checkForError } from '../../util/apiCalls'
import { cleanAllMoviesData } from '../../util/cleanApiData'
import './App.css'

interface MoviesState {
	movies: {
		id: number
		title: string
		genres: string[]
	}[]
}

const App: React.FC = () => {
	const [allMovies, setAllMovies] = useState<MoviesState['movies']>([])
	const [statusCode, setStatusCode] = useState<number>(200)
	const [fetchedError, setFetchedError] = useState<boolean>(false)
	const [error, setError] = useState<string>('')

	useEffect(() => {
		const getAllMovies = async () => {
			setFetchedError(false)
			try {
				const response = await fetchAllMoviesData()
				setStatusCode(response.status)
				const data = await response.json()
				const cleanedData = cleanAllMoviesData(data.data)
				setAllMovies(cleanedData)
			} catch (error) {
				setFetchedError(true)
			}
		}
		getAllMovies()
	}, [])

	console.log(allMovies)
	return <div className='App'>app</div>
}

export default App
