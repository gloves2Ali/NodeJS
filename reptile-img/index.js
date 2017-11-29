//author='cdt'
var request = require('request'); // 请求模块
var cheerio = require('cheerio'); // 解析html，找到想要的数据
var path = require('path');       // 处理路径模块
var fs = require("fs");           // 对系统文件及目录进行读写操作
var async = require('async');     // 异步嵌套
var mkdirp = require('mkdirp');   // 以异步的方式创建文件目录。如果目录已存在，将抛出异常。

// 需要爬的网站
function getUrls() {
    var urls = [],
        baseUrl =  'http://www.mmjpg.com/mm/';
    for (var i = 484; i <485; i++) {
        var tmp = baseUrl + i;
        console.log("baseUrl",baseUrl);
        urls.push(tmp);
        var dir = './mei/' + i;
        // 创建目录
        mkdirp(dir,function(err){
           if(err){
               console.log(err);
           }else{
               console.log(console.log(dir+'文件夹创建成功!'));
           }
        });
    }
    return urls;
}

// 获取 网站数组
var urls = getUrls();  


// 异步遍历所有网站
async.eachSeries(urls,function(url,callback){ 
    fetchUrl(url,callback); 
},function(err,result){
    console.log('大门已经全部打开，安静等待下载吧。');
});

// 抓取网页内容
function fetchUrl(url,callback) {
    var options = {
        url:url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36',
            'Connection':'keep-alive'
        }
    };
    console.log('打开新世界的大门:' + options.url);

    request(options,function(error,response,body){
        if(error) console.log(error);
        else console.log('成功打开新世界大门' + options.url);
        if(!error && response.statusCode ==200) {
            acquireData(options.url,body);
            callback(null,null);
        }
    });
}

function acquireData(url,data) {
    var $ = cheerio.load(data);
    var meizi = $('#content img').toArray();
    var mm = $('#page a').eq(6).text();
    console.log('获得:'+mm+'张妹子图');
    var list = url.split('/');
    for(var i=1;i<mm;i++) {
        var imgsrc = path.dirname(meizi[0].attribs.src)+'/'+i+'.jpg';
        console.log(imgsrc);
        var filename = parseUrlForFlieName(imgsrc); //生成文件名
        downloadImg(imgsrc,filename,'./mei/'+list[4],function(){
            console.log(filename + 'done');
        })
    }
}

function parseUrlForFlieName(address) {
    var filename = path.basename(address);
    return filename;
}


var downloadImg = function(uri,filename,dir,callback){
    request({uri:uri,encoding:'binary'},function(error,res,body){
       if(!error && res.statusCode ==200){
           if(!body) console.log("没有内容。。。")
            fs.writeFile(dir+'/'+filename,body,'binary',function(err){
               if(err) console.log(err);
               console.log('偷偷下载'+dir+'/'+filename+'done');
            });
        }
    });
}
