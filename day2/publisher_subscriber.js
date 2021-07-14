let eventEmitter = {};
// 缓存列表，存放 event 及 fn
/**
 * @params {Array} event
 * @params {Function} fn
 */
eventEmitter.list = {};
// 订阅
eventEmitter.on = function (event, fn) {
  let _this = this;
  console.log(_this);
  // 如有对象中有相应的 event 值，把 fn 添加到对应 event 的缓存列表里 => _this.list[event]
  // 如果对象中没有对应的 event 值，也就是说明没有订阅过，就给 event 创建个缓存列表 => _this.list[event] = []
  (_this.list[event] || (_this.list[event] = [])).push(fn);
  return _this;
}
// 发布
eventEmitter.emit = function () {
  console.log(arguments)
  let _this = this;
  let event = [].shift.call(arguments),
    fns = [...this.list[event]];
  console.log(arguments)
  if (!fns || fns.length === 0) {
    return false;
  }
  // 遍历 event 值对应的缓存列表，依次执行fn
  fns.forEach(fn => {
    console.log(arguments)
    fn.apply(_this, arguments)
  });
  return _this;
};

function user1(content) {
  console.log('用户1订阅了：', content)
}
function user2(content) {
  console.log('用户2订阅了：', content)
}

// 执行订阅
eventEmitter.on('article', user1)
eventEmitter.on('article', user2)

// 发布
// arguments => { '0': 'article', '1': 'Javascript 发布-订阅模式' }
eventEmitter.emit('article', 'Javascript 发布-订阅模式')


