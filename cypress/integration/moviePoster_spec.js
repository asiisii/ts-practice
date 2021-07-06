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

		it('should display two default image', () => {
			cy.get('img')
				.should('have.length', '11')
				.eq(2)
				.should('have.attr', 'src')
				.should('equal', '/assets/moviePosterImages/defaultImage.jpeg')
				.get('img')
				.eq(2)
				.should('have.attr', 'alt')
				.should('include', '616 Wilford Lane')
				.get('img')
				.should('have.length', '11')
				.eq(6)
				.should('have.attr', 'src')
				.should('equal', '/assets/moviePosterImages/defaultImage.jpeg')
				.get('img')
				.eq(6)
				.should('have.attr', 'alt')
				.should('include', 'The Retreat')
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

		it("should display correct #'s of search results", () => {
			cy.get('input[name="search"]')
				.type('Riders')
				.get('.num-of-posters')
				.should('have.text', 'Search Results: [ 1 ]')
				.get('input[name="search"]')
				.type('q')
				.get('.num-of-posters')
				.should('have.text', 'Search Results: [ 0 ]')
		})
	})
})
