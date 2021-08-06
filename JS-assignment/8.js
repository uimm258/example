// 8. Write a JavaScript function that accepts a number as a parameter and check the number is prime or not.
// // Note : A prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.

const isPrime = num => {
    if(num < 3) return num

    if(num % 2 === 0) return false

    for(let i = 3; i < num; i += 2){
        if(num % i === 0) return false
    }
    return true
}

console.log(isPrime(75))