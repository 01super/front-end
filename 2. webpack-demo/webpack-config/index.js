const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HappyPack = require("happypack");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const {
  optimize: { ModuleConcatenationPlugin },
  ProvidePlugin,
} = require("webpack");

// 几种 hash 的区别：
// 1、hash：工程级别
// 是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值

// 2、chunkhash：库级别
// 它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。
// 简单来说这种是根据不同入口来配置的，比如vue-router、vuex、vue等公共入口文件，只要这些没有改变，那么他对应生成的js的hash值也不会改变。

// 3、contenthash：内容级别
// 主要是处理关联性，比如一个 js 文件中引入 css，但是会生成一个 js 文件，一个 css 文件，但是因为入口是一个，导致他们的 hash 值也相同，所以当只有js修改时，关联输出的 css、img 等文件的 hash 值也会改变，这种情况下就需要 contenthash 了。

// 处理 JSX @babel/preset-env
// 处理 vue vue-loader
module.exports = (env, config) => {
  console.log("env: ", env);
  console.log("config: ", config.mode);
  const isDev = config.mode === "development";
  const isProd = config.mode === "production";
  return {
    mode: config.mode,
    /**
     * source-map 源码地图：在开发环境中使用，最为一种调试手段，不应使用在生产环境中
     * 打包后的代码难以阅读，source-mapsource-map记录了原始代码和转换后的代码其对应的原始的位置关系
     */
    devtool: "source-map",
    entry: {
      index: path.resolve(__dirname, "../src/index.js"),
      home: path.resolve(__dirname, "../src/home.js"),
    },
    output: {
      filename: "[name].[contenthash:8].js",
      path: path.resolve(__dirname, "../dist"),
    },
    resolve: {
      // 辅助开启 Scope Hosting 的配置
      // 针对 npm 中第三方模块优先采用 jsnext:next 中指向 ES6 模块化语法的文件
      mainFields: ["jsnext:main", "browser", "main"],
    },
    module: {
      /** 模块的匹配规则 */
      rules: [
        // {
        //   test: /\.js$/,
        //   include: path.resolve(__dirname, "../src"),
        //   exclude: /node_modules/,
        //   use: {
        //     loader: "babel-loader", // 配置在 .babelrc 文件中，配合 @babel/preset-env 实现对 ES5 以上的一些语法的解析
        //   },
        // },
        {
          // 正则表达式，匹配模块的路径
          test: /\.js$/,
          include: path.resolve(__dirname, "../src"),
          exclude: /node_modules/,
          // use中如果有多个loader，会从右向左执行
          use: [
            "happypack/loader?id=babel",
            {
              loader: "./loaders/testLoader.js",
              options: {
                name: "testLoader2",
              },
            },
            {
              loader: path.resolve(__dirname, "../loaders/testLoader.js"),
              options: {
                name: "testLoader1",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      // 多入口，生成 index.html
      new HtmlWebpackPlugin({
        filename: "index.html",
        chunks: ["index"], // 只引用 index.js，多个入口时，需要考虑代码分割，只引用需要的代码块
        template: path.resolve(__dirname, "../src/index.html"),
      }),
      // 多入口，生成 home.html
      new HtmlWebpackPlugin({
        filename: "home.html",
        chunks: ["home"], //  只引用 home.js
        template: path.resolve(__dirname, "../src/index.html"),
      }),
      // 开启 Scope Hosting
      new ModuleConcatenationPlugin(),
      new HappyPack({
        id: "babel",
        loaders: ["babel-loader?cacheDirectory"],
      }),
      isProd &&
        new ParallelUglifyPlugin({
          uglifyjs: {
            output: {
              beautify: false, // 最紧凑输出
              conmment: false, // 注释
            },
            compress: {
              drop_comsole: true,
              collapse_vars: true,
              reduce_vars: true,
            },
          },
        }),
      // 只有用到了，才会导入，并且使用一个立即执行函数包裹，不会污染全局变量
      new ProvidePlugin({
        _: "lodash",
      }),
    ].filter(Boolean),
    optimization: {
      splitChunks: {
        // webpack 默认支持动态引入语法 import("chunkname.js")，会在打包时单独生成一个包
        chunks: "all", // inital 入口chunk， async 异步导入的文件，all 全部
        cacheGroups: {
          verdor: {
            name: "vendor",
            priority: 1,
            test: /node_modules/,
            minSize: 0,
            minChunks: 1,
          },
          common: {
            name: "common",
            priority: 0,
            minSize: 0,
            minChunks: 2,
          },
        },
      },
    },
  };
};

// webpack 中几个概念
// module 各个源码文件，webpack 中一切皆模块
// chunk 多模块合并成的，如 entry import() splitChunk
// bundle 最终输出的文件

// webpack 的性能优化：
// 两个方面：1、优化打包速度 - 开发体验和效率； 2、优化产出 - 产品性能；

// 一、优化打包速度
