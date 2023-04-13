const arr = [1, [2, 2, 43, [433, 0]], 23, [33, 22]];

function flat(arr, dep = 1) {
  if (dep > 0) {
    return arr.reduce(
      (pre, cur) => pre.concat(Array.isArray(cur) ? flat(cur, dep - 1) : cur),
      []
    );
  }
  return arr.slice();
}

console.log(flat(arr, 2));
