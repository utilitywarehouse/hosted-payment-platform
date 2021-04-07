describe("The No Debt page", () => {
  before(() => {
    cy.fixCypressSpec("/cypress/integration/no-debt.spec.ts");
    cy.loadAccount(true);
    cy.visitLandingPage();
  });

  it("shows the No Debt page", () => {
    cy.url().should("include", "/no-debt");
    cy.document().toMatchImageSnapshot();
  });
});
