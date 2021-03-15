# webpack 的性能优化  

  1、优化打包速度 - 开发体验和效率；
  2、优化产出 - 产品性能；

## 优化打包速度

- 优化 babel-loader
  - 开启缓存 loader: ['babel-loader?cacheDirectory']
  - 明确范围 include 和 exclude  
- IgnorePlugin
- noParse
- happyPack 多进程打包
  - js 单线程，开启多进程打包
  - 挺高构建速度，特别是多核 CPU
  - 项目比较小，没必要使用，使用多进程，反而可能会拖慢速度
- ParallelUglifyPlugin 多进程压缩 js
- 自动刷新
  - 速度慢、网页全部刷新、状态丢失
- 热更新
  - HotModuleReplacementPlugin
- DllPlugin
