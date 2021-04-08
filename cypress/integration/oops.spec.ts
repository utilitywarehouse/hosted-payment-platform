describe("The Oops page", () => {
  before(() => {
    cy.loadAccount();
    cy.visitLandingPage();
    cy.enterPaymentDetails();
  });

  it("should show the Oops page when an error occurs", () => {
    cy.stubConfirmPayment("error").as("confirmPayment");
    cy.contains("button", "Confirm payment").click();
    cy.wait("@confirmPayment").then(() => {
      cy.url().should("include", "/oops");
    });
  });

  it("has a button that take the user back to the Landing page", () => {
    cy.contains("button", "Try again").click();
    cy.url().should("include", "/?id=MDE1OTkx");
  });
});
