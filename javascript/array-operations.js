/**** concat vs push  *******/
/*
push(...items: T[]): number;
concat(...items: (T | ConcatArray<T>)[]): T[];
Push modify current array and returns length
Concat return new array and keep original array unchanges

slice(start?: number, end?: number): T[];
Returns a section of an array, Immutable.

splice(start: number, deleteCount: number, ...items: T[]): T[];
Removes elements from an array, if necessary, inserts new elements in their place, returning the deleted elements.

unshift(...items: T[]): number;
Inserts new elements at the start of an array, and returns the new length of the array, Mutable 

shift()
Removes the first element from an array and returns it, Mutable 
*/

// REDUX - immutable array
let list = [];
// Remove Element from index without mutation
function remove(index) {
    return [
        ...list.slice(0, index),
        ...list.slice(index + 1)
    ]
}

// Add Element from index without mutation
function add(index, newObj) {
    return [
        ...list.slice(0, index),
        newObj,
        ...list.slice(index)
    ]
}

function update(index, newPayload) {
    return [
        ...list.slice(0, index),
        {
            ...list[index],
            ...newPayload
        },
        ...list.slice(index)
    ]
}


// With Mutation
// Remove 
list.unshift()


