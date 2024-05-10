// const inventory = [
//     { name: "asparagus", type: "vegetables", quantity: 5 },
//     { name: "bananas", type: "fruit", quantity: 0 },
//     { name: "goat", type: "meat", quantity: 23 },
//     { name: "cherries", type: "fruit", quantity: 5 },
//     { name: "fish", type: "meat", quantity: 22 },
//   ];

//   const result = Object.groupBy(inventory, ({ type }) => type);

//   console.log(result);

const products = [
    { name: 'apples', category: 'fruits' },
    { name: 'oranges', category: 'fruits' },
    { name: 'potatoes', category: 'vegetables' }
];

let response = products.reduce((acc, curr) => {
    (acc[curr.category] = acc[curr.category] || []).push(curr);
    return acc;
}, {});


var result = products.reduce((x, y) => {
    (x[y.category] = x[y.category] || []).push(y);

    return x;

}, {});

console.log(result);