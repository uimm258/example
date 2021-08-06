// 2. Write a JavaScript function that checks whether a passed string is palindrome or not?
// // // A palindrome is word, phrase, or sequence that reads the same backward as forward, e.g., madam or nurses run.

function isPalindrome(str){
    let word = str.split('').reverse().join('')

    if(word === str) {
        return true
    } else {
        return false
    }
}

console.log(isPalindrome('madam'))