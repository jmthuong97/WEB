
const gameSchema = require("../models/GameSchema");
const mongoose = require('mongoose');

let user = require("./UserController");
let round = require("./RoundController");

let createGame = (newgame, callback) => {
    gameSchema.create(newgame, function (err, game) {
        if (err) { console.log(err) }
        round.updateRound(game.id, newgame.rounds);
        user.updateUser(game.id, newgame.users);
        callback(game.id);
    });
};

let getGameById = (id, callback) => {
    gameSchema.
        findOne({ _id: id }).
        populate('users').
        populate('rounds').
        exec(function (err, game) {
            if (err) { console.log(err) };
            callback(game);
        });
};

let addRounds = (id, idRound) => {
    gameSchema.findByIdAndUpdate(id, { $push: { 'rounds': idRound } }, { upsert: true }, function (err, result) {
        if (err) { console.log(err) };
        // console.log(result);
    });
};

module.exports = {
    createGame,
    getGameById,
    addRounds
}