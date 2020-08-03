const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
    mode: `development`,

    watch: true,
    entry: `./src/index.js`,

    output: {

        filename: `bundle.js`,
        path: path.join(
            __dirname, `./public`)
    },
    devtool: `source-map`,
    plugins: [
      new MomentLocalesPlugin({
          localesToKeep: [`es-us`],
      }),
  ],

    module: {
        rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
                loader: `babel-loader`,
              },
            },
            {
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader' ]
          }
          ],
    },
    devServer: {
        contentBase: path.join(__dirname, `public`),
        compress: false,
        open: true,
        port: 1337,
        historyApiFallback: true,

    }
};