var http = require('./http');
var async = require('async');

var url = "http://jspang.com/DemoApi/oftenGoods.php";
// var httpJson = http.https(url,"post");
// console.log("httpJson",httpJson);
var promiseJson = '';
var start = async function(){ 
    promiseJson = await http.awaitHttp(url);
    console.log("promiseJson",promiseJson);
};
start();
console.log("外面的对象",promiseJson);
