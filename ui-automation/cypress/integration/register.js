describe('This section describes how to manage your Holochat profile', function () {
  // it('Let\'s check that all 3 instances of HoloChat are running.)', function () {
  //   cy.request('http://localhost:3141')
  //   cy.request('http://localhost:4141')
  //   cy.request('http://localhost:5141')
  // })
  it('Fill out the required fields marked with an * and click "Register")', function () {
    cy.visit('/')
    cy.get('input[name="userName"]').type('phil')
    cy.get('input[name="firstName"]').type('Phil')
    cy.get('input[name="lastName"]').type('Beadle')
    cy.get('input[name="email"]').type('philip.beadle@live.com.au')
    cy.get('button[name="register"]').click()
    cy.get('h1[name="userHash"]').should('not.contain', 'empty')
  })
})
