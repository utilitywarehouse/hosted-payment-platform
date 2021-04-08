describe("The payment method form", () => {
  before(() => {
    cy.loadAccount();
    cy.visitLandingPage();
    cy.contains("£385.37").should("be.visible").click();
  });

  it("allows the user to enter their cardholder name", () => {
    cy.contains("Name on card").siblings().children().type("A Kwok");

    cy.clickOutside();

    cy.contains("Name on card")
      .siblings()
      .should("have.css", "border-color", "rgb(27, 126, 72)")
      .children()
      .siblings()
      .first()
      .get("svg");
  });

  it("shows the accepted credit card providers", () => {
    cy.contains("svg", "Visa").parent().should("have.css", "opacity", "0.3");
    cy.contains("svg", "Maestro").parent().should("have.css", "opacity", "0.3");
    cy.contains("svg", "MasterCard")
      .parent()
      .should("have.css", "opacity", "0.3");
  });

  it("recognises the credit card provider", () => {
    cy.contains("Card number").siblings().children().first().type("4");
    cy.contains("svg", "Visa").parent().should("have.css", "opacity", "1");
    cy.contains("svg", "MasterCard").should("not.exist");
    cy.contains("svg", "Maestro").should("not.exist");

    cy.contains("Card number").siblings().children().first().clear().type("55");
    cy.contains("svg", "Visa").should("not.exist");
    cy.contains("svg", "MasterCard")
      .parent()
      .should("have.css", "opacity", "1");
    cy.contains("svg", "Maestro").should("not.exist");

    cy.contains("Card number").siblings().children().first().clear().type("56");
    cy.contains("svg", "Visa").should("not.exist");
    cy.contains("svg", "MasterCard").should("not.exist");
    cy.contains("svg", "Maestro").parent().should("have.css", "opacity", "1");
  });

  it("formats the card number", () => {
    cy.contains("Card number")
      .siblings()
      .children()
      .first()
      .clear()
      .type("4111222233334444")
      .should("have.value", "4111 2222 3333 4444");
  });

  it("validates a 16 digit card number", () => {
    cy.contains("Card number")
      .siblings()
      .children()
      .first()
      .clear()
      .type("4111 1111 1111 1111")
      .click();

    cy.clickOutside();

    cy.contains("Card number")
      .siblings()
      .should("have.css", "border-color", "rgb(27, 126, 72)");
  });

  it("formats the expiry date", () => {
    cy.contains("Expiry date")
      .siblings()
      .children()
      .first()
      .type("1029")
      .should("have.value", "10/29");
  });

  it("validates the expiry date", () => {
    cy.contains("Expiry date")
      .siblings()
      .children()
      .first()
      .clear()
      .type("1029")
      .click();

    cy.clickOutside();

    cy.contains("Expiry date")
      .siblings()
      .should("have.css", "border-color", "rgb(27, 126, 72)");
  });

  it("validates a 3 digit CV number", () => {
    cy.contains("CV number").siblings().children().first().type("123");

    cy.clickOutside();

    cy.contains("CV number")
      .siblings()
      .should("have.css", "border-color", "rgb(27, 126, 72)");
  });

  it("allows the user to click Continue when all the input fields are green", () => {
    cy.contains("button", "Continue").should("be.enabled");
  });

  it("handles errors", () => {
    cy.contains("Name on card").siblings().children().first().clear().type(" ");
    cy.clickOutside();
    cy.contains("Name on card")
      .siblings()
      .should("have.css", "border-color", "rgb(206, 34, 97)");
    cy.contains("Invalid cardholder name");

    cy.contains("button", "Continue").should("be.disabled");

    cy.contains("Card number")
      .siblings()
      .children()
      .first()
      .type("{backspace}");
    cy.clickOutside();
    cy.contains("Card number")
      .siblings()
      .should("have.css", "border-color", "rgb(206, 34, 97)");
    cy.contains("Invalid card number");

    cy.contains("Expiry date")
      .siblings()
      .children()
      .first()
      .clear()
      .type("1020");
    cy.clickOutside();
    cy.contains("Expiry date")
      .siblings()
      .should("have.css", "border-color", "rgb(206, 34, 97)");
    cy.contains("Invalid expiry date");

    cy.contains("CV number").siblings().children().first().type("{backspace}");
    cy.clickOutside();
    cy.contains("CV number")
      .siblings()
      .should("have.css", "border-color", "rgb(206, 34, 97)");
    cy.contains("Invalid CV number");
  });
});
