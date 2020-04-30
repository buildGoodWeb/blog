# React
- react 的 setstate 过程，几种情况的 setstate 的输出，收到新 state 怎么更新
- react 的合成事件

## React16
- react 升到 16，有什么坑需要解决【描述】
- 16 后性能好多少，测过吗，你怎么测的。顺便问一下各种测速上报【描述】
- 为什么 16 的性能好，fiber 流程是怎样的【描述】
- 为什么两个 will 生命周期要被标记为 danger【描述】
- 用了 react 的哪些新特性，带来什么收益【举例】
- react16 之前的那些不好的生命周期怎么过度到 react16 的新生命周期
> getDriverStateFromProps 替代 componentWillReceiveProps，加上逻辑对比上次 state 和 props 来决定 state。willupdate 换成 getSnapshotBeforeUpdate，willmount 直接写成初始 state
- React useMemo 原理
> 闭包、缓存、memorize



- 浏览器 http 缓存那一套【描述】
- from memory cache、from dist cache 什么区别，性能对比【描述】
- 根据什么而选 from memory cache、from dist cache 这两种缓存方案【描述】
- service worker 怎么理解【举例】
- 输出一个字符串全排列【编程】
