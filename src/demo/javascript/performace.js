let arr = [];

for(let i = 0; i < 1000000; i ++) {
  arr.push(`a${i}`);
}

const item = 'a100000';

console.time('string indexOf');

const str = arr.join(',');

for (let i = 0; i < 10000; i++) {
  str.indexOf(item)
}

console.timeEnd('string indexOf');

console.time('indexOf');

for (let i = 0; i < 10000; i++) {
  arr.indexOf(item)
}

console.timeEnd('indexOf');

console.time('includes');

for (let i = 0; i < 10000; i++) {
  arr.includes(item)
}

console.timeEnd('includes');

console.time('some');

for (let i = 0; i < 10000; i++) {
  arr.some(a => a === item)
}

console.timeEnd('some');

