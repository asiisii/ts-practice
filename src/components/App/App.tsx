import React, { useEffect, useState } from 'react'
import { fetchAllMoviesData, checkForError } from '../../util/apiCalls'
import { cleanAllMoviesData } from '../../util/cleanApiData'
import { MoviesState } from '../../util/dataTypes'
import './App.css'

// interface MoviesState {
// 	movies: {
// 		id: number
// 		title: string
// 		genres: string[]
//     img: string
// value: number
// 	}[]
// }

const App: React.FC = () => {
	const [allMovies, setAllMovies] = useState<MoviesState['movies']>([])
	const [statusCode, setStatusCode] = useState<number>(200)
	const [fetchedError, setFetchedError] = useState<boolean>(false)
	// const [error, setError] = useState<string>('')

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
      // const cleanedData = cleanAllMoviesData(data.data)
      setAllMovies(cleanedData)
    } catch (error) {
      setFetchedError(true)
    }
  }

	console.log(allMovies)
	return (
    <div className='App'>
      {fetchedError && checkForError(statusCode)}
      {allMovies && allMovies.map(movie => {
        return <img src={movie.img} />
      })}
    </div>
    )
}

export default App
