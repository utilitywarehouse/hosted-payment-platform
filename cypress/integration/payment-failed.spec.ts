describe("The Payment Failed page", () => {
  before(() => {
    cy.loadAccount();
    cy.visitLandingPage();
    cy.enterPaymentDetails();
  });

  it("should show the Payment Failed page when a payment fails", () => {
    cy.stubConfirmPayment("failure").as("confirmPayment");
    cy.contains("button", "Confirm payment").click();
    cy.wait("@confirmPayment").then(() => {
      cy.url({ timeout: 10000 }).should("include", "/payment-failed");
    });
  });
});
