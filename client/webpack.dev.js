const path = require('path');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
 mode: 'development',
 devtool: 'inline-source-map',
 devServer: {
   contentBase: path.resolve(__dirname, "dist"),
   index: 'index.html',
   historyApiFallback: true,
   compress: true,
   port: 3000,
   host: '0.0.0.0',
   disableHostCheck: true
 }
});
