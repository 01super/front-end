export function test(params) {
  const a = wow(params);
  return a + "hello world";
}

function wow(params) {
  return _.cloneDeep(params) + " wow";
}
