import { mockAuthedApi } from "../utils";

describe("Twitter complete page (fail state)", () => {
    /*
     * Visits the page before each test
     */
    beforeEach(() => {
        cy.server();
        cy.route({
            method: 'POST',
            url: '/login/social/token_user/',
            status: 400,
            response: []
        }).as("getTokenSocial");
        cy.visit("/auth/complete/twitter/?oauth_token=x&oauth_verifier=x");
        cy.wait('@getTokenSocial')
    });

    it("should show an error state if token validation fails", () => {
        cy.get('.alert.is-danger .alert-body').should("contain.text", "error")
    });

});


describe("Twitter complete page (success state)", () => {
    /*
     * Visits the page before each test
     */
    beforeEach(() => {
        cy.server();
        mockAuthedApi()
        cy.route({
            method: 'POST',
            url: '/login/social/token_user/',
            status: 201,
            response: {
                token: 'x'
            }
        }).as("getTokenSocial");
        cy.visit("/auth/complete/twitter/?oauth_token=x&oauth_verifier=x");
        cy.wait('@getTokenSocial')
        cy.wait("@getUser")
    });


    it("should show onboarding on success", () => {
        cy.get("h1").should("contain.text", "One last thing...")
    });

    it ("should fail on missing email", () => {
        cy.get('button[type="submit"]').click()
        //cy.wait("@patchUser")
        cy.get(".alert.is-danger .alert-body").should("contain.text", "missing email")
        cy.get('input[name="email"]').type("you@bitch.com")
        cy.get('button[type="submit"]').click({force: true})
    })
});
