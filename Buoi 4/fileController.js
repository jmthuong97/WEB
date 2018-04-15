const fs = require('fs');

let readFile = (path, onReadFileDone) => {
    fs.readFile(path, 'utf-8', (err,data)=>{
        if(err){console.log(err)};
        onReadFileDone(data);
    });
};

let writeFile = (path, writeData) => { // , onWriteDataDone
    fs.writeFile(path, writeData, (err) => {
        if (err) { console.log(err) };
        // onWriteDataDone("Success");
        console.log("Success");
    });
};

module.exports = {
    readFile, 
    writeFile
}