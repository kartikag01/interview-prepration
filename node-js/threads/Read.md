Exec is used to execute a command in a child process,
while fork and spawn are used to create new child processes


// index.js
const { fork } = require('child_process');
const child = fork('child.js');

child.on('message', (message) => {
  console.log('Message from child', message);
});
child.send({ hello: 'world' });

// child.js
process.on('message', (message) => {
  console.log('Message from parent:', message);
  process.send({ response: 'Hello from child' });
});