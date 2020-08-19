const {merge} = require("webpack-merge");
const {resolve} = require("path");
const baseConfig = require("./webpack.base.conf");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const glob = require('glob')
module.exports = merge(baseConfig, {
  mode: "production",
  devtool: 'none',
  plugins: [
    new CleanWebpackPlugin(),
    new PurgeCSSPlugin({
    paths: glob.sync(`${resolve(__dirname, './src')}/**/*.{js,tsx,scss,less,css}`, { nodir: true }),
  }),
  new WebpackBundleAnalyzer(
    {
      analyzerMode: 'server',                   // 开一个本地服务查看报告
      analyzerHost: '127.0.0.1',            // host 设置
      analyzerPort: 8888,                           // 端口号设置
    }
  )
],
});
