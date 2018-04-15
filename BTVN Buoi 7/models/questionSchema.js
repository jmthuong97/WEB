
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    questionContent: { type: String, require: true },
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 }
}, {
        timesstamps: true
    });

module.exports = mongoose.model("Question", questionSchema);