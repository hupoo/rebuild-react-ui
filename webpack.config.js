const { merge } = require("webpack-merge")
const baseConfig = require("./webpack.base.conf")
const webpack = require("webpack")
const SERVER_HOST = "127.0.0.1"
const SERVER_PORT = 9000
console.log("1111")
module.exports = merge(baseConfig, {
	mode: "development",
	devtool: "eval-source-map",
	plugins: [new webpack.HotModuleReplacementPlugin()],
	devServer: {
		contentBase: "./dist",
		inline: true,
		host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
		port: SERVER_PORT, // 指定端口，默认是8080
		historyApiFallback: true,
		hot: true, //热更新
		hotOnly: true,
		open: false,
		stats: "errors-only", // 终端仅打印 error
		clientLogLevel: "silent", // 日志等级
		compress: true, // 是否启用 gzip 压缩
	},
})
