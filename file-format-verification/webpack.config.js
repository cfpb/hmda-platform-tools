const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('../webpack.common.js')

module.exports = merge(common, {
  entry: {
    main: './file-format-verification/src/js/index.js'
  },
  output: {
    filename: 'app.min.js'
  }
})
