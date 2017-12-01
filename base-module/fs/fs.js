const fs = require('fs');


// 读取文件
var outFS = {
    // 异步 读取json文件
    Json:()=>{
        fs.readFile('demo1.json','utf-8',(err,data)=>{
            if(err)
                console.log(err)
            else
                console.log(data)
        })
    },
    // 异步 读取二进制，图片文件
    Img:()=>{
        fs.readFile('demo.jpg',(err,data)=>{
            if(err)
                console.log(err)
            else{
                console.log(data);
                console.log(data.length + 'bytes');
            }
        })
    },
    // 同步 读取
    SyncJson:()=>{
        let data = '未读取';
        try{
            data = fs.readFileSync('demo1.json','utf-8');
            console.log("读取出来的数据:",data);
        }catch(err){
            console.log(log);
        }
    },
}

// 写入文件
var InputFS = {
    // 写入文件
    writeFile:()=>{
        let data = 'hello,nodejs';
        fs.writeFile('outDemo.txt',data,(err)=>{
            if(err)
                console.log(err)
            else
                console.log('写入成功')
        });
    },
    // 创新新文件，并且写入内容
    appendFile:()=>{
        let datas = '这段文字是创建文件并且写入里面的';
        fs.appendFile('./createTxt.txt',datas,'utf-8',(err)=>{
            try{
                console.log('创建 并且写入成功!')
            }catch(err){
                console.log("创建写入失败",err)
            }
        })
    },

    // 查看文件的信息
    fileInfo:()=>{
        fs.stat('outDemo.txt',(err,stat)=>{
            if(err)
                console.log(err)
            else{
                // 文件信息
                console.log("stat:",stat);
                //是否 是文件
                console.log('isFile:'+stat.isFile());
                // 是否 是目录
                console.log('是否是文件：'+stat.isDirectory());

                if(stat.isFile()){
                    //文件大小
                    console.log('size:'+stat.size);
                    //创建时间,Date对象
                    console.log('birth time:'+stat.birthtime);
                    // 修改时间 ,Date对象
                    console.log('modified time:', + new Date(stat.mtime));
                }
            }
        })
    }
}

// 

// outFS.Json();
// outFS.Img();
// outFS.SyncJson();
// InputFS.writeFile();
// InputFS.appendFile();
InputFS.fileInfo();
