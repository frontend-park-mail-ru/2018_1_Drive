const path = require('path');

module.exports = {
    entry: './public/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname + '/public/js', 'dist')
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/}
        ],
        rules: [{
            test: /\.pug$/,
            loader: 'pug-loader'
        }]
    },

};
