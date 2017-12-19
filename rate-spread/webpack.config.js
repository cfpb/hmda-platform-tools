const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('../webpack.common.js')

module.exports = merge(common, {
  entry: {
    main: './rate-spread/src/js/index.js'
  },
  output: {
    filename: 'app.min.js'
  }
})
