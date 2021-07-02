let path: string = 'https://code-challenge.spectrumtoolbox.com/api/movie/'

export const fetchAllMoviesData = async () => {
	const res = await fetch(path, {
		headers: {
			Authorization: 'Api-Key q3MNxtfep8Gt',
		},
	})
	console.log(res);
  
	return res
}



