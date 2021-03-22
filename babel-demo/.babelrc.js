// 在 webpack 中使用 babel：babel-loader
module.exports = {
  // presets 是一堆打包好的 plugins，免去一个一个配置 plugin 的麻烦
  // presets 从后往前执行
  presets: [
    [
      "@bebel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
  ],
  plugins: [],
};

// babel-polyfill
// 是 core-js 和 regenerator 的集合

// babel-polyfill 在 Babel 7.4 之后被弃用
// 建议直接使用 core-js 和 regenerator

// @babel/polyfill 支持新语法，但是文件大，需要配置按需引入
