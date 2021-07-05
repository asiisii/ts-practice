// let path: string = 'https://code-challenge.spectrumtoolbox.com/api/movies/'
let errorMsg: string

// ~~~ Returns response after fetching all the movies data ~~~
export const fetchAllMoviesData = async () => {
	const res = await fetch('/allMovies.json', {
		// const res = await fetch(path, {
		headers: {
			Authorization: 'Api-Key q3MNxtfep8Gt',
		},
	})
	// console.log(res.body);

	return res
}

// ~~~ Returns error message(string) depending on the status code ~~~
export const checkForError = (status: number): string => {
	switch (status) {
		case 404:
			errorMsg = "Sorry, we couldn't find movies you were looking for"
			break
		case 429:
			errorMsg =
				"We're sorry, but you've sent too many requests to us recently. Please try again later."
			break
		case 500:
			errorMsg = 'Internal Server Error. Our whole team are now aware.'
			break
		default:
			errorMsg = 'Oops! Request failed. Please try again.'
	}

	return errorMsg
}
