const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const devMode = 'production';//development  production
const pkg = require('../package.json');

const webpack = require('webpack')

const createBanner = () => {
    console.log("createBanner");
    return `
   ${pkg.name} v${pkg.version}
   (c) ${new Date().getFullYear()} ${pkg.author}
   @license ${pkg.license}
  `
}

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
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer"
                                    ],
                                ],
                            }
                        },
                    },
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
        runtimeChunk: false,
        minimize: true,
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            new CssMinimizerPlugin({
                parallel: true,
                minify: [
                    CssMinimizerPlugin.cssnanoMinify
                ],
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: {removeAll: false},
                        },
                    ],
                },
            }),
            // 注意位置，必须放在 TerserPlugin 后面，否则生成的注释描述会被 TerserPlugin 或其它压缩插件清掉
            new webpack.BannerPlugin({
                entryOnly: true, // 是否仅在入口包中输出 banner 信息
                banner: createBanner()
            }),
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        //参数是一个数组，数组中是需要删除的目录名
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
};
