# Book Spider

## Attention!!
本项目仅用于学习交流

## V1 Roadmap
- [X] 分析起点APP，获取数据连接
- [X] 代理起点接口，将数据原样返回给APP
- [X] 从网络中选取源，分析不同网站的源数据，根据起点的书本以及文章数据，定向获取章节内容
- [X] 定义书籍扒取规则：客户端请求服务端书籍内容，如果书籍已经扒取，则直接返回章节内容；如果服务端从未扒取过该书籍，则返回客户端需等待扒取信息，服务端后台启动线程扒取书籍数据，并且在扒取完成后，设定每天定时扒取任务

## V2 Roadmap

V1版本图书信息由于起点api增加了验证机制，导致无法获取图书信息。尝试过破解，发现难度较大，打算以后有空去解决。
V2版本则是基于追书神器的API做的一个简单封装，之后可能会做数据缓存。以后不排除追书将该API封禁的情况发生。

- [X] 基础封装，实现图书相关信息获取（包括章节内容）
- [ ] 逐步完善需要的API（分析追书神器客户端请求）
- [ ] 定义自己的返回参数
- [ ] 缓存数据
- [ ] 发布2.0测试版本

## LICENSE
GNU AGPLv3
