const http = require('http');

var server = http.createServer((req,res)=>{
    console.log(req.method+","+req.method);

    res.writeHead(200,{'Content-Type':'text/html'});

    res.end('<h1>Hello Http</h1>');
});

server.listen(1221);

console.log('Server is running at http://127.0.0.1:1221/');

