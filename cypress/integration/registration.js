describe("Register page", () => {
    /*
     * Visits the page before each test
     */
    beforeEach(() => {
        cy.server({
            headers: {
                Authorization: ""
            }
        });
        cy.visit("/start");
    });

    it("should have Twitter and Facebook login options", () => {
        cy.get(".RegisterForm .btn-twitter").should("have.attr", "href")
            .and("include", "/login/twitter/");
        cy.get(".RegisterForm .btn-facebook").should("have.attr", "href")
            .and("include", "/login/facebook/");
    });

    it("should show faces and marketing copy", () => {
        cy.get(".register-copy .FaceStack").should("not.to.be.empty")
        cy.get("#wall-of-love").should('exist')
    });


    it("should have a back to top link", () => {
        cy.get(".bottom-cta a").should("have.attr", "href")
            .and("include", "#main-navbar");
    });
});
