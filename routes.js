const routes = require("next-routes");

// order of arguments
// 1. route name
// 2. url
// 3. file path

module.exports = routes()
    .add("home", "/", "home")
    .add("log", "/log", "log")
    .add("forgot", "/forgot", "forgot")
    .add("login", "/login", "login")
    .add("tasks", "/tasks/:view?", "tasks")
    .add("product-page", "/products/:slug", "product-page")
    .add("profile-page", "/@:username", "profile-page")
    .add("discussions", "/discussions", "discussions")
    .add("discussion-page", "/discussions/:slug", "discussions")
    .add("products", "/products", "products");
