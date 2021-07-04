describe('Navbar', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/')
	})

	it('should have logo and title', () => {
		cy.get('header')
			.should('have.css', 'background-color', 'rgb(113, 201, 206)')
			.get('.Navbar')
			.should('have.css', 'max-width', '1440px')
			.get('img')
			.get('span')
			.should('have.text', 'ChartFlix')
			.get('span')
			.should('have.css', 'cursor', 'default')
	})
})
