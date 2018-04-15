
const express = require('express');
const Router = express.Router();

let fs = require('../controller/questionController'); // read & write file


// submit answer for question
Router.post('/:id', (req, res) => {
    let command = req.body.btn_yesno;
    switch (command) {
        case "ketquavote":
            res.redirect('/answer/' + req.params.id);
            break;
        case "cauhoikhac":
            res.redirect('/');
            break;
        default:
            fs.update(req.params.id, req.body.answer, (result) => {
                console.log(result);
                res.redirect('/answer/' + req.params.id);
            });
            break;
    }
});

module.exports = Router;