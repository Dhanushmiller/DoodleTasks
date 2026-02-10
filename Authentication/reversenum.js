
function reversenum(n){
    let reversed=0;

    while(n!=0){
        let ld=n%10;
        reversed=reversed*10+ld;
        n=Math.floor(n/10)
    }
    return reversed;
}
console.log(reversenum(1234));
