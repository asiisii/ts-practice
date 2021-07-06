describe('MoviePosters', () => {
	beforeEach(() => {
		cy.interceptAllMoviesFetches()
			.interceptSingleMovieFetch()
			.get('.movies')
			.find('.MoviePoster')
			.get('img')
			.eq(1)
			.click()
	})

	it('should be able to toggle between details and home page', () => {
		cy.get('header')
			.find('.logo-title-wrapper')
			.find('img')
			.get('span')
			.should('have.text', 'ChartFlix')
			.get('a')
			.find('img')
			.click()
	})

	it.only('should be able to see both poster and hero images', () => {
    cy.get('img')
			.eq(2)
			.should('have.attr', 'src')
			.should('equal', '/assets/moviePosterImages/SP013727990000.jpeg')
			.get('img')
			.eq(3)
			.should('have.attr', 'src')
			.should('equal', '/assets/movieHeroImages/SP013727990000.jpeg')
  })
})
