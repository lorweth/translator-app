const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['react-hot-loader/patch', './src/index.tsx'],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
        "src": path.resolve('./src'),
        'react-dom': '@hot-loader/react-dom'
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public", "index.html"),
      inject: 'body',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      { 
        test: /\.(json)$/, 
        use: { 
          loader: 'file-loader', 
          options: { name: '[name].[ext]', outputPath: './' } 
        } 
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        use: ['url-loader'],
      },
    ],
  },
};
