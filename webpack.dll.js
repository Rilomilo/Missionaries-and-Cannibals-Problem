const { resolve } = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    entry: {
        bundle:['vue','vuex','vue-router']
    },
    output: {
        filename: '[name]-[hash:10].js',
        path: resolve(__dirname, 'dll'),
        library:'[name]_[hash]'
    },
    plugins: [
        new webpack.DllPlugin({
            name:'[name]_[hash]',
            path:resolve(__dirname,'dll/manifest.json')
        }),
        new BundleAnalyzerPlugin({
            analyzerMode:'static',
            analyzerHost:'127.0.0.1',
            analyzerPort:8888,
            openAnalyzer:false
        })
    ],
    mode: 'production'
};
