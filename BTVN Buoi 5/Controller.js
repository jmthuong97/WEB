const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

var handlebar = require('express-handlebars');
let fs = require('./fileController'); // read & write file

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', handlebar({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    let data = [...fs.readFileSync('./data.json')];
    let max = data.length;
    let min = 1;
    // let id = Math.floor(Math.random() * (max – min + 1) ) + min;
    let id = Math.floor(Math.random() * (max - min + 1) + min);
    res.redirect('/question/' + id);
    // res.render('ask');
});

app.get('/ask', (req, res) => {
    res.render('ask');
});

// create question
app.post('/ask', (req, res) => {
    try {
        let data = [...fs.readFileSync('./data.json')]; // push 1 array(read on file) into new array
        let id = data.length + 1;
        let newQuestion = {
            id: id,
            question: req.body.question,
            yes: 0,
            no: 0
        };
        data.push(newQuestion);
        if (newQuestion.question == "") { // if return content empty then don't write file question
            res.redirect('/ask');
        } else {
            fs.writeFile('./data.json', data, (err) => {
                if (err) { console.log(err) };
                res.redirect('/question/' + id);
            });
        }
    } catch (ex) {
        console.log(ex);
    }
});


// get link question & show
app.get('/question/:id', (req, res) => {
    try {
        let data = [...fs.readFileSync('./data.json')]; // push 1 array(read on file) into new array
        let question = data[req.params.id - 1];
        res.render('question', {
            content: question.question,
            id: question.id
        });
    } catch (ex) {
        console.log("error here 60");
        console.log(ex);
    }
});

// submit answer for question
app.post('/answer', (req, res) => {
    let answer = [...fs.readFileSync('./data.json')];
    let id = req.body.idQuestion;
    for (let i = 0; i < answer.length; i++) {
        if (answer[i].id == id) {
            req.body.answer === 'true' ? answer[i].yes++ : answer[i].no++;
            break;
        }
    }
    fs.writeFile('./data.json', answer, (err) => {
        if (err) { console.log(err) };
        res.redirect('/answer/' + id);
    });
});

// show answer
app.get('/answer/:id', (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.body.question);
        let data = [...fs.readFileSync('./data.json')]; // push 1 array(read on file) into new array
        let getData = data[req.params.id - 1];
        res.render('answer', {
            content: getData.question,
            true: getData.yes,
            false: getData.no
        });
    } catch (ex) {
        console.log("error here 98");
        console.log(ex);
    }
});

app.use(express.static('public'));

app.listen(6969, (err) => {
    if (err) { console.log(err) };
    console.log("App is start at port 6969");
}); 