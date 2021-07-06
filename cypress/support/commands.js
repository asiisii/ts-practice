const baseURL = 'https://code-challenge.spectrumtoolbox.com/api/movies'

Cypress.Commands.add('interceptAllMoviesFetches', () => {
	cy.intercept(
		{
			method: 'GET',
			url: `${baseURL}`,
			headers: {
				Authorization: 'Api-Key q3MNxtfep8Gt',
			},
		},
		{ fixture: 'allMovies.json' }
	)
		.as('getAllMovies')
		.visit('http://localhost:3000/')
})

Cypress.Commands.add('interceptSingleMovieFetch', () => {
	cy.intercept(
		{
			method: 'GET',
			url: `${baseURL}/SP013727990000`,
			headers: {
				Authorization: 'Api-Key q3MNxtfep8Gt',
			},
		},
		{ fixture: 'aMovie.json' }
	).as('getAllMovies')
})
