export function mockAuthedApi() {
    cy.route({
        method: "GET",
        url: "/me/*/",
        status: 200,
        response: "fixture:user.json"
    }).as("getUser");

    cy.route({
        method: "PATCH",
        url: "/me/*/",
        status: 200,
        response: "fixture:user.json"
    }).as("patchUser");

    cy.route({
        method: "GET",
        url: "/tasks/sync/*",
        status: 200,
        response: "fixture:task_sync.json"
    }).as("syncTasks");

    cy.route({
        method: "GET",
        url: "/projects/",
        status: 200,
        response: "fixture:projects.json"
    }).as("getProjects");

    cy.route({
        method: "GET",
        url: "/notifications/",
        status: 200,
        response: "fixture:notifications.json"
    }).as("getNotifications");

    cy.route({
        method: "GET",
        url: "/achievements/",
        status: 200,
        response: "fixture:achievements.json"
    }).as("getAchievements");

    cy.route({
        method: "GET",
        url: "/me/stats/",
        status: 200,
        response: "fixture:me_stats.json"
    }).as("getStats");

    cy.route({
        method: "POST",
        url: "/me/set_timezone",
        status: 200,
        response: []
    }).as("setTimezone");

    cy.route({
        method: "GET",
        url: "/trophies/",
        status: 200,
        response: "fixture:trophies.json"
    }).as("getTrophies");

    cy.route({
        method: "GET",
        url: "/stats/world/",
        status: 200,
        response: "fixture:stats_world.json"
    }).as("getWorldStats");

    cy.route({
        method: "GET",
        url: "/discussions/recent_discussions/",
        status: 200,
        response: "fixture:discussions_recent_discussions.json"
    }).as("getRecentDiscussions");

    cy.route({
        method: "GET",
        url: "/feeds/get_stream_key/",
        headers: {
            Authorization: null
        }
    }).as("getStreamKey");
}

export function useAuthedApi() {
    cy.route({
        method: "POST",
        url: "/login/social/token_user/",
        status: 201,
        response: "fixture:login_social_token_user"
    }).as("getTokenSocial");
}
