const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

console.log('path', path.resolve(__dirname, 'src'))

module.exports = {
  context: path.resolve(__dirname, 'src'),
  devtool: 'source-map',
  entry: {
    'pdf1': './pdf1/main.js',
    // 'pdf2': './pdf2/main.js'
  },
  output: {
    // path: __dirname,
    // filename: "build/[name]/bundle.js"
    filename: '[name]/[hash:20].js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '/pdf1/index.html'),
      chunks: ['page1'],
      filename: 'pdf1/index.html'
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, '/pdf2/index.html'),
    //   chunks: ['page2'],
    //   filename: 'pdf2/index.html'
    // }),

  ]
};