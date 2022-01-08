
const path = require('path')
const { merge } = require('webpack-merge')
const base = require('./webpack.config.js')
module.exports = merge(base, {
    mode: 'development',
    output: {
        publicPath: '/js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        host: 'localhost',
        port: 8080,
        hot: true,
    }
})