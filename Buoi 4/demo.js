const express = require('express');
const path = require('path');

let app = express();

app.use(express.static('Homework 1'));


app.get('/', (req,res)=>{
    res.send("Hello i'm Thuong !");
});

app.get('/gift', (req,res)=>{
    res.send("9GB link: https://www.youtube.com/watch?v=******RjXjoAaaaaaaaaaaaaaaaaaa");
});

app.get('/me', (req,res)=>{
    console.log(path.resolve(__dirname,'./Homework 1/me.html'));
    res.sendFile(path.resolve(__dirname,'./Homework 1/me.html'));
})

app.listen(6969, (err)=>{
    if(err){console.log(err)};
    console.log("App is start at  port 6969");
});