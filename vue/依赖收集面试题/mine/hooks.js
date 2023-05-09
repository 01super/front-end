import { update } from "./render";
class Ref {
  constructor(defaultValue) {
    this.deps = new Set();
    this.defaultValue = defaultValue;
    this._value = defaultValue;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
    update(this);
  }

  $reset() {
    this.value = this.defaultValue;
  }
}

export function ref(defaultValue) {
  const ref = new Ref(defaultValue);
  console.log("ref: ", ref);
  return ref;
}

const reg_var = /\{\{(.+?)\}\}/;

export function createRefs(refs, allNodes) {
  allNodes.forEach((el) => {
    if (reg_var.test(el.textContent)) {
      const t = el.textContent.match(reg_var);
      const refKey = t[1].trim();
      refs[refKey].deps.add(el);
    }
  });
  return refs;
}
