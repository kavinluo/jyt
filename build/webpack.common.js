const path = require('path')
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// 提取css为单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, '../src/main.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: process.argv[2] !== 'serve' ? 'static/js/[name].[contenthash:10].js' : 'static/js/[name].js',
    environment: {
      // 是否使用箭头函数
      // The environment supports arrow functions ('() => { ... }').
      arrowFunction: false,
      // The environment supports BigInt as literal (123n).
      bigIntLiteral: false,
      // The environment supports const and let for variable declarations.
      const: false,
      // The environment supports destructuring ('{ a, b } = obj').
      destructuring: false,
      // The environment supports an async import() function to import EcmaScript modules.
      dynamicImport: false,
      // The environment supports 'for of' iteration ('for (const x of array) { ... }').
      forOf: false,
      // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
      module: false
    }
  },
  resolve: {
    fallback: { 'path': require.resolve('path-browserify') },
    // 配置省略文件路径后缀名
    extensions: ['.vue', '.js', '.css', '.less'],
    // 配置别名
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      // 在import时使用了别名需要安装eslint-import-resolver-webpack
      '@': path.resolve(__dirname, '../src'),
      '_c': path.resolve(__dirname, '../src/components'),
      '_v': path.resolve(__dirname, '../src/views')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        oneOf: [
          {
            test: /\.svg$/,
            loader: 'svg-sprite-loader',
            include: [path.resolve(__dirname, '../src/assets/icon')],
            options: {
              symbolId: 'icon-[name]'
            }
          },
          /**
           * css与less样式文件处理
           * 提取css单独文件 mini-css-extract-plugin插件
           */
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader'
            ]
          },
          {
            test: /\.less$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              'less-loader'
            ]
          },
          {
            test: /\.js$/,
            // 排除
            exclude: '/node_modules/',
            loader: 'babel-loader'
          },
          // 处理图片资源 webpack5已经废弃url-loader，使用type
          {
            test: /\.(png|jpg|jpeg|gif)$/,
            type: 'asset/resource',
            exclude: [path.resolve(__dirname, '../src/assets/icon/')],
            generator: {
              filename: process.argv[2] !== 'serve' ? 'static/img/[name].[contenthash:10].[ext]' : 'static/img/[name].[ext]'
            }
          },
          // 处理字体资源
          {
            test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
            type: 'asset/resource',
            generator: {
              filename: process.argv[2] !== 'serve' ? 'static/font/[name].[contenthash].[ext]' : 'static/font/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 每次构建清理dist文件夹
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      Vue: ['vue/dist/vue.esm.js', 'default']
    }),
    new MiniCssExtractPlugin({
      filename: process.argv[2] !== 'serve' ? 'static/css/[name].[contenthash:10].css' : 'static/css/[name].css'
    }),
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
    }),
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  target: ['web', 'es5']
}
