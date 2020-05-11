var users = require("../models/Users");

const mongoose = require("mongoose");
const User = mongoose.model("user");

// GET request - get all users
const getAllUsers = async (req, res) => {

    res.json(users); 

    users = []  
    try {
        const all_users = await User.find();
        
        // res.render('users', {
        //     title: 'User List',
        //     users: all_users
        // });
        res.json(users); 

    } catch (err) {
        res.status(400);
        return res.send("Database query failed");
    }
};

// GET request - get a user by id
const getUserByID = async (req, res) => {
    // const user = users.find(user => user.id === parseInt(req.params.id));
    const userId = parseInt(req.params.id);

    try {
        const users = await User.find({id: userId});
        if (!users) {
            res.status(400);
            console.log("User not found");
            return res.send("User not found");
        }
        
        const user = users[0];
        console.log("User found!!!", user);
        
        res.send(user);
        // res.render('userupdateform', {
        //     // user
        // });
    } catch (err) {
        res.status(400);
        console.log(err);
        return res.send("Database query failed");
    }
};

// PATCH request - modify aa user's information by id
const updateUserByID = async (req, res) => {
    const new_user = req.body;
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        res.status(400).send(
            {msg: `No user with the id of ${req.params.id}`}
        )
    }
    
    Object.assign(user, new_user);
    res.send(user);

    const userId = req.params.id;
  
    try {
        const users = await user.find({id: userId});
        if (!users) {
            res.status(400);
            console.log("user not found");
            return res.send("user not found");
        }
        
        const user = users[0];
        console.log("user found!!!", user);
        
        // user[sth] = new_user["sth"];
        
        await user.save();
        // res.render('index', {
        //     title: 'Library App'
        // });
        res.send("working on this feature");

    } catch (err) {
        res.status(400);
        console.log(err);
        return res.send("Database query failed");
    }
  };
  
// POST request - add a user
const addUser = async (req, res) => {
    // const newUser = Object.assign({id: users.length + 1}, req.body);

    // users.push(newUser);
    // res.send(users);
    res.send("working on this feature");
};


module.exports = {
  getAllUsers,
  getUserByID,
  updateUserByID,
  addUser,
};







































/* var users = require("../models/Users");

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
 */