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

	it.only('should be able to search by text', () => {
		cy.get('input[name="search"]')
			.should('have.value', '')
			.type('Riders')
			.should('have.value', 'riders')
			.get('.movies')
			.find('.MoviePoster')
			.should('have.length', 1)
			.should('be.visible')
	})
})
