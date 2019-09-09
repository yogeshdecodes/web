require("dotenv").config();

const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const withProgressBar = require("next-progressbar");
const withOptimizedImages = require("next-optimized-images");
const withFonts = require("next-fonts");

let config = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.plugins = config.plugins || [];
    config.node = {
      fs: "empty"
    };

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

    return config;
  }
};

config = withProgressBar(config);
config = withOptimizedImages(config);
config = withFonts(config);
config = withSass(config);
config = withCss(config);

module.exports = config;
