var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  context: __dirname,
  entry: [
    './index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
        include: /flexboxgrid/
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules=true&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss',
        exclude: /flexboxgrid/
      },
      {
        test: /\.styl$/,
        loader: 'style!css!postcss!stylus?paths=node_modules'
      },
      { test: /\.js$|\.jsx$/,
        exclude: [/node_modules/],
        loaders: [
          'babel?' + JSON.stringify({presets: ['stage-2', 'es2015', 'react']})
        ]
      }
    ]
  },

  postcss: function() {
    return [autoprefixer];
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};
