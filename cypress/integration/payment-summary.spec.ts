describe("The Payment Summary page", () => {
  before(() => {
    cy.loadAccount();
    cy.visitLandingPage();
    cy.contains("Other amount")
      .should("be.visible")
      .click();
    cy.get("input[name=paymentAmount]")
      .should("be.visible")
      .type("85.37");
    cy.contains("button", "Confirm amount").click();
    cy.contains("Name on card")
      .siblings()
      .children()
      .type("A Kwok");
    cy.contains("Card number")
      .siblings()
      .children()
      .first()
      .type("4111111111111111");
    cy.contains("Expiry date")
      .siblings()
      .children()
      .first()
      .type("1029");
    cy.contains("CV number")
      .siblings()
      .children()
      .first()
      .type("123");
    cy.contains("button", "Continue").click();
  });

  it("shows the Payment Summary page", () => {
    cy.url().should("include", "/summary");
  });

  it("shows the overdue balance", () => {
    cy.contains("Overdue balance")
      .siblings()
      .contains("£385.37");
  });

  it("shows the payment amount", () => {
    cy.contains("Payment amount of:")
      .siblings()
      .contains("£85.37");
  });

  it("shows the last 4 digits of the credit card used", () => {
    cy.contains("Card number:")
      .siblings()
      .contains("xxxx xxxx xxxx 1111");
  });

  it("shows the overdule balance after payment", () => {
    cy.contains("Overdue balance after payment:")
      .siblings()
      .contains("£300.00");
  });

  it("loads the Success page upon payment confirmation", () => {
    cy.stubConfirmPayment("success").as("confirmPayment");
    cy.contains("button", "Confirm payment").click();
    cy.wait("@confirmPayment").then(() => {
      cy.url({ timeout: 10000 }).should("include", "/success");
    });
  });
});
