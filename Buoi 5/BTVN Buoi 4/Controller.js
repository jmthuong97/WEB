const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

var handlebar = require('express-handlebars');
let fs = require('./fileController');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', handlebar({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    // res.render('home');
    // res.render('home', {layout: false});
    res.render('home', {
        number: {
            a: Math.random() * 5000,
            b: 1997
        },
        htmlData: '<h2>Render HTML</h2>'
    });
});

app.get('/ask', (req, res) => {
    res.render('ask');
});

// create question
app.post('/ask', (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.body.question);
        let data = [...fs.readFileSync('./data.json')]; // push 1 array(read on file) into new array
        let id = data.length + 1;
        let newQuestion = {
            id: id,
            question: req.body.question
        };
        data.push(newQuestion);
        // console.log("Show data:" + data);
        fs.writeFile('./data.json', data, (err) => {
            if (err) { console.log(err) };
            res.redirect('/question/' + id);
        });
    }catch(ex){
        console.log(ex);
    }
});


// get link question & show
app.get('/question/:id', (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.body.question);
        let data = [...fs.readFileSync('./data.json')]; // push 1 array(read on file) into new array
        let question = data[req.params.id-1];
        res.render('question',{
            question: question.question
        })
    }catch(ex){
        console.log(ex);
    }
});



app.use(express.static('public'));

app.get('/frontendpractice', (req, res) => {
    res.sendfile(path.resolve(__dirname, './public/dropdown.html'))
});



app.get('/flexbox', (req, res) => {
    res.sendfile(path.resolve(__dirname, './public/flex.html'))
});

app.listen(6969, (err) => {
    if (err) { console.log(err) };
    console.log("App is start at port 6969");
}); 