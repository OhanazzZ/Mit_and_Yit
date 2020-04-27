var users = require("../models/Users");

// GET request - find matches for an user
const findMatch = (req, res) => {
    const targetUser = users.find(user => user.id === parseInt(req.params.id));
    if (!targetUser){
        return res.status(400).send(
            {msg: `No user with the id of ${req.params.id}`}
        )
    }

    matches = [];
    users.forEach( user => {
        if ((user.cuisine === targetUser.cuisine || 
            user.dinner === targetUser.dinner ||
            user.lunch === user.lunch || 
            user.coffee_lightMeal === targetUser.coffee_lightMeal) &&
            user.id !== parseInt(req.params.id)) {
                matches.push({user:user.id, email:user.email});
            }
    })

    res.send({
        user: req.params.id, 
        matches: matches
    })
};


// Get request - find matches for an user by cuisine
const ByCuisine = (req, res) => {
    const targetUser = users.find(user => user.id === parseInt(req.params.id));
    if (!targetUser){
        return res.status(400).send(
            {msg: `No user with the id of ${req.params.id}`}
        )
    }

    const matches = [];
    users.forEach( user => {
        if (user.cuisine === targetUser.cuisine &&
            user.id !== parseInt(req.params.id)) {
            matches.push({user:user.id, email: user.email});
        }
    })
    res.send(matches);
};

// Get request - find matches for an user by cuisine
const ByAvailability = (req, res) => {
    const targetUser = users.find(user => user.id === parseInt(req.params.id));
    if (!targetUser){
        return res.status(400).send(
            {msg: `No user with the id of ${req.params.id}`}
        )
    }

    lunch = [];
    dinner = [];
    coffee = []
    users.forEach(user => {
        if (user.lunch && targetUser.lunch &&
            user.id !== parseInt(req.params.id)){
            lunch.push({user:user.id, email: user.email})
        }
        if (user.dinner && targetUser.dinner &&
            user.id !== parseInt(req.params.id)){
            dinner.push({user:user.id, email: user.email})
        }
        if (user.coffee_lightMeal && targetUser.dinner &&
            user.id !== parseInt(req.params.id)){
            coffee.push({user:user.id, email: user.email})
        }
    })

    res.send({
        lunch: lunch,
        dinner: dinner,
        coffee_lightMeal: coffee
    })
}


module.exports = {
    findMatch,
    ByCuisine,
    ByAvailability,
};

