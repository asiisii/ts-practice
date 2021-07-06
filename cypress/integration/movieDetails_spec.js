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

	it('should be able to see both poster and hero images', () => {
    cy.get('.details-section')
      .get('img')
			.eq(2)
			.should('have.attr', 'src')
			.should('equal', '/assets/moviePosterImages/SP013727990000.jpeg')
			.get('img')
			.eq(3)
			.should('have.attr', 'src')
			.should('equal', '/assets/movieHeroImages/SP013727990000.jpeg')
  })

  it('should be able to see all the movie details', () => {
    cy.get('.movie-title')
			.should('have.text', 'Riders of Justice')
			.get('.release-year')
			.should('have.text', 2020)
			.get('.duration')
			.should('have.text', '1hr:56mins')
			.get('.genres')
			.should('contain', 'Action')
			.get('.description')
			.should(
				'contain',
				'Markus returns home to care for his daughter when his wife'
			)
			.get('.top-cast')
			.should('contain', 'Mads Mikkelsen')
			.get('.top-cast')
			.should('contain', 'Andrea Heick Gadeberg')
  })
})
