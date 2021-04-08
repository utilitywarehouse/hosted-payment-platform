describe("The Payment Failed page", () => {
  before(() => {
    cy.fixCypressSpec("/cypress/integration/payment-failed.spec.ts");
    cy.loadAccount();
    cy.visitLandingPage();
    cy.enterPaymentDetails();
  });

  it("should show the Payment Failed page when a payment fails", () => {
    cy.stubConfirmPayment("failure").as("confirmPayment");
    cy.contains("button", "Confirm payment").click();
    cy.wait("@confirmPayment").then(() => {
      cy.url().should("include", "/payment-failed");
      cy.document().toMatchImageSnapshot();
    });
  });
});
