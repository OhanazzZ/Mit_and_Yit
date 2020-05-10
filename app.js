const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//load view engine
app.set('views', path.join(__dirname,"views"));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname,"public")));

app.use(express.static(path.join(__dirname,"public")));

// homepage
app.get("/", (req, res) => {
    res.render('index');
});

app.get("/user/signup", (req, res) => {
    res.render('signup');
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


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Mit & Yit is listening on port ${PORT}!`);
});