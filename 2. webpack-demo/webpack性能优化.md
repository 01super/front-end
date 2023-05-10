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
- DllPlugin(不能用于生产环境)
  - 用处：
  前端框架如 Vue React 体积较大，构建较慢
  较稳定，不长升级版本
  同一个版本只构建一次即可，不用每次都重新构建
  - 两步： DllPlugin 打包出 dll 文件；DLLReferencePlugin 使用 dll文件

## 优化产出代码

- 体积更小
- 合理分包，不重复加载
- 速度更快，使用内存更小

  1. 小图标 base64 编码
  2. bundle 加 hash
  3. 懒加载
  4. 提取公共代码
  5. IgnorePlugin(例如使用 momentjs 忽略语言包，减小体积)
  6. 使用 CDN 加速
     1. 使用publicPath，将打包出来的文件加上 CDN 地址的前缀
     2. 将文件上传到 CND 服务器
  7. 使用 mode=production
     1. 默认会压缩代码
     2. Vue React 等会自动删除调试代码
     3. 启动 Tree-Shaking（必须使用 ES Module 才能让其生效）
        1. ES6 Module 静态引入，编译时引入
        2. Commonjs 动态引入，执行时引入
        3. 只有 ES6 Module 才能静态分析，实现 Tree-Shaking
  8. Scope Hosting(多个函数的内容放到一个作用域中，创建函数作用域少，减少内存占用，运行更快，代码可读性更好)

## 面试问题

- 前端为何需要进行打包构建
  1. 体积更小（Tree-Shaking、压缩、合并），加载更快
  2. 编译高级语法（TS、ES6+、模块化、scss、less）
  3. 兼容性和错误检查（polyfill、postcss、eslint）
  4. 统一、高效的开发环境
  5. 统一的构建流程和产出标准
  6. 集成公司构建规范（提测、上线等）

- babel 和 webpack 的区别
  1. babel - js 新语法编译工具，不关心模块化
  2. webpack - 打包构建工具，多个loader 和 plugin 的集合

- 如何产出一个lib

- babel-polyfill 和 babel-runtime 的区别
  1. babel-polyfill 会污染全局
  2. babel-runtime 不会污染全局
  3. 产出第三方 lib 要用 babel-runtime

- webpack 优化构建速度
  1. 优化babel-loader
  2. IgnorePlugin
  3. noParse
  4. happyPack
  5. ParallelUglifyPlugin
  6. 自动刷新
  7. 热更新
  8. DllPlugin
  9. base64
  10. bundle 加 hash
  11. 懒加载
  12. 提取公共代码
  13. 使用 CDN 加速
  14. production
  15. Scope Hosting