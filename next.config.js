require("dotenv").config();

const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const withProgressBar = require("next-progressbar");
const withOptimizedImages = require("next-optimized-images");
const withFonts = require("next-fonts");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true"
});

let config = {
    webpack: config => {
        // Fixes npm packages that depend on `fs` module
        config.plugins = config.plugins || [];
        config.node = {
            //   fs: "empty"
        };
        config.stats = {
            ...config.stats,
            warningsFilter: warn =>
                warn.indexOf("Conflicting order between:") > -1
        };

        config.plugins = [
            ...config.plugins,
            /*new CircularDependencyPlugin({
                // exclude detection of files based on a RegExp
                exclude: /a\.js|node_modules/,
                // add errors to webpack instead of warnings
                failOnError: false,
                // allow import cycles that include an asyncronous import,
                // e.g.
                allowAsyncCycles: false,
                // set the current working directory for displaying module paths
                cwd: process.cwd()
            }),
            */

            // Read the .env file
            new Dotenv({
                path: path.join(__dirname, ".env"),
                systemvars: true
            })
        ];

        config.plugins.push(
            new FilterWarningsPlugin({
                exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
            })
        );
        return config;

        return config;
    }
};

config = withProgressBar(config);
config = withOptimizedImages(config);
config = withFonts(config);
config = withSass(config);
config = withCss(config);
config = withBundleAnalyzer(config);

module.exports = config;
