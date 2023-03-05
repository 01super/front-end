/**
 * 常见微任务：queueMicrotask、Promise、MutationObserve等。
 * 常见宏任务：ajax、setTimeout、setInterval、script（js整体代码）、IO操作、UI交互、postMessage等。
 */
const el = document.createElement("div");
el.innerHTML = "hello world";
document.documentElement.appendChild(el);
Promise.resolve().then(() => {
  alert("promise.then");
});
setTimeout(() => {
  alert("setTimeout");
});
