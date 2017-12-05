function initArray(){
    let arr = [];
    return function(m,n){
        if(m<0){
            return arr;
        }else{
            arr[m] = n;
            arguments.callee(m-1,n);
        }
    }
}

// 目标输出[3 3 3 ..... 3]
console.log(initArray()(10,3));
