var path = require('path')                                                    // eslint-disable-line
var extractEntries = require('../lib/extractEntries').default                 // eslint-disable-line

module.exports = {
  entry: extractEntries(path.join(__dirname, './index.js')),
  output: {
    path: __dirname,
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
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
