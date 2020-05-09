const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

// init app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views',path.join(__dirname, 'views'));
app.set('view engine','pug');

// homepage
app.get("/", (req, res) => {
    res.render('index');
});

// three paths: user, matching system and review system
const userRouter = require('./routes/userRouter.js');
const matchRouter = require('./routes/matchRouter.js');
const reviewRouter = require('./routes/reviewRouter.js');

app.use('/user', userRouter);
app.use('/match', matchRouter);
app.use('/review', reviewRouter);

// if the usere entered an unspecified path
app.use((req, res) => {
    res.status(404).send("Not found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Mit & Yit is listening on port ${PORT}!`);
});