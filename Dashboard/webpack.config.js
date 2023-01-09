var path = require("path");
module.exports = {
  entry: "./Development/index.js",
  output: {
    filename: "dashboard.js",
    path: path.resolve(__dirname, "Production"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ],
  },
};
