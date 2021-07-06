describe('MoviePosters', () => {
	beforeEach(() => {
		cy.interceptAllMoviesFetches()
		cy.interceptSingleMovieFetch()
	})

	it('should be able to toggle between details and home page', () => {
		cy.get('.movies').find('.MoviePoster').get('img').eq(1).click()
    .get('header').find('.logo-title-wrapper')
    .find('img').get('span').should('have.text', 'ChartFlix').get('a').find('img').click()
	})
})
