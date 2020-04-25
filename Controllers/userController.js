var user = require('../Models/user');

function compare_review(a, b){
    // a should come before b in the sorted order
    if(a.review < b.review){
        return 1;
        // a should come after b in the sorted order
    }else if(a.review > b.review){
        return -1;
        // and and b are the same
    }else{
        return 0;
    }
}

const users = user.sort(compare_review);

const getAllUsers = (req, res) => {
    res.send(users);
};

//get user by cuisine
const getUserByCuisine = (req, res) => {
    const userGroup = [];
    for (i = 0; i < users.length; i++) {
        const userInfo = users[i];
        if (userInfo.cuisine === req.params.cuisine) {
            userGroup.push(userInfo);
        }
    }
    if (userGroup.length !== 0) {
        res.send(userGroup);
    }
    else {
        res.status(404).send("No User Found");
    }
};
/*
    const userInfo = users.find(user => user.cuisine === req.params.cuisine);
    if (userInfo) {
        res.send(JSON.stringify(userInfo));
    }
    else {
        res.status(404).send("No User Found");
    }
};*/

//update cuisine by name
const updateCuisineByName = (req, res) => {
    const userInfo = users.find(user => user.username === req.params.username);
    //get the new information from request body
    userInfo.cuisine = req.body.cuisine;
    res.send(users);
};

//add new user
const addUser = (req, res) => {
    const new_user = req.body;
    users.push(new_user);
    res.send(users);
};

//delete user
const deleteUser = (req, res) => {
    const userInfo = users.find(user => user.username === req.params.username);
    if (!userInfo) {
        res.status(404).send("No User Found");
    }
    else {
        const name = users.indexOf(userInfo);
        users.splice(name, 1);
        res.send(users);
    }
};

//review system
 const updateUserReview = (req, res) => {
     const userInfo = users.find(user => user.username === req.params.username);
     userInfo.review = req.body.review;
     res.send(userInfo);
 };

 const getUserByReview = (req, res) => {
     const userGroup = [];
     for (i = 0; i < users.length; i++) {
         const userInfo = users[i];
         if (userInfo.review === req.params.review) {
             userGroup.push(userInfo);
         }
     }
     if (userGroup.length !== 0) {
         res.send(userGroup);
     }
     else {
         res.status(404).send("No User Found");
     }
 };

const getBestUser = (req, res) => {
    const premium = [];
    for (i = 0; i < 3; i++) {
        premium.push(users[i]);
    }
    res.send(premium)
};

module.exports = {
    getAllUsers,
    getUserByCuisine,
    updateCuisineByName,
    addUser,
    deleteUser,
    updateUserReview,
    getUserByReview,
    getBestUser
};