var path = require("path");

let config = {
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
      },
    ],
  },
};
const configDashboard = Object.assign({}, config, {
  name: "configDashboard",
  entry: "./Dashboard/Development/index.js",
  output: {
    filename: "dashboard.js",
    path: path.resolve(__dirname, "Dashboard/Production"),
  },
});

const configUserRooms = Object.assign({}, config, {
  name: "configUserRooms",
  entry: "./user-rooms/Development/index.js",
  output: {
    filename: "user-rooms.js",
    path: path.resolve(__dirname, "user-rooms/production"),
  },
});
module.exports = [configDashboard, configUserRooms];
