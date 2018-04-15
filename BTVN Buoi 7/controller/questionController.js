
const QuestionSchema = require("../models/questionSchema");
const mongoose = require('mongoose');

let create = (question, callback) => {
    let newQuestion = {
        questionContent: question
    }
    QuestionSchema.create(newQuestion, function (err, ques) {
        if (err) { console.log(err) }
        callback(ques.id);
    });
};

let getById = (id, callback) => {
    QuestionSchema.findOne({ _id: id }, function (err, question) {
        if (err) { console.log(err) };
        callback(question);
    });
};

let getAll = (callback) => {
    QuestionSchema.find({}, function (err, question) {
        if (err) { console.log(err) };
        callback(question);
    });
};

let getSize = (callback) => {
    QuestionSchema.count({}, function (err, size) {
        if (err) { console.log(err) };
        callback(size);
    });
};

let update = (id, value, callback) => {
    // console.log(value);
    switch (value) {
        case "true":
            QuestionSchema.findOne({ _id: id }, function (err, question) {
                QuestionSchema.findByIdAndUpdate(id, { $set: { yes: question.yes + 1 } }, { upsert: true }, function (err, result) {
                    callback(result);
                });
            });
            break;
        case "false":
            QuestionSchema.findOne({ _id: id }, function (err, question) {
                QuestionSchema.findByIdAndUpdate(id, { $set: { no: question.no + 1 } }, { upsert: true }, function (err, result) {
                    callback(result);
                });
            });
            break;
    };
};

module.exports = {
    create,
    getById,
    getAll,
    update,
    getSize
}