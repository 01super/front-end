import { bindEvent } from "./event";
import { ref, createRefs } from "./hooks";
import { render } from "./render";

export function createApp(el, options) {
  const { refs, methods } = options;
  const $el = document.querySelector(el);
  const allNodes = $el.querySelectorAll("*");
  console.log("allNodes: ", allNodes);
  // 收集依赖
  const refSet = createRefs(refs, allNodes);
  console.log(refSet);
  render(refSet);
  bindEvent.apply(refSet, [allNodes, methods]);
}

export { ref, createRefs };
