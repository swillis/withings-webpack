module.exports = {
  entry: './app/test.js',
  output: {
    filename: 'dist/app.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel",
      query: {
        presets: ["es2015"]
      }
    }]
  },
  resolve: {
      modulesDirectories: "node_modules"
    }
};
