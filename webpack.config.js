const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/rainworld-tracker.js',
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: 'rainworld-tracker.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },
        ]
    },
    devtool: 'eval-source-map'
}