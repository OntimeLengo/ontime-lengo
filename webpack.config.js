const path = require('path');

module.exports = {

  target: 'node',

  entry: {
    main: path.resolve(__dirname, 'src', 'index.ts')
  },

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build')
  },

  devtool: 'source-map',

  // externals: {},

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'ts-loader',
        exclude: [
          /node_modules/
        ]
      }
    ]
  },

  plugins: []

};
