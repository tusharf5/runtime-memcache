const path = require('path');

const umd = {
  entry: {
    index: path.resolve(__dirname, './dist/cjs/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist/umd'), // builds to ./dist/umd/
    filename: '[name].js', // index.js
    library: 'RMC', // aka window.RMC
    libraryTarget: 'umd', // supports commonjs, amd and web browsers
    globalObject: 'this',
    libraryExport: 'default',
  },
  module: {
    rules: [{ test: /\.t|js$/, use: 'babel-loader' }],
  },
};

module.exports = [umd];
