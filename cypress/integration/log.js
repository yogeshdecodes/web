const { useAuthedApi } = require("../utils");
import { token } from "../fixtures/login_social_token_user.json";

describe("Log page (dashboard)", () => {
    beforeEach(() => {
        cy.server();
        cy.setCookie("token", token);
        cy.visit("/log");
    });

    it("should have an editor", () => {
        cy.get(".TaskQueue").should("exist");
        cy.get(".TaskQueue input").should("exist");
    });
    it("should show recent discussions", () => {
        cy.request(
            "https://api.getmakerlog.com/discussions/recent_discussions/"
        ).then(response => {
            expect(response.status).to.eq(200);
            const recentDiscussions = response.body;
            cy.get(".ThreadMediaLine").should(
                "have.length",
                recentDiscussions.length
            );
        });
    });
    it("should show the activity feed, pre-rendered");
    it("should have a sidebar with a working activity graph");
});
