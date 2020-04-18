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
        res.status(404).send("No User Found");
    }
};

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

module.exports = {
    getAllUsers,
    getUserByCuisine,
    updateCuisineByName,
    addUser,
    deleteUser
};