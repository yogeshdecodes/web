const routes = require("next-routes");

// order of arguments
// 1. file path
// 2. url
// 3. route name

module.exports = routes()
    .add("home", "/", "home")
    .add("log", "/log", "log")
    .add("login", "/login", "login");
