const { useAuthedApi } = require("../utils");
import { token } from "../fixtures/login_social_token_user.json";
import config from "../../config";

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

    it("should show the activity feed", () => {
        cy.get("#ActivityFeed--failed").should("not.exist");
    });
});

describe("Activity item tests (dashboard)", () => {
    it("should have appropriate actions (tasks)", () => {
        cy.get('.Activity[data-object-type="task"] button').contains("praise", {
            matchCase: false
        });
        cy.get('.Activity[data-object-type="task"] button').contains(
            "comment",
            {
                matchCase: false
            }
        );
        cy.get('.Activity[data-object-type="task"] button').contains("more", {
            matchCase: false
        });

        cy.get('.Activity[data-object-type="task"] button')
            .contains("more", { matchCase: false })
            .click({ force: true });

        // Test the permalink button
        cy.get('.Activity[data-object-type="task"] button')
            .contains("permalink", { matchCase: false })
            .click({ force: true });

        navigator.clipboard
            .readText()
            .then(text => {
                expect(text).to.contains("getmakerlog.com/tasks/");
            })
            .catch(err => {
                console.error("Failed to read clipboard contents: ", err);
            });

        // Test the tweet button
        cy.get('.Activity[data-object-type="task"] a')
            .contains("tweet", { matchCase: false })
            .should("have.attr", "target", "_blank")
            .should("have.attr", "href")
            .and("contain", "twitter.com");

        // Test project links
        cy.get(".Activity .ProjectLink")
            .first()
            .rightclick({ force: true });
        cy.get(".ProjectLink--content")
            .first()
            .should("be.visible");
    });

    it("should praise tasks correctly", () => {
        const praiseButton = cy
            .get('.Activity[data-object-type="task"] button')
            .contains("praise", {
                matchCase: false
            })
            .first();
        // We use 'raise' to evade case sensitivities
        cy.get('.Activity[data-object-type="task"] button')
            .contains("praise", {
                matchCase: false
            })
            .first()
            .should("contain.text", "raise");
        cy.get('.Activity[data-object-type="task"] button')
            .contains("praise", {
                matchCase: false
            })
            .first()
            .click({ force: true });
        cy.get('.Activity[data-object-type="task"] button')
            .contains("praise", {
                matchCase: false
            })
            .first()
            .should("contain.text", "raised");
        cy.get('.Activity[data-object-type="task"] button')
            .contains("praise", {
                matchCase: false
            })
            .first()
            .click({ force: true });
        cy.get('.Activity[data-object-type="task"] button')
            .contains("praise", {
                matchCase: false
            })
            .first()
            .should("contain.text", "raise");
    });

    it("should allow commenting on tasks", () => {
        const commentButton = cy
            .get('.Activity[data-object-type="task"] button')
            .contains("comment", {
                matchCase: false
            })
            .first();
        commentButton.click({ force: true });
        cy.get(".CommentInput")
            .first()
            .should("exist");
    });
});

describe("Editor (dashboard)", () => {
    const tasks = [];
    const discussions = [];

    beforeEach(() => {
        cy.server();
        cy.setCookie("token", token);
        cy.route("POST", "/tasks/").as("createTask");
        cy.route("POST", "/smart/").as("createTaskSmart");
        cy.visit("/log");
    });

    it("posts a task", () => {
        const content = "Went to the pet store today #life";
        const description = "I really love seeing the cats and petting them!";
        cy.get(".Editor .TaskQueue input")
            .first()
            .type(content);
        cy.get(".Editor button")
            .contains("description")
            .click({ force: true });
        cy.get(".Editor .description-editor textarea")
            .first()
            .type(description);
        cy.get(".Editor button")
            .contains("Post")
            .click({ force: true });

        // We use Smart for plain tasks only, attachments use /tasks/
        cy.wait("@createTaskSmart").should(xhr => {
            expect(xhr.status, "successful POST").to.equal(201);
            if (Array.isArray(xhr.response.body)) {
                const task = xhr.response.body[0];
                expect(task.content).to.equal(content);
                expect(task.description).to.equal(description);
                tasks.push(task);
            } else if (typeof xhr.response.body === "object") {
                const task = xhr.response.body;
                expect(task.content).to.equal(content);
                expect(task.description).to.equal(description);
                tasks.push(task);
            }
        });
    });

    it("posts multiple tasks", () => {
        const contentOne = "Went to the pet store today (1) #life";
        const descriptionOne =
            "I really love seeing the cats and petting them!";
        const contentTwo = "Went to the pet store today (2) #life";
        const descriptionTwo =
            "I really love seeing the cats and petting them!";

        cy.get(".Editor .TaskQueue .task-input.active input")
            .first()
            .type(contentOne);
        cy.get(".Editor button")
            .contains("description")
            .click({ force: true });
        cy.get(".Editor .description-editor textarea")
            .first()
            .type(descriptionOne);
        cy.get(".Editor .TaskQueue .task-input.active input")
            .first()
            .type("{enter}");

        cy.get(".Editor .TaskQueue .task-input.active input")
            .first()
            .type(contentTwo);
        //cy.get(".Editor button")
        //    .contains("description")
        //    .click({ force: true });
        cy.get(".Editor .description-editor textarea")
            .first()
            .type(descriptionTwo);

        cy.get(".Editor button")
            .contains("Post")
            .click({ force: true });

        cy.wait("@createTaskSmart").should(xhr => {
            expect(xhr.status, "successful POST").to.equal(201);
            expect(xhr.response.body.length).to.equal(2);
            const taskOne = xhr.response.body[0];
            const taskTwo = xhr.response.body[1];
            expect(taskOne.content).to.equal(contentOne);
            expect(taskOne.description).to.equal(descriptionOne);
            expect(taskTwo.content).to.equal(contentTwo);
            expect(taskTwo.description).to.equal(descriptionTwo);
            xhr.response.body.map(t => tasks.push(t));
        });
    });

    it("handles queue deletion");

    it("properly switches task states");

    it("switches tabs properly");

    it("creates discussions");

    afterEach(async () => {
        cy.setCookie("token", token);
        tasks.map(task => {
            console.log(`Cleanup: deleting task ${task.id}...`);
            cy.request("DELETE", `${config.API_URL}/tasks/${task.id}/`);
        });
        tasks = [];
    });
});
