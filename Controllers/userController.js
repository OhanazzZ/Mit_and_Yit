var users = require('../Models/user');

const getAllUsers = (req, res) => {
    res.send(users);
};

//get user by cuisine
const getUserByCuisine = (req, res) => {
    const userInfo = users.find(user => user.cuisine === req.params.cuisine);
    if (userInfo) {
        res.send(userInfo);
    }
    else {
        res.send("No User Found");
    }
};

const updateCuisineByName = (req, res) => {
    const userInfo = users.find(user => user.name === req.params.name);
    //get the new information from request body
    userInfo.cuisine = req.body.cuisine;
    res.send(users);
};

module.exports = {
    getAllUsers,
    getUserByCuisine,
    updateCuisineByName,
};