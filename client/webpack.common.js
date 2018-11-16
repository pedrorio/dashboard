 const path = require('path');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
 entry: path.resolve(__dirname,'src/index.tsx'),
 output: {
   path: path.resolve(__dirname, "dist"),
   filename: '[name].[hash].bundle.js',
   publicPath: '/'
 },
 module: {
   rules: [
     {
       test: /\.tsx?$/,
       loader: 'awesome-typescript-loader'
     },
     {
       enforce: 'pre',
       test: /\.js$/,
       loader: 'source-map-loader'
     },
     {
       test: /\.css$/,
       use: [
         "css-loader"
       ]
     }
   ]
 },
 plugins: [
     new CleanWebpackPlugin(['dist']),
     new HtmlWebpackPlugin({
       title: 'Birdie Challenge',
       template: 'index.html',
   })
 ],
 resolve: {
   extensions: ['.tsx', '.ts', '.jsx', '.js']
 }
};
