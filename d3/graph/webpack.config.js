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
      {test: /\.scss$/, loaders: ["style", "css", "sass"]},
      {test: /\.(jpe?g|png|gif|svg)$/i,loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]}
    ]
  },
  devServer: {
      contentBase: "./dist",
      noInfo: false, //  --no-info option
      hot: true,
      inline: true
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
     d3: "d3"
    })
  ]
};
