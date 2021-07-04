import React, { useEffect, useState } from 'react'
import { MoviesState } from '../../util/dataTypes'
import { fetchAllMoviesData, checkForError } from '../../util/apiCalls'
import { cleanAllMoviesData } from '../../util/cleanApiData'
import { Movies } from '../Movies/Movies'
import { Navbar } from '../Navbar/Navbar'
import { Filter } from '../Filter/Filter'
import './Home.css'

export const Home: React.FC = () => {
	const [allMovies, setAllMovies] = useState<MoviesState['movies']>([])
	const [statusCode, setStatusCode] = useState<number>(200)
	const [fetchedError, setFetchedError] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [filteredBySearch, setFilteredBySearch] = useState<
		MoviesState['movies']
	>([])
	const [genre, setGenre] = useState('')
	const [filteredByGenres, setFilteredByGenres] = useState<
		MoviesState['movies']
	>([])

	// ~~~ Invokes the fetch call on load & assigns data to states ~~~
	useEffect(() => {
		getAllMovies()
	}, [])

	// ~~~ Invokes the fetch call on load & assigns data to states ~~~
	const getAllMovies = async () => {
		setFetchedError(false)
		try {
			const response = await fetchAllMoviesData()
			setStatusCode(response.status)
			const data = await response.json()
			const cleanedData = cleanAllMoviesData(data)
			setAllMovies(cleanedData)
		} catch (error) {
			setFetchedError(true)
		}
	}

	// ~~~ filters the movie data by searched query & assigns data to states ~~~
	const filterMovies = (query: string) => {
		setError('')
		let filteredResults: MoviesState['movies']

		if (query) {
			filteredResults = allMovies.filter(movie =>
				movie.title.toLowerCase().includes(query)
			)
			if (!filteredResults.length) {
				setError('No movies found.')
			}
		} else {
			filteredResults = []
		}
		setFilteredBySearch(filteredResults)
	}

	const handleGenresOptionChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setGenre(e.target.value)
		filterByGenres(e.target.value)
	}

	// ~~~ Generates select options for genres ~~~
	const generateGenresOptions = () => {
		let genresList: string[] = []
		allMovies.forEach(movie =>
			movie.genres.forEach(genre => {
				if (!genresList.includes(genre)) {
					genresList.push(genre)
				}
			})
		)
		return (
			<select
				className='options'
				defaultValue=''
				onChange={e => handleGenresOptionChange(e)}
			>
				<option value='' disabled>
					Select language
				</option>
				<option className='select-items' value='all'>
					All
				</option>
				{genresList.map((genre, i) => {
					return (
						<option className='select-items' key={i} value={genre}>
							{genre}
						</option>
					)
				})}
			</select>
		)
	}

	// ~~~ filters the movie data by genres & assigns data to states ~~~
	const filterByGenres = (type: string) => {
		let filteredResults: MoviesState['movies']

		if (genre === 'all') {
			filteredResults = allMovies
		} else {
			filteredResults = allMovies.filter(movie => movie.genres.includes(type))
			console.log(filteredResults, `genres`)
		}

		setFilteredByGenres(filteredResults)
	}

	// ~~~ Returns the proper movie data depending on the condition ~~~
	const selectMoviesData = () => {
		if (filteredBySearch.length && !filteredByGenres.length) {
			return filteredBySearch
		} else if (!filteredBySearch.length && filteredByGenres.length) {
			return filteredByGenres
		} else if (filteredBySearch.length && filteredByGenres.length) {
			const comboFilteredMovies = filteredBySearch.filter(searchedMovie =>
				filteredByGenres.filter(
					selectedGenreMovie => searchedMovie === selectedGenreMovie
				)
			)
			return comboFilteredMovies
		} else {
			return allMovies
		}
	}

	return (
		<main>
			<Navbar />
			<Filter
				filterMovies={filterMovies}
				generateGenresOptions={generateGenresOptions}
			/>
			<section className='movies'>
				<h1>
					{filteredBySearch.length ||
					filteredByGenres.length ||
					error === 'No movies found.'
						? 'Search Results'
						: 'All Movies'}
				</h1>
				<h3>{error === 'No movies found.' ? error : null}</h3>
				{fetchedError && checkForError(statusCode)}
				{(allMovies.length ||
					filteredBySearch.length ||
					filteredByGenres.length) &&
				!fetchedError &&
				!error ? (
					<Movies movies={selectMoviesData()} />
				) : null}
			</section>
		</main>
	)
}
