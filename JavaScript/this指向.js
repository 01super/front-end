const o = {
  name: "xx",
  log() {
    console.log(this.name);
  },
  wait1() {
    // 箭头函数的this是当前上下文（当前声明的作用域）
    setTimeout(() => {
      console.log(this.name);
    }, 0);
  },
  wait2() {
    setTimeout(function () {
      console.log(this);
    }, 0);
  },
};
o.log();
o.wait1();
o.wait2();
