/// <reference path="../support/index.d.ts" />

describe("The Landing page", () => {
  before(() => {
    cy.loadAccount();
    cy.visitLandingPage();
  });

  it("greets the customer by name", () => {
    cy.get("h3").contains("Hi Antony Kwok");
  });

  it("shows the full amount", () => {
    cy.contains("Full amount")
      .siblings()
      .contains("£385.37");
  });

  it("recommends to pay the full amount", () => {
    cy.contains(
      "We recommend you pay off the full debt of £385.37 on your account."
    );
  });

  it("hides payment method when no payment amount has been selected", () => {
    cy.get("input[name=cardholderName]").should("not.be.visible");
    cy.get("input[name=cardNumber]").should("not.be.visible");
    cy.get("input[name=expiryDate]").should("not.be.visible");
    cy.get("input[name=cvNumber]").should("not.be.visible");
  });

  it("shows payment method form when full amount option selected", () => {
    cy.contains("Full amount").click();
    cy.get("input[name=cardholderName]").should("be.visible");
    cy.get("input[name=cardNumber]").should("be.visible");
    cy.get("input[name=expiryDate]").should("be.visible");
    cy.get("input[name=cvNumber]").should("be.visible");
  });

  it("allows the user to change their mind", () => {
    cy.contains("Edit").click({ force: true });
    cy.contains("Full amount")
      .siblings()
      .contains("£385.37");
    cy.contains("Other amount");
  });

  it("allows the user to enter a specific amount", () => {
    cy.contains("Other amount").click();
    cy.contains("button", "Confirm amount").should("be.disabled");
    cy.get("input[name=paymentAmount]").type("2");
    cy.contains("button", "Confirm amount").should("be.disabled");
    cy.get("input[name=paymentAmount]")
      .clear()
      .type("123");
    cy.contains("button", "Confirm amount")
      .should("be.enabled")
      .click();
    cy.contains("Partial amount of £123.00");
    cy.get("input[name=cardholderName]").should("be.visible");
    cy.get("input[name=cardNumber]").should("be.visible");
    cy.get("input[name=expiryDate]").should("be.visible");
    cy.get("input[name=cvNumber]").should("be.visible");
  });
});
