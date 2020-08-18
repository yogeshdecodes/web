describe("Login page", () => {
    /*
     * Visits the page before each test
     */
    beforeEach(() => {
        cy.server();
        cy.route("/api-token-auth/").as("getToken");
        cy.route("/me/privileged/").as("getUser");
        cy.visit("/login");
    });

    it("should show social login options", () => {
        cy.get("a.btn-twitter").should("exist");
        cy.get("a.btn-facebook").should("exist");
    });

    it("should have a login form for pre-social users", () => {
        cy.get("form input").should("have.length", 2);
    });

    it("should have a forgot? link", () => {
        cy.get("a").should("contain.text", "Forgot");
    });

    it("should show an error message on wrong credentials", () => {
        cy.get('input[name="username"]').type("bad-bitch");
        cy.get('input[name="password"]').type("bad-bitch");
        cy.get('button[type="submit"]')
            .should("contain.text", "Login")
            .click();
        cy.get(".alert.is-danger .alert-body").should("exist");
    });

    it("should log me right the fuck in with a valid username and password", () => {
        cy.get('input[name="username"]').type("testing-user");
        cy.get('input[name="password"]').type("testing-user");

        cy.get('button[type="submit"]')
            .should("contain.text", "Login")
            .click();
        cy.wait("@getUser");
        cy.location("pathname").should("eq", "/log");
    });
});
