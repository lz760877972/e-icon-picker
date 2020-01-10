const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let extractTextPlugin = new ExtractTextPlugin({
    filename: "[name].css",
    allChunks: false
});

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'index.js',
        library: 'e-icon-picker',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.js', '.vue'],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
           /* {
                test: /\.css$/,
                loader: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader'
                    ],
                }),
            },*/
            {
                test: /\.css$/,
                use: [
                    {
                        loader:  MiniCssExtractPlugin.loader,
                    }
                   ,
                    'css-loader',
                ],
            },
            {
                test: /\.(gif|png|jpg|woff|svg|ttf|eot)\??.*$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false, // 这里设置为false
                            outputPath: 'fonts',
                            name: '[name].[ext]'
                        }
                    }


                ]
                /* loader: {
                     loader: 'url-loader',
                     options: {
                         /!*limit: 80000,*!/
                         name: './fonts/[name].[ext]'
                     }
                 }*/
            }
        ]
    },
/*    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: true
    },*/
    optimization: {
        splitChunks: {
           // chunks: "all",// all async initial
           // minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            // automaticNameDelimiter: "~",
            // name: true,
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /[\\/]node_modules[\\/]font-awesome[\\/]css[\\/]/,
                    chunks: 'async',
                    enforce: true,
                    priority: 10// 优先级
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                common: {
                    name: "common",
                    test: /\.js$/,
                    chunks: "all",
                    priority: 5
                }
              //  default: false
            },

        },
        // runtimeChunk: false
    },
    mode: "production",

    plugins: [
        new CleanWebpackPlugin(),
        // 请确保引入这个插件！
        new VueLoaderPlugin(),
        //参数是一个数组，数组中是需要删除的目录名
       /* extractTextPlugin,*/
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
    ]
};
