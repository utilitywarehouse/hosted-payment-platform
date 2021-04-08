describe("The No Debt page", () => {
  before(() => {
    cy.loadAccount(true);
    cy.visitLandingPage();
  });

  it("shows the No Debt page", () => {
    cy.url().should("include", "/no-debt");
  });
});
