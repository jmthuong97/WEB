const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var handlebar = require('express-handlebars');

let app = express();
let game = require("./controllers/GameController");
let user = require("./controllers/UserController");
let round = require("./controllers/RoundController");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebar({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/games/:id', (req, res) => {
    game.getGameById(req.params.id, (game) => {
        if (game == null) {
            res.render('home');
        }
        else {
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
            res.render('view', {
                names: game.users,
                rounds: game.rounds,
                total: point
            })
        }
    });
});

app.post('/newgame', (req, res) => {
    let users = [req.body.val1, req.body.val2, req.body.val3, req.body.val4];
    let score = [0, 0, 0, 0]

    user.createUser(users, (idUser) => {
        round.createRoundFirst(score, (idRound) => {
            let newGame = {
                users: idUser,
                rounds: idRound
            }
            game.createGame(newGame, (id) => {
                res.redirect('/games/' + id);
            });
        });
    });
});

app.post('/updateScore', (req, res) => {
    let objectData = JSON.parse(req.body.o);
    round.updateScore(objectData.idRound, objectData.score, objectData.index);
});

app.post('/createRound', (req, res) => {
    let objectData = JSON.parse(req.body.o);
    round.createRound(objectData.idGame, objectData.noRound, (idRound) => {
        console.log('hrereere' + idRound)
        game.addRounds(objectData.idGame, idRound);
    });
});

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/MiniHack', (err) => {
    if (err) console.log(err);
    console.log("Database connect success !");
});

app.listen(6969, (err) => {
    if (err) { console.log(err) };
    console.log("App is start at port 6969");
}); 