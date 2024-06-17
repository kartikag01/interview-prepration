// Object.freeze - prevents any modifications, additions, or deletions to properties.
// Object Freeze is Shallow. It can also freeze an array.
const person = { name: "John", age: 30 };
Object.freeze(person);
person.age = 31; // Modifying properties is not allowed, NO Error.
console.log(person); // Output: { name: "John", age: 30 }


// Object.seal() - allows modification of existing properties, but does not permit addition or deletion of properties
person.city = "New York"; // Adding new properties is not allowed
console.log(person); // Output: { name: "John", age: 30 }
delete person.name; // Removing properties is not allowed
console.log(person); // Output: { name: "John", age: 30 }

// isFrozen, isSealed
console.log(Object.isFrozen(person)); // Output: true
console.log(Object.isSealed(person)); // Output: true