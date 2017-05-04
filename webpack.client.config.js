const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [
    './assets/javascripts/entry.client.js'
  ],
  output: {
    filename: 'app.client.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  devtool: process.env.NODE_ENV === 'production' ? false : '#source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ 'env', 'babel-preset-stage-3' ]
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      // If using vue-loader, the *.vue file will be pre-compiled. You don't need the compiler.
      'vue$': 'vue/dist/vue.runtime.esm.js'
      // If not using vue-loader, you need the compiler + runtime
      // 'vue$': 'vue/dist/vue.esm.js'
      // 'rx$': require.resolve('rx/dist/rx')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"client"'
    })
  ]
}
