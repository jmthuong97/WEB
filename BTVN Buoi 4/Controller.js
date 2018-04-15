const express = require('express');
const path = require('path');

let app = express();

app.use(express.static('public'));
    // app.use(express.static('BTVN Buoi 4/Dropdown'));
    // app.use(express.static('BTVN Buoi 4/Flex'));

app.listen(6969, (err)=>{
    if(err){console.log(err)};
    console.log("App is start at port 6969");
}) 

app.get('/', (req, res)=>{
    res.sendfile(path.resolve(__dirname,'./public/me.html'))
});

app.get('/frontendpractice', (req, res)=>{
    res.sendfile(path.resolve(__dirname,'./public/dropdown.html'))
});



app.get('/flexbox', (req, res)=>{
    res.sendfile(path.resolve(__dirname,'./public/flex.html'))
});
