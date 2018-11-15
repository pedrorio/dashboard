const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname,'src/index.tsx'),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'bundle.js',
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
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],
    devtool: "source-map",
    devServer: {
        index: 'index.html',
        historyApiFallback: true,
        compress: true,
        port: 3000,
        host: '0.0.0.0',
        disableHostCheck: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    }
};
