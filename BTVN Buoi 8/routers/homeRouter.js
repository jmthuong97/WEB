
const express = require('express');
const Router = express.Router();

let fs = require('../controller/questionController'); // read & write file


Router.get('/', (req, res) => {
    fs.getSize((size) => {
        if (size == 0) {
            res.redirect('/ask');
        } else {
            fs.findRandom((err, doc) => {
                if (err) console.log(err)
                else {
                    res.render('question');
                }
            });
        }
    });
});

Router.post('/', (req, res) => {
    try {
        fs.findRandom((err, doc) => {
            res.json({ doc });
        });
    } catch (ex) {
        console.log(ex);
    }
});

module.exports = Router;
