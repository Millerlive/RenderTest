// 1.导入express
const express  = require('express')
// 解决跨域  npm i cors
const cors = require('cors')
// 2.创建web服务
const app = express()

// 1. 引入mongoose
const mongoose = require("mongoose");
// 2.连接mongodb服务
mongoose.connect("mongodb://127.0.0.1:27017/dbdata");
//   1)创建文档结构类型： 设置集合文档中的属性及属性值的类型
let BookSchema = new mongoose.Schema({
    name:String,
    author:String,
    price:Number,
    is_hot:Boolean
})
// 2) 2创建模型对象
let BookModel = mongoose.model('book',BookSchema)

app.use(cors())
// 使用内置中间件去解析post请求中以urlencoded形式编码的参数
app.use(express.urlencoded({extended:false}))

// 3.定义路由  :
app.get('/novals',async(req,res)=>{
    // console.log(data);
    let data = await BookModel.find()
    // console.log('data',data);
    res.json(data)  //响应json 格式的内容
})
app.get('/',(req,res)=>{
    res.send({msg:'success',data:[{name:'Tom',age:15},{name:'Mary',age:20}]})  //响应json 格式的内容
})
app.post('/add',async(req,res)=>{
    console.log(req.body);
    let data = await BookModel.create({
        name: "三体",
        author: "刘慈欣",
        price: 23,
        is_hot: true
      })
    console.log(data);
    res.send('添加成功')
})

// 4. 监听端口
app.listen(8080,()=>{
    console.log('服务启动成功');
})