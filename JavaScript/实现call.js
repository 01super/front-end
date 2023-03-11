function callTest(a, b) {
    const r = a + b;
    console.log(r);
    return r;
}

Function.prototype.myCall = function (context, ...args) {
    const fn = this;
    if (context ?? false) {
        const cur = Object(context);
        cur.fn = fn;
        const res = cur.fn(...args);
        delete cur.fn;
        return res;
    }
    return fn(...args);

}

const res = callTest.myCall(null, 1, 2)
console.log({res})
callTest.myCall(undefined, 1, 2)
callTest.myCall('111', 1, 2)
callTest.myCall({name: 'xxx'}, 1, 2)