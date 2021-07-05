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
})