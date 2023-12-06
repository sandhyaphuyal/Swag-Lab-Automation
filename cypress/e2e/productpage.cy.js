
describe('Shopping Cart Tests', () => {
    beforeEach(() => {
      cy.login("standard_user", "secret_sauce");
    });
    it('should add a product to the cart and verify its presence in the cart', () => {
     cy.verifyaddproductincart();
    });
   
    it("Verify the Standard_user user can perform a checkout.",()=>{
      cy.verifyaddproductincart();
      cy.get("[data-test='continue-shopping']").click();
      //user should redirected to again product list
      cy.get("[data-test='add-to-cart-sauce-labs-fleece-jacket']").click();
      cy.url("https://www.saucedemo.com/inventory.html").should("exist");
       // Check cart
       cy.get("#shopping_cart_container").click();
       //check we are in cart page or not
       cy.url("https://www.saucedemo.com/cart.html").should("exist");
       //verify whether check out button or not
       cy.get("[data-test='checkout']").should("exist");
       cy.get("[data-test='checkout']").should('include.text', 'Checkout');
       //click on it
       cy.get("[data-test='checkout']").click();
       //after check out user should be redirected to stepone page
       cy.url("https://www.saucedemo.com/checkout-step-one.html").should("exist");
       //enter details of user
       cy.get("[data-test='firstName']").type("Sandhya");
       cy.get("[data-test='lastName']").type("phuyal");
       cy.get("[data-test='postalCode']").type("32454");
       //click continue
       cy.get("[data-test='continue']").click();
       //sfter clicking conitnue user rredited to step 2 page
       cy.url("https://www.saucedemo.com/checkout-step-two.html").should("exist");
       //verify whether finish button or not
       cy.get("[data-test='finish']").should("exist");
       cy.get("[data-test='finish']").should('include.text', 'Finish');
       //click on it
       cy.get("[data-test='finish']").click();
       //after finish user should get and redirected to confirmation page
       cy.url("https://www.saucedemo.com/checkout-complete.html").should("exist");
       cy.contains('Thank you for your order!').should('exist');
       cy.get("[data-test='back-to-products']").should("exist");
  
      });
        
   it('should sort prices in ascending order after applying low to high filter', () => {
        // apply the low to high filter
        cy.get("[data-test='product_sort_container']").select('lohi');
        //as all prices of prducts are mentioned in the class "inventory_item_price"
        cy.get('.inventory_item_price').invoke('text').then((prices) => {
          let pricesArray;
          if (Cypress._.isArray(prices)) {
            pricesArray = prices;
          } else {
            pricesArray = [prices];
          }
         // Extracting them in numerical values and convert them to an array of numbers
          const numericPrices = pricesArray.map(price => parseFloat(price.replace('$', '')));
        // Sort in asc. order
          const sortedPrices = [...numericPrices].sort((a, b) => a - b);
          //  sorted prices should match displayed displayed prices
          cy.wrap(numericPrices).should('deep.equal', sortedPrices);
        });
      });

    });

   
  
  
  