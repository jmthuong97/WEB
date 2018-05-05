const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    users: [{type: Schema.Types.ObjectId, ref: 'user'}],
    rounds:[{type: Schema.Types.ObjectId, ref: 'round'}]
});

module.exports = mongoose.model("game", gameSchema);