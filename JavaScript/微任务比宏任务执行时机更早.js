const el = document.createElement("div");
el.innerHTML = "hello world";
document.documentElement.appendChild(el);
Promise.resolve().then(() => {
  alert("promise.then");
});
setTimeout(() => {
  alert("setTimeout");
});
