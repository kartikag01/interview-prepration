### Closure

> Function bundled along with it's lexical scope is closure.

> *A closure is a function* that has access to its outer function scope even after the function has returned. Meaning, A closure can remember and access variables and arguments reference of its outer function even after the function has returned.*

> Lexical Scope - function have access to variable in its parent scope.
 * Let is blocked scope
 * Var is function scope

```
function example() {
    const num1 = 5; // clouser
    const num2 = 10;
    return function() {
        console.log(num1);
    }
}

const innnerFunction = example();
innnerFunction();

```


#### Application of Closure
1. Private variables -  num1 is private


#### Find Output
```
for(var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);
    }, 500);
}
```
var goes to outer function scope.

OUTPUT - 3,3,3

with var - function scope - 1 variable global(outer function scopre), 
with var - clouser is there but all 3 will be pointing to same var 

with let - block scope, 3 variable will be created.
with let - JS will create a new variable i for each iteration of loop.

let i;
for(i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);
    }, 500);
}

// Closure are created at tme of function decleration, not at execution.
// else i will be all 3.


#### Advantages of Closure:
* Module Design Pattern
* Currying
* Memoize
* Data hiding and encapsulation
* setTimeouts etc.

#### Disadvantages of Closure:
* Over consumption of memory
* Memory Leak
* Freeze browser