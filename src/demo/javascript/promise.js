// 手写 Promise.all(iterable)
// 当所有的异步任务完成（resolved），以数组形式返回多个 promise 对象
// 当其中任意一个异步任务终止（rejected），返回 rejected 错误信息

Promise.all = function (iterators) {
  return new Promise((resolve, reject) => {
    if (!iterators || iterators.length === 0) {
      resolve([]);
    } else {
      let count = 0;
      let result = [];
      for(let i = 0; i < iterators.length; i ++) {
        Promise.resolve(iterators[i]).then(data => {
          result[i] = data;
          if (++count === iterators.length) {
            resolve(result);
          }
        }, err => {
          reject(err);
          return;
        })
      }
    }
  })
}

// 手写 Promise.race
// 返回最先执行完的 promise 对象

Promise.race = function (iterators) {
  return new Promise((resolve, reject) => {
    for(const iter of iterators) {
      Promise.resolve(iter).then(data => {
        resolve(data);
      }, err => {
        reject(err);
      })
    }
  })
}