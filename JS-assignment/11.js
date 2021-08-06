// 11. Write a JavaScript function which will take an array of numbers stored and find the second lowest and second greatest numbers, respectively.
// // Sample array : [1,2,3,4,5]
// // Expected Output : 2,4

const getNumber = (arr) => {
    arr.sort((a,b) => a - b)
    var i = arr[1]
    var j = arr.length - 1

    return [i, j]
}

console.log(getNumber([1,2,3,4,5]))