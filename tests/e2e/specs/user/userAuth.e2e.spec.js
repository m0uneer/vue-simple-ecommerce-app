describe('Open login/register pages', () => {
  it('Visits login', () => {
    cy.visit('/users/login');
    cy.contains('h1', 'Login');
    cy.screenshot();
  });

  it('Visits register', () => {
    cy.visit('/users/register');
    cy.contains('h1', 'Register a new user');
    cy.screenshot();
  });
});
