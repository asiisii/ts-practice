import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMovieData, checkForError } from '../../util/apiCalls'
import { cleanAMovieData } from '../../util/cleanApiData'
import { AMovieData } from '../../util/dataTypes'

interface MovieDetailsProps {
	id: string
}

export const MovieDetails: React.FC = () => {
	const params = useParams<MovieDetailsProps>()
	const [aMovie, setAMovie] = useState<AMovieData['movie']>()
	const [statusCode, setStatusCode] = useState<number>(200)
	const [fetchedError, setFetchedError] = useState<boolean>(false)

	useEffect(() => {
		getSingleMovieDetails()
	}, [params.id])

	const getSingleMovieDetails = async () => {
		setFetchedError(false)
		try {
			const response = await fetchMovieData(`/${params.id}`)
			setStatusCode(response.status)
			const data = await response.json()

			const cleanedData = cleanAMovieData(data.data)
			console.log(cleanedData)
			// setAMovie(cleanedData)
		} catch (error) {
			setFetchedError(true)
		}
	}
	return <div>{aMovie}</div>
}
