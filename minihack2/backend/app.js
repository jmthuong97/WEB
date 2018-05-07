const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

let app = express();
let game = require("./controllers/GameController");
let user = require("./controllers/UserController");
let round = require("./controllers/RoundController");

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");

    if (req.headers.origin) {
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    }

    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/games/:id', (req, res) => {
    game.getGameById(req.params.id, (game) => {
        if (game == null) {
            res.send('')
        } else {
            // calculator point
            let point = [];
            for (let i = 0; i < 4; i++) {
                var total = 0;
                for (let j = 0; j < game.rounds.length; j++) {
                    let scores = game.rounds[j].score;
                    total = parseInt(total) + parseInt(scores[i]);
                }
                point.push(total);
            }
            res.send({
                names: game.users,
                rounds: game.rounds,
                total: point,
                sumOfScore: point.reduce((a, b) => a + b, 0)
            })
        }
    });
});

app.post('/newgame', (req, res) => {
    let players = req.body.players;
    let users = [players[0], players[1], players[2], players[3]];
    let score = [0, 0, 0, 0]

    user.createUser(users, (idUser) => {
        round.createRoundFirst(score, (idRound) => {
            let newGame = {
                users: idUser,
                rounds: idRound
            }
            game.createGame(newGame, (id) => {
                res.send(id)
            });
        });
    });
});

app.post('/updateScore', (req, res) => {
    round.updateScore(req.body.idGame, req.body.indexRound, req.body.score, req.body.index);
    res.end();
});

app.post('/createRound', (req, res) => {
    round.createRound(req.body.idGame, (idRound) => {
        game.addRounds(req.body.idGame, idRound);
        res.json({
            idRound
        });
    });
});

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/MiniHack2', (err) => {
    if (err) console.log(err);
    console.log("Database connect success !");
});

app.listen(6969, (err) => {
    if (err) {
        console.log(err)
    };
    console.log("App is start at port 6969");
});