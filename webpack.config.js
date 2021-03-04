const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },

  mode: 'development',

  devServer: {
    publicPath: "/build/",
    proxy: {
      '/assets': 'http://localhost:3000',
      '/data': 'http://localhost:3000',
      '/form': 'http://localhost:3000',
      '/event': 'http://localhost:3000',
    },
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        exclude: /(node_modules|bower_components)/, 
        loader: 'html-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules|bower_components)/, 
        // test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // {
      //   test: /\.(sa|sc|c)ss$/,
      //   use: [
      //     devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     // 'postcss-loader',
      //     'sass-loader',
      //   ],
      // },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/, // |bower_components
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
