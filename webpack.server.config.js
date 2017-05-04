const path = require('path')
const webpack = require('webpack')
const { VueSSRServerPlugin } = require('vue-ssr-webpack-plugin')

module.exports = {
  entry: {
    'app': './assets/javascripts/entry.server.js'
  },
  output: {
    filename: 'app.server.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
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
        loader: 'vue-style-loader!css-loader'
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
    }
  },
  plugins: [
    new VueSSRServerPlugin(),
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"'
    })
  ],
  externals: Object.keys(require('./package.json').dependencies)
}
