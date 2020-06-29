/**
 * 
 * @param {*} obj 
 * @param {*} fn 
 * obj 是数组，通过循环方式执行
 * obj 是对象，使用 reducer
 */

const deepMapKeys = (obj, fn) =>
  Array.isArray(obj)
    ? obj.map(val => deepMapKeys(val, fn))
    : typeof obj === 'object'
      ? Object.keys(obj).reduce((acc, current) => {
        const key = fn(current);
        const val = obj[current];
        acc[key] = val !== null && typeof val === 'object' ? deepMapKeys(val, fn) : val;
        return acc;
      }, {})
      : obj;


// Exam

const obj = {
  foo: '1',
  nested: {
    child: {
      withArray: [
        {
          grandChild: ['hello']
        }
      ]
    }
  }
};
const upperKeysObj = deepMapKeys(obj, key => key.toUpperCase());

console.log('upperKeysObj', JSON.stringify(upperKeysObj))