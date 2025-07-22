const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    port: 3001,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  resolve: { extensions: ['.ts', '.tsx', '.js'] },
  module: { rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }] },
  plugins: [
    new ModuleFederationPlugin({
      name: 'remote_legacy',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
        './WebComponent': './src/App.tsx',
      },
      shared: {
        react: {
          singleton: false,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: false,
          requiredVersion: deps['react-dom'],
        },
        '@module-federation/bridge-react': {
          singleton: true,
          requiredVersion: deps['@module-federation/bridge-react'],
        },
      },
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};