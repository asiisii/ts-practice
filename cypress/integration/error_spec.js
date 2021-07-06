describe('Error handling', () => {
  
  it('should display error message for 404 status code', () => {
    const baseURL = 'https://code-challenge.spectrumtoolbox.com/api/movies' 
    cy.intercept(
			{
				method: 'GET',
				url: `${baseURL}`,
				headers: {
					Authorization: 'Api-Key q3MNxtfep8Gt',
				},
			},
			{
				statusCode: 404,
			}
		).visit('http://localhost:3000/')
    .get('.err-msg').should('have.text', 'Sorry, we couldn\'t find movies you were looking for')
  })
})