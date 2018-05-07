const roundSchema = require("../models/RoundSchema");
const gameSchema = require("../models/GameSchema");

const mongoose = require('mongoose');

let createRoundFirst = (score, callback) => {
    // create new round first
    let newRound = {
        idGame: 0,
        score: score
    }
    roundSchema.create(newRound, function (err, round) {
        if (err) {
            console.log(err)
        }
        callback(round.id);
    });
};

let createRound = (idGame, callback) => {
    // create new round
    let newRound = {
        idGame: idGame,
        score: [0, 0, 0, 0]
    }
    console.log(newRound)
    roundSchema.create(newRound, function (err, round) {
        if (err) {
            console.log(err)
        }
        callback(round.id);
    });
};

// ================================== UPDATE ================================== 
let updateRound = (id, idRound) => {
    roundSchema.findByIdAndUpdate(idRound, {
        $set: {
            idGame: id
        }
    }, {
            upsert: true
        }, function (err, result) {
            if (err) {
                console.log(err)
            };
        });
}

let updateScore = (idGame, indexRound, score, index) => {
    gameSchema.findOne({
        _id: idGame
    }, function (err, obj) {
        if (err) {
            console.log(err)
        };
        roundSchema.findOne({
            _id: obj.rounds[indexRound]
        }, function (err, obj) {
            if (err) {
                console.log(err)
            };
            obj.score[index] = parseInt(score);
            obj.markModified('score');
            obj.save(function () {
                console.log('done');
            });
        });
    })
    
}


module.exports = {
    createRoundFirst,
    createRound,
    updateRound,
    updateScore
}