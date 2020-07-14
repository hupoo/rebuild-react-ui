const {merge}  = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const webpack = require('webpack');
// console.log(baseConfig)
const output = merge(baseConfig, {
  mode:'development',
  devtool: "cheap-module-eval-source-map",
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: "./dist",
    inline: true,
    historyApiFallback: true,
    hot: true, //热更新
    hotOnly: true,
    open:true
  },
}
);
console.log(output)
module.exports = output;
