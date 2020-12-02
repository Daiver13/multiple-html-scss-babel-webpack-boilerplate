const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {
    // splitChunks: {
    //   chunks: 'all'
    // }
  }

  if (isProd) {
    // config.minimizer = [
    //   new OptimizeCssAssetsWebpackPlugin(),
    //   new TerserWebpackPlugin()
    // ]
  }

  return config
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  devtool: isDev ? 'cheap-module-source-map' : false,
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 3000
  },
  optimization: optimization(),
  entry: {
    'exp1': './exp1/index.js',
    // 'exp2': './exp2/main.js'
  },
  output: {
    publicPath: '',
    filename: '[fullhash].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|ttf|otf|eot)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            // context: '',

            // context: 'project',
            // publicPath: './',
            // outputPath: (url, resourcePath, context) => {
            //   console.log('outputPath - url', url)
            //   // console.log('outputPath - url replace', url.replace('exp1/', ''))
            //   console.log('outputPath - resourcePath', resourcePath)
            //   console.log('outputPath - context', context)
            //   // debugger
            //   // `resourcePath` is original absolute path to asset
            //   // `context` is directory where stored asset (`rootContext`) or `context` option

            //   // To get relative path you can use
            //   // const relativePath = path.relative(context, resourcePath);

            //   return 'exp1/' +

            //   if (/my-custom-image\.png/.test(resourcePath)) {
            //     return `other_output_path/${url}`;
            //   }

            //   if (/images/.test(context)) {
            //     return `image_output_path/${url}`;
            //   }

            //   return `output_path/${url}`;
            // },
          }
        }
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      ignoreOrder: false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '/exp1/index.html'),
      filename: 'index.html',
      inject: true,
    }),
  ]
};