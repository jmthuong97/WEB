const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config.json');

const app = express();

const imageRouter = require('./model/api/images/route');
const userRouter = require('./model/api/users/route');
const authRouter = require('./model/api/auth/router');

app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: config.secureCookie,
        maxAge: 1 * 60 * 1000
    }
}));

app.use(bodyParser.urlencoded({
    extended: false
}));


app.use('/api/images', imageRouter);

app.use('/api/users', userRouter);

app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.send('OK');
});

mongoose.connect(config.mongoPath, (err) => {
    if (err) console.log(err);
    else console.log('Database connect successful');
});

const port = process.env.port || 6969;

app.listen(6969, (err) => {
    if (err) {
        console.log(err)
    };
    console.log("Server started at port: " + port);
});