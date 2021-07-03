import { MoviesState as MoviesData } from './dataTypes'

// import  SP010286020000   from '../assets/moviePosterImages/SP010286020000.jpeg'
// console.log(SP010286020000)

// type MoviesData = {
// 	id: number
// 	title: string
// 	genres: string[]
//   img: string
// }[]

type aMovieData = {
	id: string
	title: string
	releaseYear: number
	duration: number
	genres: string[]
	descritpion: string
	topCast: {
		name: string
		characterName: string
	}[]
}
//~~~ Returns movies data after iterating through all movies data ~~~
export const cleanAllMoviesData = (moviesData: MoviesData['movies']) => {
	const cleanedMoviesData = moviesData.map(  (movie) => {
    const image = new Image()
    // const fileType = await checkFiles(`/assets/moviePosterImages/${movie.id}.jpeg`)
    // Promise.all([fileType]).then(data => {
    //   console.log(data)
    //   data.reduce(function(a, b) {
    //   })
    // })
    // console.log(fileType)
    // console.log(movie.id);
    //   const test = tryRequire(`../assets/moviePosterImages/${movie.id}.jpeg`)
    // 		? tryRequire(`../assets/moviePosterImages/${movie.id}.jpeg`).default
    // 		: 'Default'
    // console.log(test);
    // let path: string
    // if (fileType) {
    //   path = `/assets/moviePosterImages/${movie.id}.jpeg`
    // } else {
    //   path = `/assets/moviePosterImages/defaultImage.jpeg`
    // }
    // console.log(path);
    image.src = `/assets/moviePosterImages/${movie.id}.jpeg`
    const moviePoster: string = `/assets/moviePosterImages/${movie.id}.jpeg`
    // console.log(moviePoster);
    // const defaultPoster: string = `/assets/moviePosterImages/defaultImage.jpeg`
    return {
			id: movie.id,
			title: movie.title,
			genres: movie.genres,
			// img: image.height ? moviePoster : defaultPoster,
			// img: path,
			path: moviePoster,
		}
  })
// Promise.all([cleanedMoviesData]).then(data => console.log(data)
// )

	return cleanedMoviesData
}

// const checkFiles = async (path: string) => {
// 	const res = await fetch(path)
// 	// console.log(res);

// 	const imageInfo = await res.blob()
// 	// {size: 234234, type= 'image/jpeg'}
// 	const getImageType = imageInfo.type.split('/')[1]
// 	// console.log(getImageType);
// 	if (getImageType === 'jpeg') {
// 		return true
// 	} else {
// 		return false
// 	}
// 	// return getImageType
// }

// ~~~ Returns only necessary data of clicked movie poster ~~~
export const cleanAMovieData = (aMovieData: aMovieData) => {}
