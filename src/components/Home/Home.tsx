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
	const [genresMovies, setGenresMovies] = useState<MoviesState['movies']>([])

	// ~~~ Invokes the fetch call on load & assigns data to states ~~~
	useEffect(() => {
		getAllMovies()
		filterByGenres()
	}, [genre])

	// ~~~ Invokes the fetch call on load & assigns data to states ~~~
	const filterByGenres = () => {
    console.log(`genre picked`);
    
		const filteredResults = allMovies.filter(movie =>
			movie.genres.includes(genre)
		)
		setGenresMovies(filteredResults)
	}

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

	const filterMovies = (query: string) => {
		console.log(query)
		setError('')
		let filteredResults: MoviesState['movies']
		// if (genres && filteredBySearch.length) {
		//   filteredBySearch
		// }
		// const a = filteredBySearch.length ? filteredBySearch : allMovies
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

	const handleGenresOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
		setGenre(e.target.value)

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
						<option
							className='select-items'
							key={i}
							value={genre.toLowerCase()}
						>
							{genre}
						</option>
					)
				})}
			</select>
		)
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
					{filteredBySearch.length || error === 'No movies found.'
						? 'Search Results'
						: 'All Movies'}
				</h1>
				<h3>{error === 'No movies found.' ? error : null}</h3>
				{fetchedError && checkForError(statusCode)}
				{(allMovies.length || filteredBySearch.length) && !fetchedError ? (
					<Movies
						movies={filteredBySearch.length ? filteredBySearch : allMovies}
					/>
				) : (
					<h1 className='loading'>Loading</h1>
				)}
			</section>
		</main>
	)
}
