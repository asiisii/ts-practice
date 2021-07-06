import React, { useEffect, useState } from 'react'
import { MoviesState } from '../../util/dataTypes'
import { fetchMovieData, checkForError } from '../../util/apiCalls'
import { cleanAllMoviesData } from '../../util/cleanApiData'
import { Movies } from '../Movies/Movies'
import { Navbar } from '../Navbar/Navbar'
import { Filter } from '../Filter/Filter'
import './Home.css'

// ~~~ Displays all the onload elements ~~~
export const Home: React.FC = () => {
	const [allMovies, setAllMovies] = useState<MoviesState['movies']>([])
	const [statusCode, setStatusCode] = useState<number>(200)
	const [fetchedError, setFetchedError] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [searchText, setSearchText] = useState('')
	const [filteredBySearch, setFilteredBySearch] = useState<
		MoviesState['movies']
	>([])
	const [genre, setGenre] = useState('')
	const [filteredByGenres, setFilteredByGenres] = useState<
		MoviesState['movies']
	>([])

	// ~~~ Invokes the fetch call on load & assigns data to states ~~~
	useEffect(() => {
		const getAllMovies = async () => {
			setFetchedError(false)
			try {
				const response = await fetchMovieData('/')
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

	// ~~~ filters the movie data by searched query & assigns data to states ~~~
	const filterMovies = (query: string) => {
		setError('')
		selectMoviesData()
		let filteredResults: MoviesState['movies'] = []

		if (query) {
			if (!genre) {
				filteredResults = allMovies.filter(movie =>
					movie.title.toLowerCase().includes(query)
				)
			} else {
				if (genre === 'All') {
					filteredResults = allMovies.filter(movie => {
						return movie.title.toLowerCase().includes(query)
					})
				} else {
					filteredResults = allMovies.filter(
						movie =>
							movie.title.toLowerCase().includes(query) &&
							movie.genres.includes(genre)
					)
				}
			}
		}

		if (!filteredResults.length && query) {
			setError('No movies found.')
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
		genresList.unshift(`All`)
		return (
			<section className='genre-select'>
				<select
					className='options'
					defaultValue=''
					onChange={e => handleGenresOptionChange(e)}
				>
					{genresList.map((genre, i) => {
						return (
							<option className='select-items' key={i} value={genre}>
								{genre}
							</option>
						)
					})}
				</select>
			</section>
		)
	}

	// ~~~ filters the movie data by genres & assigns data to states ~~~
	const filterByGenres = (type: string) => {
		let filteredResults: MoviesState['movies'] = []
		setError('')
		if (searchText && type === 'All') {
			filteredResults = allMovies.filter(movie =>
				movie.title.includes(searchText)
			)
		}
		if (!searchText && type === 'All') {
			filteredResults = allMovies
		}
		if (!searchText && type !== 'All') {
			filteredResults = allMovies.filter(movie => movie.genres.includes(type))
		} else if (searchText && type !== 'All') {
			filteredResults = allMovies.filter(
				movie =>
					movie.genres.includes(type) &&
					movie.title.toLowerCase().includes(searchText)
			)
		}

		if (!filteredResults.length) {
			setError('No movies found.')
		}

		setFilteredByGenres(filteredResults)
	}

	// ~~~ Returns the proper movie data depending on the condition ~~~
	const selectMoviesData = () => {
		if (searchText && genre && genre !== 'All') {
			let comboFilteredMovies = allMovies.reduce(
				(arr: MoviesState['movies'], movie) => {
					if (
						movie.genres.includes(genre) &&
						!arr.includes(movie) &&
						movie.title.toLowerCase().includes(searchText)
					) {
						arr.push(movie)
					}

					return arr
				},
				[]
			)
			return comboFilteredMovies
		} else if (!searchText && genre && genre !== 'All') {
			let genreResults = allMovies.filter(movie => movie.genres.includes(genre))
			return genreResults
		} else if (searchText && genre === 'All') {
			return allMovies.filter(movie =>
				movie.title.toLowerCase().includes(searchText)
			)
		} else if (searchText && !genre) {
			return filteredBySearch
		} else {
			return allMovies
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		let query = e.target.value.toLowerCase()
		setSearchText(query)
		filterMovies(query)
	}

	return (
		<main>
			<Navbar />
			<Filter
				searchText={searchText}
				handleChange={handleChange}
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
				<h2>{error === 'No movies found.' ? error : null}</h2>
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
