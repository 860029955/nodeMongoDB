// 引入mongoose模块
var mongoose = require('mongoose')

// 链接数据库
mongoose.connect('mongodb+srv://nodetodo:sole251216@cluster0-mvqk6.mongodb.net/test?retryWrites=true&w=majority')

// 创建一个图标
var todoSchema = new mongoose.Schema({
    item: String,
    number: Number
})

// 往数据库中存储数据
var Todo = mongoose.model('Todo', todoSchema)

// Todo({item: 'hello'}).save(function (err, data) {
//     if (err) throw err
//     console.log('Item saved!')
// })
console.log('------')

var bodyParser = require('body-parser')

// 对数据进行解析
var  urlencodeParser = bodyParser.urlencoded({extended: false})

module.exports = function (app) {
    // 获取数据
    app.get('/todo', function (req,res) {
        // res.send("您所访问的地址是：" + req.url)
        Todo.find({}, function (err, data) {
            if (err) throw err
            res.render('todo', {todos: data})
        })
    })

    // 传递数据
    app.post('/todo', urlencodeParser, function(req, res) {
        Todo(req.body).save(function (err, data) {
            if (err) throw err
            res.json(data)            
        })
    })

    // 删除数据
    app.delete('/todo/:item', function(req, res) {
        Todo.find({item: req.params.item}).remove(function(err, data) {
            if (err) throw err
            res.json(data)
        })
    })
}