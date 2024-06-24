var y = 2;
var x = function dmeo() {
    console.log(y); // undefined
    var y = 1;
}
console.log(y); // 2
x();
console.log(y); // 2


// Temproral Dead Zone