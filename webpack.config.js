const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './public/js/avatars-select.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname + '/public/js', 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/, exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|mp3)$/i,
                loaders: ['file-loader']
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader :'css-loader'
                        },
                        {
                            loader : 'sass-loader',
                            options: {
                                includePaths: ['./public/img/']
                            }
                        }
                    ]

                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
};
