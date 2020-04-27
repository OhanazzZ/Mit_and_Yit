var users = require("../models/Users");

// GET request - get all users
const getAllUsers = (req, res) => {
    res.json(users); 
};

// GET request - get an user by id
const getUserByID = (req, res) => {
    const user = users.find(user => user.id == req.params.id);

    if (user) {
        res.send(user);
    } else {
        res.status(400).send(
            {msg: `No user with the id of ${req.params.id}`}
        )}
};

// PATCH request - modify an user by id
const updateUser = (req, res) => {
    const new_user = req.body;
  
    // search for user in the database via ID
    const user = users.find(user => user.id == req.params.id);
    if (!user) {
        res.status(400).send(
            {msg: `No user with the id of ${req.params.id}`}
        )
    }
    
    Object.assign(user, new_user);
    res.send(user);
  };
  
// POST request - add an user
const addUser = (req, res) => {
    const newUser = Object.assign({id: users.length}, req.body)

    users.push(newUser);
    res.send(users);
};


// remember to export the functions
module.exports = {
  getAllUsers,
  getUserByID,
  updateUser,
  addUser,
};
