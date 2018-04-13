const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    idGame:{type:String},
    noUser:{type: Number},
    name: {type: String}
});

module.exports = mongoose.model("user", userSchema);