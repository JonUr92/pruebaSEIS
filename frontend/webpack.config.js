const path = require('path');
const BabelPolyFill = require("babel-polyfill");
const { VueLoaderPlugin } = require("vue-loader")
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: ["babel-polyfill", './src/main.js'],
    output: {
        path:  path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            { 
                test: /\.css$/, 
                //use: ['style-loader','css-loader'],
                loader: [
                    MiniCSSExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                /* test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {}
                }] */
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, './src'),
            "Components": path.resolve(__dirname, './src/components/')
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCSSExtractPlugin()
    ]
}