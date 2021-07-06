describe('Error handling', () => {
	describe('Api errors', () => {
		it('should display error message for 404 status code', () => {
			const baseURL = 'https://code-challenge.spectrumtoolbox.com/api/movies'
			cy.intercept(
				{
					method: 'GET',
					url: `${baseURL}`,
					headers: {
						Authorization: 'Api-Key q3MNxtfep8Gt',
					},
				},
				{
					statusCode: 404,
				}
			)
				.visit('http://localhost:3000/')
				.get('.err-msg')
				.should(
					'have.text',
					"Sorry, we couldn't find movies you were looking for"
				)
		})

		it('should display error message for 429 status code', () => {
			const baseURL = 'https://code-challenge.spectrumtoolbox.com/api/movies'
			cy.intercept(
				{
					method: 'GET',
					url: `${baseURL}`,
					headers: {
						Authorization: 'Api-Key q3MNxtfep8Gt',
					},
				},
				{
					statusCode: 429,
				}
			)
				.visit('http://localhost:3000/')
				.get('.err-msg')
				.should(
					'have.text',
					"We're sorry, but you've sent too many requests to us recently. Please try again later."
				)
		})

		it('should display error message for 500 status code', () => {
			const baseURL = 'https://code-challenge.spectrumtoolbox.com/api/movies'
			cy.intercept(
				{
					method: 'GET',
					url: `${baseURL}`,
					headers: {
						Authorization: 'Api-Key q3MNxtfep8Gt',
					},
				},
				{
					statusCode: 500,
				}
			)
				.visit('http://localhost:3000/')
				.get('.err-msg')
				.should(
					'have.text',
					'Internal Server Error. Our whole team are now aware.'
				)
		})

		it('should display error message for any other error status code', () => {
			const baseURL = 'https://code-challenge.spectrumtoolbox.com/api/movies'
			cy.intercept(
				{
					method: 'GET',
					url: `${baseURL}`,
					headers: {
						Authorization: 'Api-Key q3MNxtfep8Gt',
					},
				},
				{
					statusCode: 401,
				}
			)
				.visit('http://localhost:3000/')
				.get('.err-msg')
				.should('have.text', 'Oops! Request failed. Please try again.')
		})
	})

  describe('Filter movie error', () => {
    it('should say no movies found if search doesn\'t match', () => {
      cy.interceptAllMoviesFetches()
				.get('input[name="search"]')
				.type('asd')
				.should('have.value', 'asd')
				.get('.err-msg').should('have.text', 'No movies found.')
    })

    it("should say no movies found if filtered genre doesn't match", () => {
			cy.interceptAllMoviesFetches()
				.get('input[name="search"]')
				.type('riders')
				.should('have.value', 'riders')
				.get('select')
				.select('Comedy drama')
				.get('.err-msg')
				.should('have.text', 'No movies found.')
		})
  })
})
