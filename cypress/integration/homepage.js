describe("Homepage", () => {
    /*
     * Visits the page before each test
     */
    beforeEach(() => {
        cy.server({
            headers: {
                Authorization: ""
            }
        });
        cy.log(`Visiting http://localhost:3000`);
        cy.visit("/");
    });

    it("should have a 'Get Started' button", () => {
        cy.get(".HomePage .HomeHero a")
            .should("have.attr", "href")
            .and("include", "start");
    });
});
