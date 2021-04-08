describe("The Success page", () => {
  before(() => {
    cy.loadAccount();
    cy.visitLandingPage();
    cy.enterPaymentDetails();
    cy.stubConfirmPayment("success").as("confirmPayment");
    cy.contains("button", "Confirm payment").click();
    cy.wait("@confirmPayment").then(() => {
      cy.url().should("include", "/success");
    });
  });

  it("shows the Success page", () => {
    cy.url({ timeout: 10000 }).should("include", "/success");
  });
});
