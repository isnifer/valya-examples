var webpack = require('webpack');
var path = require('path');

var entry = {};
var examples = [
    'original',
    'initialValidation',
    'multipleValidators',
    'externalValidator',
    'async',
    'foma',
    'fomaWarning',
    'birthday',
    'unlimitedGroups',
    'emailPhone',
    'fomaAsync',
    'table'
];

examples.forEach(function (element) {
    entry[element] = './' + element + '/src';
});

entry['.'] = './src';

module.exports = {
    entry: entry,
    output: {
        path: __dirname,
        filename: '[name]/index.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
