require("dotenv").config();

const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = (env = {}) => {
  console.log("env", env);
  return {
    entry: "./src/index.ts",
    output: {
      path: __dirname,
      filename: "index.js"
    },
    module: {
      rules: [{ test: /\.(ts|js)$/, use: "babel-loader" }]
    },
    resolve: {
      extensions: [".ts", ".js"]
    },
    target: env.runtime,
    externals: [],
    plugins: [
      env.analyze && new BundleAnalyzerPlugin(),
      new webpack.EnvironmentPlugin({
        RUNTIME: env.runtime,
        OMDB_API_KEY: process.env.OMDB_API_KEY,
        SPREADSHEET_ID: process.env.SPREADSHEET_ID
      })
    ].filter(Boolean)
  };
};
