const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {

  target: 'node',

  entry: {
    index: path.resolve(__dirname, 'src', 'index.ts'),
    server: path.resolve(__dirname, 'examples', 'server.ts'),
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },

  devtool: 'source-map',

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

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  externals: [nodeExternals()],

  plugins: []

};
