var express = require('express');
var app = express();
//引包
var mongoose = require('mongoose');
//连接数据库，数据库叫做/Table。如果数据库不存在会自动创建。
mongoose.connect('mongodb://localhost:27017/Table');

//创建一个schema
var studentSchema = {
    "name"     : String,
    "age"     : Number,
    "sex"     : String
};

//创建一个模型（就是一个类）
var Student = mongoose.model("tables" , studentSchema);
// student为集合名称，如果该集合不存在，新建该集合.如果该集合存在，在该集合中写入数据

Student.find({"age": 15}, (err, docs) => {
    console.log(docs);
    const data = docs[0];
    data.name = '嘿嘿';
    data.age = 101;
    data.save();
})

//new一个实例
// var xiaoming = new Student({
//     "name"     : "小六",
//     "age"     : 15,
//     "sex"     : "男"
// });

//持久化
// xiaoming.save();


// app.get('/', function(req, res){
//     res.send('hello world');
// });
//
// const PORT = process.env.PORT || 3000;
//
// app.listen(PORT, err => {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log(`App listen to port: ${PORT}`);
//         }
//     }
// )
