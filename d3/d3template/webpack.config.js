var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: [
    "./src/index"
  ],
  devtool: process.env.WEBPACK_DEVTOOL || "source-map",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".js"]
  },
  module: {
    loaders: [
      {test: /.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /(\.css)$/, loaders: ['style', 'css']},
      {test: /\.scss$/, loaders: ["style", "css", "sass"]}
    ]
  },
  devServer: {
      contentBase: "./dist",
      noInfo: false,+
      hot: true,
      inline: true
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
     d3: "d3",
     $:  "jQuery"
    })
  ]
};
