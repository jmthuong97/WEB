const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roundSchema = new Schema({
    idGame: {type: String},
    noRound:{type: Number},
    score: [{type: Number}]
});

module.exports = mongoose.model("round", roundSchema);