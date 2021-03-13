const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 几种 hash 的区别：
// 1、hash：
// 是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值

// 2、chunkhash：
// 它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。
// 简单来说这种是根据不同入口来配置的，比如vue-router、vuex、vue等公共入口文件，只要这些没有改变，那么他对应生成的js的hash值也不会改变。

// 3、contenthash：
// 主要是处理关联性，比如一个 js 文件中引入 css，但是会生成一个 js 文件，一个 css 文件，但是因为入口是一个，导致他们的 hash 值也相同，所以当只有js修改时，关联输出的 css、img 等文件的 hash 值也会改变，这种情况下就需要 contenthash 了。
module.exports = {
  mode: "production",
  entry: {
    index: path.resolve(__dirname, "../src/index.js"),
    home: path.resolve(__dirname, "../src/home.js"),
  },
  output: {
    filename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "../src"),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // 配置在 .babelrc 文件中，配合 @babel/preset-env 实现对 ES5 以上的一些语法的解析
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 多入口，生成 index.html
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["index"], // 只引用 index.js
      template: path.resolve(__dirname, "../src/index.html"),
    }),
    // 多入口，生成 home.html
    new HtmlWebpackPlugin({
      filename: "home.html",
      chunks: ["home"], // 只引用 home.js
      template: path.resolve(__dirname, "../src/index.html"),
    }),
  ],
};
