const fs = require('fs');

console.log("__dirname :", __dirname );

// Read Stream
let fileReadStream = fs.createReadStream( __dirname  + '/files/read.txt');
let fileData;
fileReadStream.on("data", chunk => {
    fileData += chunk.toString(); // NOTE
    console.log(`Received ${chunk.length} bytes of data.`);
});

fileReadStream.on("end", () => {
    console.log('There will be no more data.');
    console.log(fileData);
});


// Write Stream.