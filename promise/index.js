var http = require('./http');

var url = "http://jspang.com/DemoApi/oftenGoods.php";
// var httpJson = http.https(url,"post");
// console.log("httpJson",httpJson);
var promiseJson = '';
(async function(){ 
    promiseJson = await http.awaitHttp(url);
    console.log("promiseJson",promiseJson);
})();
console.log("外面的对象",promiseJson);
