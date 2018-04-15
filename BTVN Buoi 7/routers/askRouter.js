

const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');

let fs = require('../controller/questionController'); // read & write file


Router.get('/', (req, res) => {
    res.render('ask');
});

// create question
Router.post('/', (req, res) => {
    try {
        fs.create(req.body.question, (id) => {
            res.redirect('/answer/' + id);
        });
    } catch (ex) {
        console.log(ex);
    }
});

// get link question & show
Router.get('/:id', (req, res) => {
    try {
        fs.getById(req.params.id, (question) => {
            res.render('question', {
                content: question.questionContent,
                id: question.id
            });
        });
    } catch (ex) {
        console.log(ex);
    }
});

module.exports = Router;