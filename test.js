// const string = "hello";
// const arr = string.split("").reverse().join("")

// console.log(arr)

const string = "javascripto"
let vowels = "aeiou"
let count = 0

for(const word of string) {
    if(vowels.includes(word))
        count++
}

console.log(count)