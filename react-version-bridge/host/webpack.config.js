const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        remote_legacy: 'remote_legacy@http://localhost:3001/remoteEntry.js',
        remote_latest: 'remote_latest@http://localhost:3002/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
          eager: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};