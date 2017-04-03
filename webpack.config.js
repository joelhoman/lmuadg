module.exports = {
  entry: {
    app: [
      './public/src/index.js',
      './public/src/e_board.js',
    ],
  },
  output: {
    path: './public/bin',
    filename: 'index.bundle.js',
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    module: 'empty',
  },
};
