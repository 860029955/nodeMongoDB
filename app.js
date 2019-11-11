// 搭建服务器和服务器里面用到的东西


// 引入express框架并实例化出来
var express = require('express');
// 引入自定义模块todoController
var todoController = require('./controller/todoController');

var app = express();

// 配置视图引擎为ejs
app.set('view engine','ejs');

// 使用外部样式表（public作为引入到外部样式文件夹）
app.use( express.static('./public') )

todoController(app)

// 监听端口号
app.listen(3000)