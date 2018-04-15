let fs = require('./fileController');

// console.log(fs);
// console.log(fs.readFile('test.txt'));

fs.readFile('test.txt', (data)=>{
    console.log(data);
});