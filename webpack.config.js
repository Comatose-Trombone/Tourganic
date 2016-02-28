var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client/components/App.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015','react']
        }
      },
      {
        test: /\.css$/, loader: "style-loader!css-loader"
      }

    ]
  }

}
    