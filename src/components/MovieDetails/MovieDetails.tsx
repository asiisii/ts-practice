import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMovieData, checkForError } from '../../util/apiCalls'
import { cleanAMovieData } from '../../util/cleanApiData'
import { AMovieState, MovieDetailsProps } from '../../util/dataTypes'

export const MovieDetails: React.FC = () => {
	const params = useParams<MovieDetailsProps>()
	const [aMovie, setAMovie] = useState<AMovieState>()
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
			setAMovie(cleanedData)
		} catch (error) {
			setFetchedError(true)
		}
	}
	return <div>hello</div>
}
