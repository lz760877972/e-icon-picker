const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let extractTextPlugin = new ExtractTextPlugin({
    filename: "[name].css",
    allChunks: false
});

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        index :'./src/index.js',
        main:'./src/main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: '[name].js',
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
               /* loader: 'babel-loader',*/
                use: {
                    loader: 'babel-loader',
                    /*options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true,
                        plugins: ['@babel/transform-runtime']
                    }*/
                }
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
                   /* 'style-loader',*/
                    {
                        loader:  MiniCssExtractPlugin.loader,
                    }
                   ,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-import')(),
                                require('autoprefixer')()
                            ]
                        }
                    }
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
    optimization: {
       /* splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /font-awesome/,
                    name: 'vendor',
                    chunks: 'all'//async all  initial
                }
                ,
                default: false,
                vendors: false
            }
        },*/
        runtimeChunk: false
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
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            // cssProcessorOptions: cssnanoOptions,
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
