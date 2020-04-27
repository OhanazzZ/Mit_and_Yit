var user = require("../models/Users");

//GET request - find match for user by user id
const findMatch = (req, res) => {
    const targetUser = user.find(user => user.id === parseInt(req.params.id));
    const matchedGroup = [];
    for (i = 0; i < user.length; i++) {
        const userInfo = user[i];
        if (userInfo.cuisine === targetUser.cuisine || userInfo.dinner === targetUser.dinner ||
        userInfo.lunch === userInfo.lunch || userInfo.coffee_lightMeal === targetUser.coffee_lightMeal) {
            matchedGroup.push({user:userInfo.id, email:userInfo.email});
        }
    }
    if (matchedGroup.length !== 0) {
        res.send("The matched users are the following: \n" + JSON.stringify(matchedGroup));
    }
    else {
        res.status(404).send("No User Found");
    }
};


/*//Get request - find match users by best review
const matchUserByReview = (req, res) => {
    const bestUsers = [];
    for (i = 0; i < 3; i++) {
        bestUsers.push(users[i]);
        }
        res.send(bestUsers)
};*/

//Get request - find match users by cuisine
const matchUserByCuisine = (req, res) => {
    const userGroup = [];
    for (i = 0; i < user.length; i++) {
        const userInfo = user[i];
        if (userInfo.cuisine === req.params.cuisine) {
            userGroup.push({user:userInfo.id, email: userInfo.email});
        }
    }
    if (userGroup.length !== 0) {
        res.send(userGroup);
    }
    else {
        res.status(404).send("No User Found");
    }
};


module.exports = {
    findMatch,
    matchUserByCuisine,
};

