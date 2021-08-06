/*1. Write a JavaScript function that reverse a number. 
Example x = 32243;
Expected Output : 34223*/

/*function reverseNumber(x){
    return (x+'').split('').reverse().join('')
}*/

const reverseNumber = x => (x + '').split('').reverse().join('')

console.log(reverseNumber(32243))