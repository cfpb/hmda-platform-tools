const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: path.resolve(__dirname, process.env.PROJ, 'src/js/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'tools', `${process.env.PROJ}/js`),
    filename: 'app.min.js'
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(
          process.env.TOOLS_ENV ? process.env.TOOLS_ENV : 'production'
        )
      }
    }),
    new UglifyJSPlugin({ sourceMap: true })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, process.env.PROJ, 'src/js'),
          path.resolve(__dirname, 'shared-components')
        ],
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  modules: false,
                  useBuiltIns: true,
                  targets: {
                    browsers: [
                      'Chrome >= 60',
                      'Safari >= 10.1',
                      'iOS >= 10.3',
                      'Firefox >= 54',
                      'Edge >= 15',
                      'ie >= 11'
                    ]
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  }
}
