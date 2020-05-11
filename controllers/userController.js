var users = require("../models/Users");

// GET request - get all users
const getAllUsers = (req, res) => {
    res.json(users); 
};

// GET request - get a user by id
const getUserByID = (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));

    if (user) {
        res.send(user);
    } else {
        res.status(400).send(
            {msg: `No user with the id of ${req.params.id}`}
        )}
};

// PATCH request - modify aa user's information by id
const updateUserByID = (req, res) => {
    const new_user = req.body;
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        res.status(400).send(
            {msg: `No user with the id of ${req.params.id}`}
        )
    }
    
    Object.assign(user, new_user);
    res.send(user);
  };
  
// POST request - add a user
const addUser = (req, res) => {
    const newUser = Object.assign({id: users.length + 1}, req.body);

    users.push(newUser);
    res.send(users);
};


module.exports = {
  getAllUsers,
  getUserByID,
  updateUserByID,
  addUser,
};
