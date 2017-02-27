module.exports = {
  entry: {
  	app: [
  		'./public/src/index.js',
  	]
  },
  output: {
  	path: './public/bin',
  	filename: 'index.bundle.js'
  }
};