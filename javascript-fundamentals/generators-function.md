## Generators

Regular functions return only single value (or nothing).

Generators can return (“yield”) multiple values, one after another, on-demand.

```
function* generateNumbers() {
  yield 1;
  yield 2;
  return 3;
}

const genObj = generateNumbers();
alert(generator); // [object Generator]
log(genObj.next()); // { value: 1, done: false }
log(genObj.next().value); // 2
log(genObj.next().done); // true
```

When such function is called, it doesn’t run its code. Instead it returns a special object, called “generator object”, to manage the execution.

They work great with iterables, allowing to create data streams with ease.