describe('Login Tests', () => {
  it('should redirect to product page for valid user', () => {
    cy.login("standard_user", "secret_sauce");
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
  });

  it('should show an error message for invalid username', () => {
    cy.login("invalid_user", "secret_sauce");
    cy.get("[data-test='error']").should('be.visible').contains('Username and password do not match any user');
  });

  it('should show an error message for invalid password', () => {
    cy.login("standard_user", "wrong_password");
    cy.get("[data-test='error']").should('be.visible').contains('Username and password do not match any user');
  });

  it('should show an error message for locked out user', () => {
    cy.login("locked_out_user", "secret_sauce");
    cy.get("[data-test='error']").should('be.visible').contains('Sorry, this user has been locked out.');
  });

  it('should show an error message for empty username and password', () => {
    cy.login(" ", " ");
    cy.get("[data-test='error']").should('be.visible');
  });
});