const path = require('path')
const { merge } = require('webpack-merge')
// 导入webpack公共配置
const common = require('./webpack.common')
// 导入配置文件
const config = require('../config/index')
// 压缩js
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
// 提取css为单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 压缩css
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
    ]
  },
  plugins: [
    // 定义全局变量
    new webpack.DefinePlugin({
      'process.env': config.build.env
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:10].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      title: '金医途',
      minify: {
        removeComments: true, // 移除html中的注释
        collapseWhitespace: true // 删除空白符和换行符
      }
    }),
    new ESLintWebpackPlugin({
      fix: true,
      extensions: ['js', 'json', 'coffee']
    }),

    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, '../public'),
        to: path.resolve(__dirname, '../dist'),
        globOptions: {
          dot: true,
          gitignore: true,
          ignore: ['**/*.html']
        }
      }]
    })
  ],
  optimization: {
    // 代码分离
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          // filename: 'vendors1.js',
          priority: -10,
          reuseExistingChunk: true
        },
        default: { // 所有代码分割快都符合默认值，此时判断priority优先级
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true // 允许在模块完全匹配时重用现有的块，而不是创建新的块。
        }
      }
    },
    // 运行的公用文件，设置为single时会将所有的共享依赖合并成一个文件，当有多个入口文件时需要这样做
    runtimeChunk: 'single',
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerWebpackPlugin()
    ]
  }
})
