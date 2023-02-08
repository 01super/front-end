// nodejs 的异步任务也分宏任务和微任务
// 宏任务和微任务分不同类型，有不同优先级
console.info('start')

setImmediate(() => {
    console.info('immeditate')
})

setTimeout(() => {
    console.info('timeout')  
});

Promise.resolve().then(() => {
    console.info('promise then')
})

// 微任务，优先级最高
process.nextTick(() => {
    console.info('nextTick')
})

console.info('end')