// https://github.com/aximario/json-tree/blob/master/src/index.ts

let arr = [
  { id: 2, name: 'B', pid: 0 },
  { id: 3, name: 'C', pid: 1 },
  { id: 1, name: 'A', pid: 2 },
  { id: 4, name: 'D', pid: 1 },
  { id: 5, name: 'E', pid: 2 },
  { id: 6, name: 'F', pid: 3 },
  { id: 7, name: 'G', pid: 2 },
  { id: 8, name: 'H', pid: 4 },
  { id: 9, name: 'I', pid: 0 }
];

function toTree(list) {
  let result = [];
  const obj = list.reduce((res, v) => {
    res[v.id] = v;
    return res;
  }, {});
  list.forEach(l => {
    let parent = obj[l.pid];
    if (parent) {
      if (!parent.children) { parent.children = [] }
      parent.children.push(l);
    } else {
      result.push(l);
    }
  })
  return result;
}

const treeData = toTree(arr, 0)
console.log(JSON.stringify(treeData, null, 2))

// 递归
function toTree1(list, pId) {
  let len = list.length;
  function loop(pId) {
    let res = [];
    for (let i = 0; i < len; i++) {
      let item = list[i];
      if (item.pid === pId) {
        item.children = loop(item.id);
        res.push(item);
      }
    }
    return res;
  }
  return loop(pId);
}

// console.log(JSON.stringify(toTree1(arr, 0), null, 2))


//     9     7    3 -- 6
//    /     /    /
//   0 -- 2 -- 1 -- 4 -- 8
//         \
//          5


function flatten(data) {
  return data.reduce((arr, { children = [], ...rest }) =>
    arr.concat([rest], flatten(children)), []
  )
}

console.log('flatten', flatten(treeData));