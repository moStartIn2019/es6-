function fn1() {
  console.log(this, arguments)
}
function fn2() {
  console.log(this, arguments)
}

/**
 * call
 * 1. this 指向指定的，没有指定则指向window
 * 2. 调用了call的本身的方法会自己执行
 * {}.fn = fn1
 */
Function.prototype.call = function(context) {
  context = context ? Object(context) : window // 改变调用call方法的调用者的this，指向context
  context.fn = this // call方法的本身this是调用者，即fn1
  let args = []
  for(let i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }
  const result = eval('context.fn(' + args + ')')
  delete context.fn
  return result
}
console.log(fn1.call.call.call(fn2)) // 链式调用，this取第一个结果
console.log(fn1.call('hello')) // this = 'hello', 'hello'.fn = fn1, 'hello'.fn() = fn1() => xxx.fn1()

/**
 * apply 同理，不过apply传入的参数是数组
 */
Function.prototype.apply = function(context, args) {
  context = context ? Object(context) : window
  context.fn = this
  if(!args) { // 无参数，直接执行
    return context.fn()
  }
  const result = eval('context.fn('+ args +')')
  delete context.fn
  return result
}

console.log(fn1.apply(fn2,[1,2]))

/**
 * bind
 */

/**
 * new 
 */

  /**
   * instanceof typeof
   */

   /**
    * deepclone shallowclone
    */