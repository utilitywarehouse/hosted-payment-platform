describe("The error pages", () => {
  beforeEach(() => {
    cy.loadAccount();
    cy.visitLandingPage();
    cy.enterPaymentDetails();
  });

  it("should show the Oops page when a payment fails", () => {
    cy.stubConfirmPayment("failure").as("confirmPayment");
    cy.contains("button", "Confirm payment").click();
    cy.wait("@confirmPayment").then(() => {
      cy.url().should("include", "/oops");
      cy.contains("button", "Try again").click();
      cy.url().should("include", "/?id=MDE1OTkx");
    });
  });

  it("should show the Payment failed page when an internal error occurs", () => {
    cy.stubConfirmPayment("error").as("confirmPayment");
    cy.contains("button", "Confirm payment").click();
    cy.wait("@confirmPayment").then(() => {
      cy.url({ timeout: 10000 }).should("include", "/payment-failed");
    });
  });
});
