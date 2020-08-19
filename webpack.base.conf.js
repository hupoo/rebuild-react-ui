const {resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HappyPack = require("happypack");
const os = require("os");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 根据 cpu 数量创建线程池
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length - 1 });
const WebpackBar = require('webpackbar')
const TerserPlugin = require('terser-webpack-plugin'); //js 压缩
const OptimizeCssPlugin =  require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV !== 'production' //开发环境
const isPro = process.env.NODE_ENV !== 'development'; //生产环境


const getCssLoaders = (importLoaders) => [
  isDev ? 'style-loader': MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: isDev,
      importLoaders,
    },
  },
  {
    loader: 'postcss-loader',
  },
]




module.exports = {
  entry: {
    app: resolve(__dirname, "./src/index.js"),
  },
  output: {
    filename:`assets/js/[name]${isDev ? '' : '.[hash:8]'}.js` ,
    path: resolve(__dirname, "./dist"),
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  optimization:{
    minimize: isPro,
    minimizer:[
      isPro && new TerserPlugin({ // js压缩
       parallel: true, // 使用多进程并行运行来提高构建速度。并行运行的默认数量: os.cpus () . length-1
          extractComments: false, //启用/禁用提取注释。 默认 true
           terserOptions: {
          compress: { pure_funcs: ['console.log'] },  //压缩代码 去除consol.log
        }
      }),
      isPro && new OptimizeCssPlugin()
    ].filter(Boolean),
    splitChunks: {
      name: true,
      chunks: "all",
      cacheGroups: {
        commons: {
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 1, // This is example is too small to create commons chunks
          test:/src/,
          reuseExistingChunk:true

        },
        vendors: {
          test: /node_modules/,
          reuseExistingChunk:true
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["happypack/loader?id=jsx"],
      },
      {
        test: /\.css$/,
        use: getCssLoaders(0)
      },
      {
        test: /\.less$/,
        use: [...getCssLoaders(2),  "less-loader"],
      },

      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
        options: {
          limit: 10*1024,
          outputPath: "assets/images",
          name: "[name].[contenthash:8].[ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|mp4)$/,
        loader: "url-loader",
        options: {
          limit: 10*1024,
          outputPath: "assets/fonts",
          name: "[name].[contenthash:8].[ext]",
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
            cacheDirectory: true,
          },

          include: /src/
        }
      ]
    }),
    new HtmlWebpackPlugin({
      inject: true,
      title: "webpack",
      template: "./public/index.html",
      minify: isDev ? false : {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        useShortDoctype: true,
      }
    }),
    new WebpackBar({
      name: isDev ? '正在启动' : '正在打包',
      color: '#fa8c16',
    }),
    new CopyWebpackPlugin(
      [
        {
           from: resolve(__dirname, './public'),
          to:   resolve(__dirname,"./dist"),
          toType: 'dir',
        }
      ]
    ),
    
    isPro && new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash:8].css',
      chunkFilename: 'assets/css/[name].[contenthash:8].css',
      ignoreOrder: false,
    }) 

  ].filter(Boolean),
};
