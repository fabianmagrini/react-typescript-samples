const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    port: 3002,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  resolve: { extensions: ['.ts', '.tsx', '.js'] },
  module: { rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }] },
  plugins: [
    new ModuleFederationPlugin({
      name: 'remote_latest',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
        // CRITICAL: Expose this remote's own instance of React for the bridge
        './react': 'react',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};