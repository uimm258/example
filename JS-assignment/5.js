 // 5. Write a JavaScript function that accepts a string as a parameter and converts the first letter of each word of the string in upper case.
// // Example string : 'the quick brown fox'
// // Expected Output : 'The Quick Brown Fox '

const capFirstLetter = str => {
    const substr = str.split(' ') //这个‘’中间如果没有空格，那么他就不会根据空格来区分单词，分开单词的时候要记得加空格！！！
    const array = []

    substr.forEach(element => {
        element = element[0].toUpperCase() + element.slice(1)
        array.push(element)
    });

    return array.join(' ')
}

console.log(capFirstLetter('the quick brown fox'))


/*const toUper = str => {
     const arr = str.split(" ");
     const res = [];
     arr.forEach(substr => {
         substr = substr[0].toUpperCase() + substr.slice(1);
         res.push(substr);
     });
     return res.join(" ");
 };
// // ~test~
 const str = "the quick brown fox";
 console.log(toUper(str));*/