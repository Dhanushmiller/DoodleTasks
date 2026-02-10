function secLarg(arr){
    let first= -Infinity;
    let second=-Infinity;

    for(let n of arr){

        if(n>=first){
            second=first;
            first=n;
        }
        else if(n>second && n !==first){
            second = n;
        }
    }
    return second;
}
console.log(secLarg([10,20,55,40]));