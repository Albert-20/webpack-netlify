const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ProgressPlugin = require('progress-webpack-plugin');
// const { type } = require('os');

module.exports={
    entry: "./src/index.js",
    output:{
        path: path.resolve(__dirname,"dist"),
        filename:"[name].[contenthash].js",
        assetModuleFilename: 'assets/images/[hash][ext]'
    },
    resolve:{
        extensions:[".js"],
        alias:{
            '@utils':path.resolve(__dirname,'src/utils/'),
            '@templates':path.resolve(__dirname,'src/templates/'),
            '@styles':path.resolve(__dirname,'src/styles/'),
            '@images':path.resolve(__dirname,'src/assets/images/'),
        }
    },
    module:{
        rules:[
            {
                test:/\.m?js$/,
                use:{
                    loader:"babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css|.styl$/i,
                use:[MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'
            ],
            },
            {
                test: /\.png/,
                type:'asset/resource'
            },
            // {
            //     test: /\.(woff|woff2)$/,
            //     use:{
            //         loader:'url-loader',
            //         options:{
            //             limit:false,
            //             mimetype:"application/font-woff",
            //             name: "[name].[ext]",
            //             outputPath: "./assets/fonts/",
            //             publicPath: "./assets/fonts/",
            //             esModule: false,
            //         },
            //     }
            // }
            {
                test: /\.(woff|woff2)$/,
                type:"asset/resource",
                generator:{
                    filename:"assets/fonts/[name][contenthash][ext]"
                }
            }
        ] 
    },
    plugins:[
        new HtmlWebpackPlugin({
            inject:true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname,"src","assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
        new CleanWebpackPlugin(),
        new ProgressPlugin(true),
    ],
    optimization:{
        minimize:true,
        minimizer:[
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]

    }
}