const fs = require("fs");

// 打开一个流
var rs = fs.createReadStream('demo1.json','utf-8');
var html = '';
rs.on('data',(chunk)=>{
    console.log('data');
    console.log("chunk:",chunk);
    html+=chunk;
})

rs.on('end',()=>{
    console.log('END');
    console.log(html);
})

rs.on('error',(err)=>{
    console.log('ERROR:',+err);
})