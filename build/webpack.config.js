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


module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  const ifDev = (o, o2 = undefined) => {
    return isDev ? o : o2;
  }
  return {
    devtool: ifDev('inline-source-map'),
    devServer: {
      contentBase: outputDirectory,
      hot: true
    },
    entry: {
      app: sourceDirectory + '/app.ts'
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
      new webpack.DefinePlugin({
        'window.env': JSON.stringify(argv.mode)
      })
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ['ts-loader', "eslint-loader"],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: outputDirectory,
                hmr: ifDev(true),
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
          exclude: /node_modules/,
          use: ["babel-loader", "eslint-loader"],
          include: sourceDirectory
        },
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json']
    },
    output: {
      filename: 'app.js',
      path: outputDirectory
    }
  };
};
