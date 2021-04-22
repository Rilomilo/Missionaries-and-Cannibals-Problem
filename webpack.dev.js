const { resolve } = require("path")
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        // filename: 'js/[name]-[contenthash:10].js',
        filename: 'js/[name]-[hash].js',
        path: resolve(__dirname, 'dist'),
        // chunkFilename:'js/[name]-chunk-[hash].js'
    },
    // mode: 'development',
    mode:'production',
    // devtool: 'cheap-module-eval-source-map',
    // devtool:false,
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            vue$: 'vue/dist/vue.runtime.esm.js'
        },
        extensions:['.js','.vue','.ts'],
        modules:[
            resolve(__dirname,'node_modules')
        ]
    },
    optimization:{
        splitChunks:{
            chunks:'all',
            minSize: 30 * 1024, //30KB
            maxSize:1024*1024 //1MB
        }
    },
    externals: {
	    'vue': 'Vue',
        'element-ui': 'Element'
	},
    module: {
        rules: [{
            test: /\.ts$/,
            loader: "ts-loader",
            options: { appendTsSuffixTo: [/\.vue$/] },
        },
        {
            test:/\.html$/,
            loader:'html-loader'
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.(jpg|jpeg|svg|png|gif)$/,
            loader: 'url-loader',
            options: {
                limit: 8 * 1024, // 小于8kB的base64编码处理
                name: 'image/[name]-[hash:10].[ext]',
                esModule:false
            }
        },
        {
            test: /\.(woff|eot|ttf|otf)$/,
            loader:'url-loader',
            options:{
                limit: 16*1024,
                name:'font/[name]-[hash:10].[ext]'
            }
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: true
        }),
        new BundleAnalyzerPlugin({
            analyzerMode:'static',
            analyzerHost:'127.0.0.1',
            analyzerPort:8888,
            openAnalyzer:false
        }),
        // new webpack.DllReferencePlugin({
        //     manifest:resolve(__dirname,'dll/manifest.json')
        // }),
        new AddAssetHtmlPlugin([
            {
                filepath: resolve('./dll/*.js'),
                outputPath:'js/',
                publicPath:'js/'
            },
            {
                typeOfAsset:'css',
                filepath: resolve('./dll/*.css'),
                outputPath:'css/',
                publicPath:'css/',
                hash:true
            }
        ]),
        new webpack.NamedModulesPlugin(),
        new FriendlyErrorsPlugin()
    ],
    devServer:{
        contentBase:resolve(__dirname,'dist'),
        watchContentBase:true,
        hot:true,
        historyApiFallback:true,
        proxy:{
            '/gateway':{
                target:'https://m.maizuo.com',
                changeOrigin:true
            }
        }
    }
}