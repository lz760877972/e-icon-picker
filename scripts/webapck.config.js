const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const devMode = 'production';//development  production

module.exports = {
    devtool: false,
    mode: devMode,
    entry: {
        'index': './src/css.js'
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        publicPath: './',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            // Prefer `dart-sass`
                            implementation: require("sass"),
                        },
                    },
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
            }
        ]
    },
    optimization: {
        runtimeChunk: false
    },

    plugins: [
        new CleanWebpackPlugin(),
        //参数是一个数组，数组中是需要删除的目录名
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true,
                    },
                    normalizeUnicode: false
                }]
            },
            canPrint: true
        })
    ]
};
