const webpack = require('webpack');
const path = require('path');

const config = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    module: {
        rules: [
                {
                test: /\.css$/,
                use:  [
                   'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                type: 'asset/resource',
            },
        ],
    }

}

module.exports = config;