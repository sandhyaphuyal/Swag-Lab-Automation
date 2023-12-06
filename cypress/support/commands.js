Cypress.Commands.add('login', (username, password) => {
    cy.visit('https://www.saucedemo.com/');
    cy.wait(2000);
    cy.get("[data-test='username']").should('be.visible').type(username);
    cy.wait(2000);
    cy.get("[data-test='password']").should('be.visible').type(password);
    cy.get("[data-test='login-button']").click();
  });

  Cypress.Commands.add('addToCart', (productName) => {
    cy.get(`[data-test='add-to-cart-${productName}']`).click();
  });
  
  Cypress.Commands.add('removeFromCart', (productName) => {
    cy.get(`[data-test='remove-${productName}']`).click();
  });

  Cypress.Commands.add('verifyaddproductincart',()=>{
    const productName = "sauce-labs-backpack";
    const productName1 = "sauce-labs-bike-light";
    const productTitleSelector = '#item_4_title_link > .inventory_item_name';
    const productTitleSelector1 = "#item_0_title_link > .inventory_item_name";
    // Add a product
    cy.addToCart(productName);
    //verify the product title
    cy.get(productTitleSelector).should("exist");
    cy.addToCart(productName1);
      //verify the product title
    cy.get(productTitleSelector1).should("exist");
     // Check cart
    cy.get("#shopping_cart_container").click();
    //check we are in cart page or not
    cy.url("https://www.saucedemo.com/cart.html").should("exist");
    //check whether the added product in in cart or not by the button and its title 
    cy.get(`[data-test='remove-${productName}']`).should('exist');
    cy.get(productTitleSelector).should("exist");
    cy.get(`[data-test='remove-${productName1}']`).should('exist');
    cy.get(productTitleSelector1).should("exist");

  });