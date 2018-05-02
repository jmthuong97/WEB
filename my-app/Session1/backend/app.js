const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const config = require("./config-local.json");

const app = express();

let game = require("./controllers/GameController");
let user = require("./controllers/UserController");
let round = require("./controllers/RoundController");

app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "ALLOWALL");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: config.secureCookie,
      maxAge: 12 * 60 * 60 * 1000
    }
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

// =====

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
  res.end();
});

app.post('/createRound', (req, res) => {
  let objectData = JSON.parse(req.body.o);
  round.createRound(objectData.idGame, objectData.noRound, (idRound) => {
      game.addRounds(objectData.idGame, idRound);
      res.json({ idRound });
  });
});

// ======


mongoose.connect(config.mongoPath, err => {
  if (err) console.error(err);
  else console.log("Database connect successful");
});

const port = process.env.port || 6969;

app.listen(port, err => {
  if (err) console.log(err);
  console.log("Server started at port " + port);
});
