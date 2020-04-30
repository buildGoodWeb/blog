# Protocol

- x-frame-option

- 重定向

- https。请求前加密（加密代理），请求中规避（请求拆包），请求后弥补（补前端逻辑）

- DOM。DOMNodeInserted、DOMContentLoaded、DOMAttrModified

- http 缓存、离线包原理、移动端首屏幕加载速度优化
> TCP 三次握手保证可靠性，而 UDP 就没有了，信息发出后,不验证是否到达，不可靠。丢包就重传。有 seq，是连续的，如果收到的是不连续，说明中间缺了包；或者是超时了还没收到。

- http3 的 quic
> udp 快而不可靠，所以衍生 quic。对比 http2+tcp+tls，quic 减少了 tcp、tls 握手，改进了拥塞控制，前向冗余纠错

