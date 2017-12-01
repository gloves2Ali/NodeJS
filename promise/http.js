var request = require('request');
var axios = require('axios');

//  封装http请求，返回数据
function https(url,way){
    if(way=="get") {
        request(url,function(err,res,body){
            if(!err && res.statusCode == 200){
                console.log(body);
            }
        });
    }else if("post") {
        var requestData={};
        request({
            url:url,
            method:"POST",
            json:true,
            headers: {
                "content-type":"application/json",
            },
            body:JSON.stringify(requestData)
        },function(err,res,body){
            if(!err && res.statusCode == 200){
                console.log(body);
            }
        });
    }

}

// 封装Promise 进行请求 axios,
var promiseHttp = {
    get:function(url){
        var promise = new Promise(function(resolve,reject){
            axios.get(url)
                .then((res)=>{
                    console.log("res",res.data);
                    resolve(res.data);
                })
                .catch((err)=>{
                    console.log("err",err);
                    reject(err);
                })
        });
        return promise;
    }
}

// 使用 async await强行同步
function awaitHttp(url) {
    return axios.get(url)
        .then((res)=>{
            console.log("res",res.data);
        })
        .catch((err)=>{
            console.log("err",err);
        })
}


exports.https = https;
exports.promiseHttp = promiseHttp;
exports.awaitHttp = awaitHttp;