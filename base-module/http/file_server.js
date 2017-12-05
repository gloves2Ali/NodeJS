const
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir:' + root);

// 创建服务器
var server = http.createServer((req,res)=>{
    // 获取Url的path
    var pathname = url.parse(req.url).pathname;
    console.log("pathname:",pathname);
    // 获取对应本地文件路径，
    var filepath = path.join(root,pathname);
    console.log("filepath:",filepath);
    fs.stat(filepath,(err,stats)=>{
        if(!err && stats.isFile()) {
            // 没有出错并且文件存在
            console.log('200',req.url);
            // 发送200响应
            res.writeHead(200);
            // 将文件流导向res
            fs.createReadStream(filepath).pipe(res);
        } else {
            // 出错了并且文件不存在
            console.log('404' + req.url);
            // 发送404响应
            res.writeHead(404);
            res.end('404 Not Found');
        }
    });
});

server.listen(1223);

console.log('Server is running at http://127.0.0.1:1222/');