const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const umd = {
  entry: {
    index: path.resolve(__dirname, './dist/esm/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist/umd'), // builds to ./dist/umd/
    filename: '[name].js', // index.js
    library: 'RMStore', // aka window.RMStore
    libraryTarget: 'umd', // supports commonjs, amd and web browsers
    globalObject: 'this',
    libraryExport: 'default',
    umdNamedDefine: true,
  },
  module: {
    rules: [{ test: /\.t|js$/, use: 'babel-loader' }],
  },
  plugins: [new CopyPlugin([{ from: 'dist/esm/*.d.ts', to: '../umd/[name].[ext]' }])],
};

module.exports = [umd];
