const bodyParser = require('body-parser'); // 解析参数
const express = require('express');

const app = express();
// Context-Type 为application/x-www-form-urlencoded 时 返回的对象是一个键值对，
//当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
app.use(bodyParser.urlencoded({ extended: true}));
// 处理json格式的数据
app.use(bodyParser.json())
// 
//静态文件
app.use('/',express.static('static'));

app.all('*', function(req, res, next) {
    //设置请求头为允许跨域
    res.header('Access-Control-Allow-Origin', '*')
    // 设置服务器支持的所有头信息字段
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept,X-Requested-With')
    // 设置服务器支持的所有跨域请求的方法
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8;multipart/form-data');
    // next()方法表示进入下一个路由
    next();
})

app.listen('3000',function(){
    console.log('服务已启动...')
})