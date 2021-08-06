// 7. Write a JavaScript function that accepts a string as a parameter and counts the number of vowels within the string.
// // Note : As the letter 'y' can be regarded as both a vowel and a consonant, we do not count 'y' as vowel here.
// // Example string : 'The quick brown fox'
// // Expected Output : 5

const countVowels = str => {
    //const map = new Set(['a', 'e', 'i', 'o', 'u'])//.has一定要跟new Set这个一起用，而且has只会return true false

    const map = ['a', 'e', 'i', 'o', 'u']
    
    const newStr = str.toLowerCase()
    let count = 0

    for(let i = 0; i < newStr.length; i++){
        //if(map.has(newStr[i])) { 
        if(map.includes(newStr[i])){
            count++
        }
    }

    return count
}

console.log(countVowels('The quick brown fox'))