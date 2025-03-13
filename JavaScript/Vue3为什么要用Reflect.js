const obj = {
  a: 1,
  b: 2,
  get c() {
    console.log("this: ", this);
    return this.a + this.b;
  },
};

const handler = new Proxy(obj, {
  get(target, key, receiver) {
    console.log("key: ", key);
    /**
        key:  c
        this:  { a: 1, b: 2, c: [Getter] }
        key:  a
        key:  b
        3
     */
    console.log(receiver === handler);
    return Reflect.get(target, key, receiver);

    /**
        key:  c
        this:  { a: 1, b: 2, c: [Getter] }
        3
     */
    return target[key];
  },
});
// 如果不使用 Reflect，在访问C属性时，不会拦截到 a 和 b 的 get 操作，因为 obj 里面的this指向的是 obj，而不是 handler
// 也就是说，Reflect.get(target, key, receiver) 里面的 this 指向的是 handler
console.log(handler.c); // 3
