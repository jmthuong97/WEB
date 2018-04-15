
const express = require('express');
const Router = express.Router();

let fs = require('../controller/questionController'); // read & write file


// show answer
Router.get('/:id', (req, res) => {
    try {
        fs.getById(req.params.id, (question) => {
            let percent;
            if (question.yes == 0) {
                percent = 50;
            } else {
                percent = ((question.yes / (question.no + question.yes)) * 100).toFixed(2);
            }
            res.render('answer', {
                content: question.questionContent,
                true: question.yes,
                false: question.no,
                totalanswer: question.yes + question.no,
                percentYes: percent,
                percentNo: (100 - percent).toFixed(2)
            });
        });
    } catch (ex) {
        console.log("error here 98");
        console.log(ex);
    }
});

module.exports = Router;