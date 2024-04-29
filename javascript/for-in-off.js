// Array - off   -> items of array
// Object - in   -> key in Object


let object = { a: 10, b: 30 };
for (let key in object) {
    console.log(key);
}

let array = ["a", 10, "b", 30, object];
for (let items of array) {
    console.log(items);
}

// another way.
for (let key of Object.keys(object)) {

}

// ASKI
"abc".charCodeAt(0); // 97
String.fromCharCode(65); // A

//