describe("Journal Entries", () => {
  it("creates new entry when fields are filled and submitted, can update and delete entry", () => {
    cy.visit("/");

    // Enter title text of journal entry
    cy.get('[data-cy="entryTitle"]').type("Cypress Test Entry Title");
    cy.get('[data-cy="entryTitle"]').should(
      "have.value",
      "Cypress Test Entry Title",
    );

    // Enter body text of journal entry
    cy.get('[data-cy="entryText"]').type("This is a new dream journal entry.");
    cy.get('[data-cy="entryText"]').should(
      "have.value",
      "This is a new dream journal entry.",
    );

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Should be on a new url
    cy.url().should("include", "/entries/");

    // Check result has previously entered text
    cy.get('[data-cy="entryTitle"]').should(
      "have.text",
      "Cypress Test Entry Title",
    );
    cy.get('[data-cy="entryBody"]')
      .children()
      .should("have.text", "This is a new dream journal entry.");

    // Click Edit Entry link
    cy.get('[data-cy="editEntry"]').click();

    // Verify correct url
    cy.url().should("include", "/edit");

    // Enter title text of journal entry
    cy.get('[data-cy="entryTitle"]').clear();
    cy.get('[data-cy="entryTitle"]').type("Updated entry title");
    cy.get('[data-cy="entryTitle"]').should(
      "have.value",
      "Updated entry title",
    );

    // Enter body text of journal entry
    cy.get('[data-cy="entryText"]').clear();
    cy.get('[data-cy="entryText"]').type("This is the updated journal entry.");
    cy.get('[data-cy="entryText"]').should(
      "have.value",
      "This is the updated journal entry.",
    );

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Should be back on individual entry path
    cy.url().should("include", "/entries/");

    // Check result has previously entered text
    cy.get('[data-cy="entryTitle"]').should("have.text", "Updated entry title");
    cy.get('[data-cy="entryBody"]')
      .children()
      .should("have.text", "This is the updated journal entry.");

    // Delete the entry
    cy.get('[data-cy="deleteEntry"]').click();

    // Asset redirect to entries index
    cy.location("pathname").should("eq", "/entries");
  });
});
