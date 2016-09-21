var path = require('path')
// generate bundles 
module.exports = {
  entry: './example/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    chunkFileName: '[name].js'
  },
  module: {
    loaders: [ {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: [ 'es2015', 'stage-0', 'react' ],
        plugins: [ path.resolve('./src/babel') ]
      }
    } ]  
  }
  
}
