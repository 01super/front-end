export function bindEvent(nodes, methods) {
  console.log(this);
  nodes.forEach((el) => {
    const handlerName = el.getAttribute("@click");
    if (handlerName) {
      el.addEventListener("click", methods[handlerName].bind(this));
    }
  });
}
