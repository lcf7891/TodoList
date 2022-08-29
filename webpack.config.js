const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'assets/js/[name].[hash:6].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  'autoprefixer',
                  postcssPresetEnv({ browsers: 'last 2 versions' }),
                ]
              },
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      }
    ],
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8080,
    open: true,
    watchFiles: ['src/**/*.*', 'public/**/*'],
    hot: true,
    client: {
      overlay: true,
      reconnect: true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Todo List',
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new CleanWebpackPlugin(),
    new PurgecssPlugin({
      paths: glob.sync(
        [
          `${path.resolve(__dirname, 'src')}/**/*`, // 配置需解析檔案
          path.resolve(__dirname, 'node_modules/jquery/dist/jquery.slim.js'),
          path.resolve(__dirname, 'node_modules/bootstrap/dist/js/bootstrap.bundle.js'),
          path.resolve(__dirname, 'node_modules/axios/dist/axios'),
        ],
        {
          nodir: true, // 過濾資料夾結果
        }
      ),
    }),
    new MiniCssExtractPlugin({
      runtime: false,
      filename: './assets/style/[name].[hash:6].bundle.css',
    }),
  ]
};
