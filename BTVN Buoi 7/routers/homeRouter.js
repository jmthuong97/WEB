
const express = require('express');
const Router = express.Router();

let fs = require('../controller/questionController'); // read & write file


Router.get('/', (req, res) => {
    fs.getSize((size) => {
        if (size == 0) {
            res.redirect('/ask');
        } else {
            let index = Math.floor(Math.random() * size);
            fs.getAll((question) => {
                res.redirect('/question/' + question[index].id);
            });
        }
    });
});

module.exports = Router;
