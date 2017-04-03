let path = require('path');
let webpack = require('webpack');

module.exports = {
  entry: {
    app: [
      './public/src/index.js',
      './public/src/e_board.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, './public/bin'),
    filename: 'index.bundle.js',
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    module: 'empty',
  },
};
