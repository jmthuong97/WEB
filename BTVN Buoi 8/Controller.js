const express = require('express');
const bodyParser = require('body-parser');
const homeRouter = require('./routers/homeRouter');
const answerRouter = require('./routers/answerRouter');
const askRouter = require('./routers/askRouter');
const voteRouter = require('./routers/voteRouter');
const mongoose = require('mongoose');

var handlebar = require('express-handlebars');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', handlebar({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use('/', homeRouter);
app.use('/ask', askRouter);
app.use('/question', askRouter);
app.use('/answer', answerRouter);
app.use('/vote', voteRouter);

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/hotgirl', (err) => {
    if (err) console.log(err);
    console.log("Database connect success !");
});

app.post('/testajax', (req, res) => {
    if (req.body.tien < 50) res.redirect("deo du tien");
    res.redirect("rau cua m day");
});

app.listen(6969, (err) => {
    if (err) { console.log(err) };
    console.log("App is start at port 6969");
}); 