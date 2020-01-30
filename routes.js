const routes = require("next-routes");

// order of arguments
// 1. route name
// 2. url
// 3. file path

module.exports = routes()
    .add("home", "/", "home")
    .add("log", "/log", "log")
    .add("forgot", "/forgot", "forgot")
    .add("welcome", "/welcome", "welcome")
    .add("begin", "/begin", "begin")
    .add("login", "/login", "login")
    .add("task-page", "/tasks/:id(\\d+)", "task-page")
    .add("tasks", "/tasks/:view([a-z]+)?", "tasks")
    .add("milestone-page", "/milestones/:slug", "milestone-page")
    .add("product-page", "/products/:slug", "product-page")
    .add("profile-page", "/@:username", "profile-page")
    .add(
        "profile-page-updates",
        "/@:username/updates",
        "profile-page/updates-tab"
    )
    .add(
        "profile-page-products",
        "/@:username/products",
        "profile-page/products-tab"
    )
    .add(
        "profile-page-discussions",
        "/@:username/discussions",
        "profile-page/discussions-tab"
    )
    .add("discussions-top", "/discussions", "discussions-top")
    .add("discussion-page", "/discussions/:slug", "discussion-page")
    .add("apps", "/apps/:app?", "apps")
    .add("explore", "/explore/:view?", "explore")
    .add("search", "/search/:view?", "search")
    .add("wellness", "/wellness", "wellness")
    .add("live", "/live", "live")
    .add("events", "/events", "events")
    .add("about", "/about", "about")
    .add("deals", "/deals", "deals")
    .add("settings", "/settings", "settings")
    .add("event-page", "/events/:slug/", "event-page")
    .add("event-host", "/events/host/", "event-host")
    .add("event-stream-live", "/events/:slug/live", "event-stream-live")
    .add(
        "event-attendee-panel",
        "/events/:slug/attendance",
        "event-attendee-panel"
    )
    .add("products", "/products", "products");
