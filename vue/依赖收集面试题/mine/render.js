export function render(refs) {
  for (let key in refs) {
    const ref = refs[key];
    _render(ref);
  }
}

function _render(ref) {
  const { deps, value } = ref;
  deps.forEach((dep) => (dep.textContent = value));
}

export function update(ref) {
  _render(ref);
}
