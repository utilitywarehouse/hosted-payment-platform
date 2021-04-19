// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// @ts-ignore
Cypress.Commands.add("loadAccount", (inCredit?: boolean) => {
  const fixture = inCredit ? "in-credit-account.json" : "default-account.json";

  return cy.intercept(
    "POST",
    "https://finance-graphql.dev.aws.uw.systems/query",
    { fixture }
  );
});

Cypress.Commands.add(
  "stubConfirmPayment",
  (outcome: "success" | "failure" | "error"): any => {
    let fixture;

    switch (outcome) {
      case "success":
        fixture = "make-payment-success.json";
        break;
      case "failure":
        fixture = "make-payment-failure.json";
        break;
      case "error":
        fixture = "make-payment-error.json";
        break;
    }

    return cy.intercept(
      "POST",
      "https://finance-graphql.dev.aws.uw.systems/query",
      { fixture }
    );
  }
);

Cypress.Commands.add("visitLandingPage", () => {
  return cy.visit("?id=MDE1OTkx");
});

Cypress.Commands.add("clickOutside", () => {
  return cy.get("body").click(0, 0);
});

Cypress.Commands.add("enterPaymentDetails", () => {
  cy.contains("Other amount").should("be.visible").click();
  cy.get("input[name=paymentAmount]").should("be.visible").type("85.37");
  cy.contains("button", "Confirm amount").click();
  cy.contains("Name on card").siblings().children().type("A Kwok");
  cy.contains("Card number")
    .siblings()
    .children()
    .first()
    .type("4111111111111111");
  cy.contains("Expiry date").siblings().children().first().type("1029");
  cy.contains("CV number").siblings().children().first().type("123");
  cy.contains("button", "Continue").click();
});
