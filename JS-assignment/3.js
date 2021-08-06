// 3. Write a JavaScript function that generates all combinations of a string.
// // // Example string : 'dog'
// // // Expected Output : d,do,dog,o,og,g

function combineAll(str){
    const array = []

    for(let i = 0; i < str.length; i++){
        for(let j = i+1; j <= str.length; j++){
            array.push(str.slice(i,j))
        }
    }
    return array
}

/*function combineAll(str){
    if (str.length === 1) return [str];
    else {
        array = combineAll(str.slice(1));
        return array.concat(array.map(e => e.concat(str[0])), [[str[0]]]);
    }
}*/

console.log(combineAll('dog'))