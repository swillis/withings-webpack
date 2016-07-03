const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    './source/js/main.js',
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/assets/',
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel",
      query: {
        presets: [
          "es2015",
          "react"
        ]
      }
    }]
  },
  resolve: {
      modulesDirectories: ["node_modules"]
  },
  plugins: [
    new CopyWebpackPlugin([{ from: './index.html' }]),
		new CopyWebpackPlugin([{ from: './source/css/' }]),
  ],
};
