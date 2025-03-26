## Hoisting

Hoisting is JavaScript's default behavior of moving var declarations to the top.
In other words variable can be used before it has been declared.

### Scope
var - Execution Context i.e Enclosing Function, if outside func then global.
let - BLock Scope

NOTE: 
Variable assigment takes precedence over func declaration.
Func declaration takes precedence over variable declaration.
Check JS hand book page 32 for example.
```
var y = 2;
var x = function dmeo() {
    console.log(y); // undefined
    var y = 1;
}
console.log(y); // 2
x();
console.log(y); // 2
```


### let Hoisting

```
console.log(number)
let number = 10 // or const number = 10
console.log(number)
// ReferenceError: Cannot access 'number' before initialization.
```

```
console.log(number2)
let number = 10
// number2 is not defined
```

Notice difference between in both errors.

Variables declared with let or const are hoisted WITHOUT a default initialization. So accessing them before the line they were declared throws ReferenceError: Cannot access 'variable' before initialization.

But variables declared with var are hoisted WITH a default initialization of undefined. So accessing them before the line they were declared returns undefined.

### Temproral Dead Zone
There's a name for the period during execution where let/const variables are hoisted but not accessible: it's called the Temporal Dead Zone.