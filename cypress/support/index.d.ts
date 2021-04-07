/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    clickOutside(): Chainable<Element>;
    enterPaymentDetails(): void;
    fixCypressSpec(filename: string): void;
    loadAccount(inCredit?: boolean): Chainable<Element>;
    stubConfirmPayment(
      outcome: "success" | "failure" | "error"
    ): Chainable<Element>;
    visitLandingPage(): Chainable<Element>;
  }
}
