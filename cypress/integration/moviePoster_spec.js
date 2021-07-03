describe('MoviePosters', () => {
	beforeEach(() => {
		cy.interceptAllMoviesFetches()
	})

	describe('Onload', () => {
		it('should retrieve all the movies', () => {
			cy.wait('@getAllMovies') //alias for fixtures data
				.its('response.statusCode')
				.should('eq', 200)
			cy.get('main')
				.get('.movies')
				.find('.MoviePoster')
				.should('have.length', 10)
				.should('be.visible')
		})

    
	})
})
