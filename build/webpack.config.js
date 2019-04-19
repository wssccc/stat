"use strict";
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const config = require('./config')

let outputDirectory = path.resolve(config.outputDirectory);
let sourceDirectory = path.resolve(config.sourceDirectory);

const isDev = () => {
  return process.env.NODE_ENV === 'development';
}

module.exports = {
  devtool: isDev() ? 'inline-source-map' : undefined,
  devServer: {
    contentBase: outputDirectory,
    hot: true
  },
  entry: {
    app: sourceDirectory + '/app.js'
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [outputDirectory]
    }),
    new HtmlWebpackPlugin({
      template: sourceDirectory + '/index.ejs',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyPlugin([
      {from: sourceDirectory + '/favicon.ico', to: outputDirectory + '/favicon.ico'}
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: outputDirectory,
              hmr: isDev(),
            },
          },
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[hash:7].[ext]'
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: sourceDirectory
      },
    ]
  },
  output: {
    filename: 'app.js',
    path: outputDirectory
  }
};
