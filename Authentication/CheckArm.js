function isArmstrong(num) {
    let temp = num;
    let digits = num.toString().length;
    let sum = 0;

    while (temp > 0) {
        let digit = temp % 10;
        sum += Math.pow(digit, digits);
        temp = Math.floor(temp / 10);
    }

    return sum === num;
}

console.log( isArmstrong(153));
