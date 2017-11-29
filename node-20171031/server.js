const http = require("http");
const url = require("url");

function start(route,handle) {
    function onRequert(req,res){
        let postData = "";
        let pathname = url.parse(req.url).pathname;
        console.log("Request for "+ pathname + " received");

        req.setEncoding("utf8");

        req.addListener("data",function(postDataChunk){
            postData += postDataChunk;
            console.log("Received POST data chunk"+ postDataChunk +".");
        });

        req.addListener("end",function(){
            route(handle,pathname,res,postData);
        });

    }
    
    http.createServer(onRequert).listen(8888);
    console.log("Server has started!");
}

exports.start = start;

