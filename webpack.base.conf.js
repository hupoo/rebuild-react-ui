const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HappyPack = require("happypack");
const os = require("os");
// 根据 cpu 数量创建线程池
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length - 1 });
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "assets/js/[name].[hash:8].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },   
  module: {
    rules: [
         {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: "happypack/loader?id=jsx",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader",'less-loader'],
      },
   
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
        options: {
          limit: 1000,
          outputPath: "assets/images",
          name: "[name].[hash:base64:8].[ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|mp4)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          outputPath: "assets/fonts",
          name: "[name].[hash:base64:8].[ext]",
        },
      },
    ],
  },
  plugins: [

    new HappyPack({
      id:'jsx',
      threadPool:happyThreadPool,
      loaders: [
        {
          loader: "babel-loader",
          options: {
            // presets: ['@babel/preset-react',"@babel/preset-env"] ,
            // plugins: ["@babel/plugin-transform-runtime"],
            // cacheDirectory: true,
          },
          include: /src/
        }
      ]
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./index.html",
    }),
  ],
};
