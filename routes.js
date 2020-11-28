const routes = require("next-routes");

// order of arguments
// 1. route name
// 2. url
// 3. file path

module.exports = routes()
    .add("home", "/", "home")
    .add("log", "/log", "log")
    .add("forgot", "/forgot", "forgot")
    .add("start-setup", "/start/setup/", "start/setup")
    .add("auth-complete", "/auth/complete/:provider/", "auth/complete")
    .add("start", "/start", "start")
    .add("login", "/login", "login")
    .add("task-page", "/tasks/:id(\\d+)", "task-page")
    .add("tasks", "/tasks", "tasks")
    .add("tasks-list", "/tasks/list", "tasks-list")
    .add("tasks-kanban", "/tasks/kanban", "tasks-kanban")
    .add("products-add", "/products/add", "products-add")
    .add("product-edit", "/products/:slug/edit", "product-edit")
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
    .add("gold", "/gold", "gold")
    .add("gold-discussions", "/gold/discussions", "gold/discussions")
    .add("events", "/events", "events")
    .add("about", "/about", "about")
    .add("faq", "/about/faq", "about/faq")
    .add("legal", "/about/legal", "about/legal")
    .add("contact", "/about/contact", "about/contact")
    .add("settings", "/settings", "settings")
    .add("events-host", "/events/host/", "events-host")
    .add("event-page", "/events/:slug", "event-page")
    .add("gold-page", "/gold", "gold-page")
    .add("products", "/products", "products")
    .add("blog", "/stories", "blog")
    .add("blog-tag", "/stories/tags/:slug", "blog/tag")
    .add("blog-post", "/stories/:slug?", "blog/post")
    .add("ads", "/ads", "ads");
