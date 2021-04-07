describe("The payment summary page", () => {
  before(() => {
    cy.fixCypressSpec("/cypress/integration/success.spec.ts");
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
    cy.url().should("include", "/success");
    cy.document().toMatchImageSnapshot();
  });
});
