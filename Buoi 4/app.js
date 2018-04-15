const fs = require('fs');

// fs.readFile                 // fucntion bat dong bo, k tra ve ngay ket qua (phai dung call back)
// let dataFromFile = fs.readFileSync('./package.json', 'utf-8');            // fucntion tra ve ngay kq
// console.log(dataFromFile);

// ======================= Read File String ======================

let dataFromFileAsync = fs.readFile('./package.json', 'utf-8', (error, data) => {
    if (error) { console.log(error) };
    console.log(data);
});
console.log(dataFromFileAsync);

// ======================= Write File ============================

let dataWriteFile = "Hello it's is write file!"; // write string
let dataObjectWriteFile = {
    a:5,
    b:6
}

fs.writeFile('test.txt', JSON.stringify(dataObjectWriteFile), (err) => {
    if (err) { console.log(err) };
    console.log("Write file successs");
});

// ======================= Read object ===========================

fs.readFile('test.txt', 'utf-8', (error, data) => {
    if (error) { console.log(error) };
    console.log("Data: "+Object.keys(JSON.parse(data)));
    console.log("Data: "+JSON.parse(data)["b"]);
});
