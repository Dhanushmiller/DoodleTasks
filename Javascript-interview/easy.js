// Reverse a string

function reverseString(str){
    let reversed="";

    for (i=str.length-1;i>=0;i--){
        reversed+=str[i];
    }

    return reversed;
}

console.log(reverseString("hello"));


function reverseString(str){
    return str.split("").reverse().join("");
}

console.log(reverseString("hello"));


// Palindrome check

function isPalindrome(str){
    let reversed=str.split("").reverse().join("");
    return str===reversed;
}
console.log(isPalindrome("madam"));


// Largest Number of array


function LargestNumber(arr){
    let largest = arr[0];

    for(i=0;i<arr.length;i++){
        if(arr[i]>largest){
            largest=arr[i];
        }
    }
    return largest;
}
console.log(LargestNumber([12,34,11,78,90]));


// count vowels


function countVowels(str){
    let count=0;
    let vowels=["a","e","i","o","u","A","E","I","O","U"];
    for(i=0;i<str.length;i++){
        if(vowels.includes(str[i])){
            count++;
        }
    }
    return count;
}
console.log(countVowels("AEIOU"));


function countVowels(str) {
    return (str.match(/[aeiou]/gi) || []).length;
}
console.log(countVowels("AEIOU"));


function countArray(arr){
    let count =0;

    for(i=0;i<arr.length;i++){
        count++;
    }

    return count;
}

console.log(countArray([1,2,3,4,5]));


// sum of array


function sumArray(arr){
    let sum=0;

    for(i=0;i<arr.length;i++){
        sum+=arr[i];
    }
    return sum;
}

console.log(sumArray([1,2,3,4,5]));


// remove duplicates from array

function RemoveDuplicates(arr){
    let unique=[];

    for(i=0;i<arr.length;i++){
        if(!unique.includes(arr[i])){
            unique.push(arr[i]);
        }
    }

    return unique;
}

console.log(RemoveDuplicates([1,2,3,4,5,1,2,3]));



function removeDuplicate(arr){
    return [...new Set(arr)];
}

console.log(removeDuplicate([1,2,3,4,5,1,2,3]));


function Factorial(n){
    let num=1;

    for(i=1;i<=n;i++){

        num*=i;
    }

    return num;
}

console.log(Factorial(5));


//fibonacci series

function fibonacci(n){
    let fibo=[0,1];

    for(i=2;i<n;i++){
        fibo.push(fibo[i-1]+fibo[i-2]);
    }

    return fibo;
}

console.log(fibonacci(10));


//second largest number in array

function secondLargest(arr){

    if(arr.length<2){
        return "Array should have atleast 2 elements";
    }
    let largest=arr[0];
    let secondLargest=arr[0];

    for(i=0;i<arr.length;i++){
        if(arr[i]>largest){
            secondLargest=largest;
            largest=arr[i];
        }else if(arr[i]>secondLargest && arr[i]<largest){
            secondLargest=arr[i];
        }       

    }
    return secondLargest;
}
console.log(secondLargest([12]));


//missing number in array


function missingNumber(arr,n){
    let expectedsum=n*(n+1)/2;
    let actualsum=0;

    for (i=0;i<arr.length;i++){
        actualsum+=arr[i];
    }
    return expectedsum-actualsum;
}
console.log(missingNumber([1, 2, 3, 4, 6], 10));


function isAnagram(str1,str2){
    if(str1.length !== str2.length){
        return false;
    }

    str1 = str1.toLowerCase().split("").sort().join("");
    str2 = str2.toLowerCase().split("").sort().join("");
     
    return str1 === str2;
}


function frequencyCount(str){

    let frequency={};

    for(let char of str){
        if(frequency[char]){
         frequency[char]++;
        }
        else{
            frequency[char]=1;
        }
    }
    return frequency;
}

console.log(frequencyCount("hello world"));


//duplicate elements in array

function duplicateArray(arr){

    let seen = [];
    let duplicates=[];

    for(i=0;i<arr.length;i++){

        if(!seen.includes(arr[i])){
            seen.push(arr[i]);
        }
        else{
            duplicates.push(arr[i]);
        }
    }

    return duplicates;
}

console.log(duplicateArray([1,2,3,4,5,1,2,3]));


//longest word


function longestWord(sentence){

    let longest="";
    let words = sentence.split(" ");

    for(let word of words){
        if(word.length>longest.length){
            longest=word;
        }
    }
    return longest;
}

console.log(longestWord("The quick brown fox jumps over the lazy dog"));

const names = ["john", "alex", "emma"];

const upper = names.map((name)=>{
    return name.toUpperCase();
});

console.log(upper);