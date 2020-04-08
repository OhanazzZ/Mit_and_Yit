var users = require('../Models/user');

const getAllUsers = (req, res) => {
    res.send(users);
};

const getUserByCuisine = (req, res) => {
    const userInfo = users.find(user => user.cuisine === req.params.cuisine);
    if (userInfo) {
        res.send(userInfo);
    }
    else {
        res.send("No User Found");
    }
};

module.exports = {
    getAllUsers,
    getUserByCuisine,
};