describe('This section describes how to manage your Holochat handle', function () {
  it('Let\'s check that all 3 instances of HoloChat are running.)', function () {
    cy.visit('http://localhost:3141')
    cy.request('http://localhost:4141')
    cy.request('http://localhost:5141')
  })
})
