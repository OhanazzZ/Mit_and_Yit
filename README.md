Hello,

We are in Monday 2pm workshop. 

Our team name: Mit & Yit

Members are:  Kechen Zhao 957398
              Bin Zhang   895427
              Yuan Ye     980728

The web app we are creating is a social dining app.

Deliverable 2 descrpition:

The link to Git repository for the web application is https://github.com/GilfoylePP/Mit_and_Yit--INFO30005
The URL to the live website is https://mityit.herokuapp.com.
The commit id is 8308318


Three core functionalities, users system, matching system and review system, have been implemented separately by using three routers. Detailed descriptions are listed below. 

Currently our database has users with id 1~9. The data structure of Users data is 
{
  "id": int,  //a unique int that identify a user
  "username": String,
  "email": String,
  "cuisine": String, //their food preference
  "lunch": Boolean, //availability for lunch 
  "dinner": Boolean, //availability for dinner
  "coffee_lightMeal": Boolean, //availability for coffee
  "reviewIndex": int //a unique index position that help to retrieve user's review from the Review database
}

Exapmle of data structure in Review data: The below data is the review for user id 1, which is at index 0 position. 
{
        score:3.5, //int, average score calculated based on all reviews
        scoreNum:2, //int, number of review messages received
        review:[ //an array that store all review messages 
            {
                givenBy:2,
                date:"03-04-2019",
                score:4,
                tag:["nice","interesting"],
                comment: "really nice and kind",
            },
            {
                givenBy:7,
                date:"09-04-2019",
                score:3,
                tag:["boring","kind"],
                comment: "xx is nice but we have no common interest",
            },
        ]
    }


1. Users' information system (userRouter)

Our first core functionality is user system. It allows to view all users’ information, extract an existing user's information, modify existing user's information, and add new user to json file.  

https://mityit.herokuapp.com/user/info : a GET request that retrieve all users' information

https://mityit.herokuapp.com/user/info/:id : a GET request that retrieve a particular user's information by id

https://mityit.herokuapp.com/user/info/:id : a PATCH request that update an exisiting user's information by id
Input JSON file:
{
  "id": int,
  "username": String,
  "email": String,
  "cuisine": String,
  "lunch": Boolean,
  "dinner": Boolean,
  "coffee_lightMeal": Boolean,
  "reviewIndex": int
}

E.g 
Url to test: https://mityit.herokuapp.com/user/info/7
Original information:
{
    "id": 7,
    "username": "user7",
    "email": "email_7@gmail.com",
    "cuisine": "Italian",
    "lunch": true,
    "dinner": true,
    "coffee_lightMeal": false,
    "reviewIndex": 6
  },
Make changes(JSON code to test): 
{
    "id": 7,
    "username": "user7_newname",
    "email": "email_7@gmail.com",
    "cuisine": "Korean",
    "lunch": true,
    "dinner": true,
    "coffee_lightMeal": false,
    "reviewIndex": 6
  },

    
https://mityit.herokuapp.com/user/signup : a POST request that add a new user's information
Input JSON file: 
{
  "username": String,
  "email": String,
  "cuisine": String,
  "lunch": Boolean,
  "dinner": Boolean,
  "coffee_lightMeal": Boolean,
  "reviewIndex": int
}


2. Matching Systen (matchRouter)

In matching system, a user can find all suitable partners that matches him/her based on either cuisine preference or time availability.

https://mityit.herokuapp.com/match/:id : a GET request that retrieve all matches for a user (based on both cuisine and availability)

https://mityit.herokuapp.com/match/find_cuisine/:id : a GET request that find matches for a user by cuisine 

https://mityit.herokuapp.com/match/find_availability/:id : a GET request that find matches for a user by availability  

  
3. Review System (reviewRouter)

Router for review system allows to find reviews, edit existing review and upload new review for a specific user.

https://mityit.herokuapp.com/review/:id : a GET request that get reviews written to the user identifiable by the provided ID

https://mityit.herokuapp.com/review/:id : a POST request that write a new review to the user identifiable by the provided ID 
Input JSON file: 
{
"givenBy": int,
"date": date,
"score": int,
"tag": array of Strings,
"comment": String
}

https://mityit.herokuapp.com/review/:id : a PATCH request that modeify an existing review to the user identifiable by the provided ID 
Input JSON file: the same data structure as review POST request
