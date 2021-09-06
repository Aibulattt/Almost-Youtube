const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const  HtmlWebpackPlugin  = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';

function setUpDevtool() {
    if(IS_DEV ) {
        return 'eval';
    }
    if(IS_PROD) {
        return false;
    }
}

module.exports = {
    devServer: {
        port: 8081,
        historyApiFallback: true,
        contentBase: './',
        hot: true,
        proxy: { "/api/**": { target: 'https://almost-youtube.herokuapp.com', secure: false }  }
     },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            'react-dom': IS_DEV ? '@hot-loader/react-dom' : 'react-dom',
        }
    },
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: [
        path.resolve(__dirname, './src/index.jsx'),
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        publicPath: '',
    },
    module: {
        rules: [
            {
                test: /\.[j]sx?$/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
                       {
                        loader: MiniCssExtractPlugin.loader,
                        options : {
                        },
                       },
                       'css-loader'
                    ]
            }
        ]
    },
    plugins: [
            new Dotenv({
                path: path.resolve(__dirname,'.env')
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
        ],
    devtool: setUpDevtool()
}
