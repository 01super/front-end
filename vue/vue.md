# Vue 生命周期：vue 实例从创建到销毁的过程  

* 作用：在某些特定的环节，触发一个回调函数，提供给我我们，让我们在生命周期的特定阶段就行相关业务代码的编写。  
* 阶段：  
  * beforeCreate：是 new Vue( ) 之后触发的第一个钩子，在当前阶段 data、methods、computed 以及 watch 上的数据和方法都不能被访问。
  * created：在实例创建完成后发生，当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发 updated 函数。可以做一些初始数据的获取，在当前阶段无法与 DOM 进行交互，如果非要想，可以通过 vm.$nextTick 来访问 DOM 。
  * beforeMount：发生在挂载之前，在这之前 template 模板已导入渲染函数编译。而当前阶段虚拟 DOM 已经创建完成，即将开始渲染。在此时也可以对数据进行更改，不会触发 updated。
  * mounted：在挂载完成后发生，在当前阶段，真实的 DOM 挂载完毕，数据完成双向绑定，可以访问到 DOM 节点，使用 $refs 属性对 DOM 进行操作。
  * beforeUpdate：发生在更新之前，也就是响应式数据发生更新，虚拟 DOM 重新渲染之前被触发，你可以在当前阶段进行更改数据，不会造成重渲染。
  * updated：发生在更新完成之后，当前阶段组件 DOM 已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新。
  * beforeDestroy：发生在实例销毁之前，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器。
  * destroyed：发生在实例销毁之后，这个时候只剩下了 DOM 空壳。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁。

## 第一次页面加载会触发哪几个钩子

会触发 4 个钩子，分别是：beforeCreate、created、beforeMount、mounted

## DOM 渲染在哪个周 期就已经完成

DOM 渲染是在 mounted 阶段完成，此阶段真实的 DOM 挂载完毕，数据完成双向绑定，可以访问到 DOM 节点。

## 多组件（父子组件）中生命周期的调用顺序说一下

组件的调用顺序都是先父后子，渲染完成的顺序是先子后父。组件的销毁操作是先父后子，销毁完成的顺序是先子后父。

加载渲染过程：父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount- >子mounted->父mounted  
子组件更新过程：父beforeUpdate->子beforeUpdate->子updated->父updated  
父组件更新过程：父 beforeUpdate -> 父 updated  
销毁过程：父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

# Vue3 为何抛弃 Object.definedProperty 转而使用 proxy
 * Object.defineProperty 无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应
 * Object.defineProperty 只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。Proxy 可以劫持整个对象，并返回一个新的对象。
 * Proxy 不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。
 * Proxy 有多达 13 种拦截方法
 * Proxy作为新标准将受到浏览器厂商重点持续的性能优化

# Proxy 只会代理对象的第一层，那么 Vue3 又是怎样处理这个问题的呢？  

判断当前 Reflect.get 的返回值是否为 Object，如果是则再通过 reactive 方法做代理， 这样就实现了深度观测。
# 监测数组的时候可能触发多次 get/set，那么如何防止触发多次呢？  

我们可以判断 key 是否为当前被代理对象 target 自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行 trigger。
