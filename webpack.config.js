var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        original: './original/src',
        async: './async/src',
        initialValidation: './initialValidation/src',
        foma: './foma/src',
        'foma-warning': './foma-warning/src',
        '.': './src'
    },
    output: {
        path: __dirname,
        filename: '[name]/index.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
