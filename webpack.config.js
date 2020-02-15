const webpack = require('webpack');


module.exports = {
  // 1
  entry: './src/index.js',
  // Babel Loader
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'/*,'eslint-loader'*/],
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  // 2
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  // hot module reload
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  // 3
  devServer: {
    contentBase: './dist',
    hot: true,
  },
};
