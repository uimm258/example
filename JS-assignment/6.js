// 6. Write a JavaScript function that accepts a string as a parameter and find the longest word within the string.
// // // Example string : 'Web Development Tutorial'
// // // Expected Output : 'Development'

const findLongest = str => {
    const substr = str.split(' ')
    
    for(let i = 0; i < substr.length; i++){
        if(substr[i].length > substr[i+1].length){
            return substr[i]
        } else {
            return substr[i+1]
        }
    }
}

console.log(findLongest('Web Development Tutorial'))