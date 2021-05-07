// let based on ES5,IIFE
(function () {
  var x = 1
  console.log('line3_x: ' + x) // 打印 1
})()
// console.log('line6_x: ' + x) // x 虽然被提升了，但是仍旧是undefined，报错
// const based on ES5
var __const = function (data, value) {
  // 先定义全局变量
  window.data = value
  // 再劫持该全局变量
  Object.defineProperty(window, data, {
    enumerable: false, // 是否可以枚举
    configurable: false, // 是否可以删除
    get: function () {
      return value
    },
    set: function (newValue) {
      if (value !== newValue) {
        throw new TypeError('Assignment to constant variable!')
      } else {
        return value
      }
    }
  })
}

__const('a', {
  b: 0,
  c: 1,
  d: 2
})
console.log('line33_a: ', a) // 打印 {b: 0, c: 1, d: 2}
delete a // configurable: false 不可删除
console.log('line35_a: ', a) // 打印 1
for (let item in window) {  // enumerable: false 不可枚举
  if (item === 'a') { // 因为'a'不可被枚举，因此item不会输出'a'
    console.log('line38_a: ' + awindow[item]) // 没有打印
  }
}

function showConst1() {
  __const('c', 1)
  console.log('line44_c: ', c)
  const d = 1
}
function showConst2() {
  const d = 1
}
const e = 1
showConst1()
showConst2()