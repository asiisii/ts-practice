describe('Filter', () => {
	beforeEach(() => {
		cy.interceptAllMoviesFetches()
	})

	it('should have search bar and genre options', () => {
		cy.get('input[name="search"]')
			.should('be.visible')
			.get('select')
			.find('.select-items')
			.should('have.length', '7')
			.get('.select-items')
			.eq(0)
			.should('have.text', 'All')
			.get('.select-items')
			.eq(1)
			.should('have.text', 'Action')
	})

	it('should be able to search by text', () => {
		cy.get('input[name="search"]')
			.should('have.value', '')
			.type('Riders')
			.should('have.value', 'riders')
			.get('.movies')
			.find('.MoviePoster')
			.should('have.length', 1)
			.should('be.visible')
	})

	it('should display all the movies when search has no value', () => {
		cy.get('input[name="search"]')
			.type('Riders')
			.should('have.value', 'riders')
			.get('.movies')
			.find('.MoviePoster')
			.should('have.length', 1)
			.should('be.visible')
			.get('input[name="search"]')
			.clear()
			.should('have.value', '')
			.get('.movies')
			.find('.MoviePoster')
			.should('have.length', 10)
			.should('be.visible')
	})

	it.only('should be able to filter by genre', () => {
		cy.get('select')
			.select('All')
			.get('.movies')
			.find('.MoviePoster')
			.should('have.length', 10)
			.should('be.visible')
			.get('select')
			.select('Action')
			.get('.movies')
			.find('.MoviePoster')
			.should('have.length', 2)
			.should('be.visible')
	})
})
