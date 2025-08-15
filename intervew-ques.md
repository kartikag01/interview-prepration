## React
1. State Management in React ? - context apis ?
2. How can you share a state between multiple components
3. Controlled vs uncontrolled components ? 
4. What and hooks in react.
5. when should we use useEffect and does it takes in 2nd arg ?
6. what higher order components.
7. what are refs and when should we use them ?
8. what is virual dom in react.
9. what is key in react list.
10. Explain how to increase preformace of react application ?
11. what is purpose of useMemo
12. StrictMode in React.
13. How to handle errors in React
```
function Reactoutput() {
    const [state, setState] = React.useState("A");

    console.log("1");

    React.useEffect(() => {
        console.log("2");
        return () => {
            console.log("3");
        }
    }, [state]);

    console.log("4");

    return (
        <div>HELLO</div>
    )
}
```

## JS Questions (junior to senior):
1. What is the difference between let and const?
2. What is a callback, when would you use one?
3. What is the difference between == and ===?
4. What is hoisting?
5. What is a closure?
6. What is the event loop?
7. Difference btw call, apply, bind
8. Difference btw normal func and arrow func.
9. deepEquals in JS.
10. Find output
```
console.log(0);
setTimeout(() => console.log(1), 0);
Promise.resolve().then(res => console.log(2));
console.log(3);
```

## Node
1. Explain how node.js handle async process.
2. We have form and Firebase DB, with DB limit of 100req/sec.
3. Food delivery app Design.

## Dev Ops
1. how to manage variables for which are based on env, like base_url, secreat_manager.


## System Design 
- Webbhook vs APIs 
- What are Trx. ?
- How to achive distributed trx.
- 

### SQL
What is the result of Inner Join between the tables A & B?
Table A
Col
1  
1  
0   
NULL
 
Table B
Col
1
0
NULL
NULL

ANS - 3


### Fast APIs Ques.
1.  difference between synchronous and asynchronous code execution -> async await
2.  common ways to handle errors in FastAPI
3.  Describe the purpose of the "Depends" function in FastAPI.
4.  How do you implement database queries and data manipulation using in FastAPI - ORM / without ORM?
5.  what is uvicorn server in fastapi
6.  how to handle request and response validation in fastapi
7.  Difference between path param, query params, body
8.   


Python 
1. Decorators in python
