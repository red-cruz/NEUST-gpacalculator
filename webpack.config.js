const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    main: "./js/main.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].min.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  mode: "development",
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  watch: true,
};
