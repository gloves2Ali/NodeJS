const crypto = require('crypto');

function getRandomSalt(){
    return Math.random().toString().slice(2,10);
}

// 随机盐值 + 密码
function crypt(pwd,salt) {
    var saltPassword = pwd + ':' + salt;
    console.log('原始密码：%s', pwd);
    console.log('加盐后的密码：%s', saltPassword);


    var md5 = crypto.createHash('md5');
    return md5.update(saltPassword).digest('hex');
}

console.log("pwd:",crypt('123456789',getRandomSalt()));
console.log("pwd:",crypt('123456',getRandomSalt()));