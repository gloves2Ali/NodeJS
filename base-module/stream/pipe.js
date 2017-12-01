var fs = require('fs');

var rs = fs.createReadStream('demo1.json','utf-8');
var ws = fs.createWriteStream('copy.txt');

rs.pipe(ws);
