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

		it('should have Riders of Justice title', () => {
			cy.get('.movie-title')
				.should('have.length', 10)
				.should('be.visible')
				.get('.movie-title')
				.eq(0)
				.should('have.text', 'Riders of Justice')
				.get('.movie-title')
				.eq(1)
				.should('have.text', '616 Wilford Lane')
		})
	})
})
