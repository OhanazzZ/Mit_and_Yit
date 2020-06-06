const mongoose = require("mongoose");
const User = mongoose.model("user");
const passport = require('passport');
var expressValidator = require('express-validator');

// homepage for match
const matchRender = async (req, res) => {
    res.render('match');
}

const matchHistoryRender = async (req, res) => {
    const history = req.user.history;
    if (history[0]===undefined) {
        res.render('match_history', {empty: "you don't have matching history with other users", histories: history});
    } else {
        res.render('match_history', {histories: history});
    }
}

const matchFindRender = async (req, res) => {
    res.render('match_find');
}


const findMatch = async (req, res) => {

    const cuisine1 = req.body.first;
    const cuisine2 = req.body.second;
    const cuisine3 = req.body.third;

    const preference = [];
    [cuisine1, cuisine2, cuisine3].forEach(cuisine=>{
        if(cuisine != undefined){
            preference.push(cuisine);
        }
    })

    const lunch = req.body.lunch;
    const dinner = req.body.dinner;
    const coffee = req.body.coffee;

    const query = {
        $and:[
            {$or:[
                {"dietary.cuisine.first":{$in:preference}},
                {"dietary.cuisine.second":{$in:preference}},
                {"dietary.cuisine.third":{$in:preference}},
            ]},
            {$or:[
                {"availability.lunch": lunch},
                {"availability.dinner": dinner},
                {"availability.coffee": coffee},
            ]},
            {"username": {$ne: req.user.username}}
        ]
    }

    try{
        const documents = await User.find(query);
        if (documents.length===0) {
            res.render('match_result', {empty: "Sorry, no available users for your query", users: documents});
        } else {
            res.render('match_result', {users: documents});
        }
    } catch(err) {
        console.log(err);
        res.send("Database query failed.")
    }  
};

const matchRequest = async (req, res) => {
    try{
        console.log(req.body.username);
        const request = {
            from: req.user.username,
            responded: "Pending",
            accepted: "Pending"
        }
        console.log(request);
        await User.updateOne({"username": req.body.username}, {$push:{request: request}});

        /* const history = {
            from: req.user.username,
            to: req.body.username,
            accepted: "Pending", 
            beenOut: "Pending"
        }
        console.log(history);
        await User.updateOne({"username": req.user.username}, {$push:{history: history}}); */
    } catch(err) {
        console.log(err);
        res.send("Database query failed.")
    }

};

const matchRequestRender = async (req, res) => {
    const request = req.user.request;
    if (request[0]===undefined) {
        res.render('match_request', {empty: "Currently you don't have requests from other users", requests: request});
    } else {
        res.render('match_request', {requests: request});
    }
}

const requestAccept = async (req, res) => {
    try{
        const idString = req.body.id;
        const id = mongoose.Types.ObjectId(idString);
        await User.updateOne({"username": req.user.username}, {$pull: {"request": {"_id": id}}});
        
        const history = {
            from: req.body.user,
            to: req.user.username,
            accepted: "Accepted", 
            beenOut: "Pending"
        }

        await User.updateMany({$or:[{"username":req.body.user}, {"username": req.user.username}]}, {$push:{history: history}});

    } catch(err){
        console.log(err);
        res.send("Database query failed.")
    }
}

const requestReject = async (req, res) => {
    try{
        const idString = req.body.id;
        const id = mongoose.Types.ObjectId(idString);
        await User.updateOne({"username": req.user.username}, {$pull: {"request": {"_id": id}}});

        const history = {
            from: req.body.user,
            to: req.user.username,
            accepted: "Declined", 
            beenOut: "Pending"
        }

        await User.updateMany({$or:[{"username":req.body.user}, {"username": req.user.username}]}, {$push:{history: history}});

    } catch(err){
        console.log(err);
        res.send("Database query failed.")
    }
}

//Access Control
function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.render('index', {
            msg: "Please register or login"
        })
    }
}



module.exports = {
    matchRender,
    matchFindRender,
    matchHistoryRender,
    matchRequestRender,
    findMatch,
    ensureAuthenticated,
    matchRequest,
    requestAccept,
    requestReject
};

